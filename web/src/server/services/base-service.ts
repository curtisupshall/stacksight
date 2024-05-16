import type { DbConnection } from "../database/db"

export class BaseService {
    connection: DbConnection;

    constructor(connection: DbConnection) {
        if (!connection) {
            throw new Error('Cannot create a service instance if no connection is provided.')
        }

        this.connection = connection
    }
}
