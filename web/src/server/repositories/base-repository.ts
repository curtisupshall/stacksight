import type { DbConnection } from "../database/db"

export class BaseRepository {
    connection: DbConnection;

    constructor(connection: DbConnection) {
        if (!connection) {
            throw new Error('Cannot create a repository instance if no connection is provided.')
        }

        this.connection = connection
    }
}
