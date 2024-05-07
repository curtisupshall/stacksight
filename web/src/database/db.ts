import knex from 'knex'

export const db = knex({
    client: 'postgres',
    connection: process.env.PG_CONNECTION_STRING,
    // searchPath: ['knex', 'public'],
})();
