import pg, { Pool } from "pg";

const DB_CONNECTION_CONFIG = ({
    host: process.env.POSTGRES_DATABASE_HOST,
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : undefined,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,

    // max: 20,
    // idleTimeoutMillis: 30000,
    // connectionTimeoutMillis: 2000,
});

let _dbPool: pg.Pool | undefined;

export const initializeDbPool = () => {
    if (_dbPool) {
        return;
    }

    _dbPool = new Pool(DB_CONNECTION_CONFIG)
}

export const getDbPool = function (): pg.Pool | undefined {
    return _dbPool;
};
