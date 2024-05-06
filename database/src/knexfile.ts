export default {
  development: {
    client: 'pg',
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT,
      host: process.env.POSTGRES_DB,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migration',
      schemaName: 'public',
      directory: './migrations'
    },
    seeds: {
      directory: ['./seeds']
    }
  },
};
