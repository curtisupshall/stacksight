import pg, { Client, Pool } from 'pg'

const DB_CONNECTION_CONFIG = Object.freeze({
    host: process.env.POSTGRES_DATABASE_HOST,
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : undefined,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
});

let _dbPool: pg.Pool | undefined;

const initializeDbPool = () => {
    if (_dbPool) {
        return;
    }

    _dbPool = new Pool(DB_CONNECTION_CONFIG)
}

export const getDbPool = function (): pg.Pool | undefined {
    return _dbPool;
  };

export class DbConnection {
    _client: pg.PoolClient | undefined = undefined;
    _isOpen = false;
    _isReleased = false;

    constructor() {
        initializeDbPool()
    }

    /**
     * Opens a connection to the database.
     * 
     * @returns 
     */
    async open(): Promise<void> {
        if (this._client || this._isOpen) {
            return;
        }

        const pool = getDbPool();
        if (!pool) {
            throw Error('Database pool was not initialized');
        }

        this._client = await pool.connect();
        this._isOpen = true;
        this._isReleased = false;

        await this._client.query('BEGIN');
    }

    /**
     * Releases (closes) the connection.
     *
     * Note: Does nothing if the connection is already released.
     */
    release() {
        if (this._isReleased || !this._client || !this._isOpen) {
            return;
        }

        this._client.release();
        this._isOpen = false;
        this._isReleased = true;
    };

    /**
     * Commits the transaction that was opened by calling `.open()`.
     *
     * @throws {Error} if the connection is not open
     */
    async commit() {
        if (!this._client || !this._isOpen) {
            throw Error('Database connection was not open');
        }

        await this._client.query('COMMIT');
    };

    /**
     * Rolls back the transaction, undoing any queries performed by this connection.
     *
     * @throws {Error} if the connection is not open
     */
    async rollback() {
        if (!this._client || !this._isOpen) {
            throw Error('Database connection was not open');
        }

        await this._client.query('ROLLBACK');
    };

    /**
     * Performs a query against this connection, returning the results.
     *
     * @template T
     * @param {string} text SQL text
     * @param {any[]} [values] SQL values array (optional)
     * @throws {Error} if the connection is not open
     * @return {*}  {Promise<pg.QueryResult<T>>}
     */
    async query<T extends pg.QueryResultRow = any>(
        text: string,
        values?: any[]
    ): Promise<pg.QueryResult<T>> {
        if (!this._client || !this._isOpen) {
            throw Error('Database connection was not open');
        }

        return this._client.query<T>(text, values ?? []);
    };
}
