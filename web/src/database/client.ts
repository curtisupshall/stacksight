import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schemas'

const env = dotenv.config({ path: '../.env' });
dotenvExpand.expand(env);

const host = process.env.POSTGRES_DATABASE_HOST ?? 'localhost';
const database = process.env.POSTGRES_DB as string;
const user = process.env.POSTGRES_USER as string;
const password = process.env.POSTGRES_PASSWORD as string;
const port = Number(process.env.POSTGRES_PORT as string);
const ssl = process.env.ENABLE_POSTGRES_SSL_MODE === 'true';

const enableLogger = process.env.ENABLE_DB_LOGGER === 'true';

export const pool = new Pool({
    host,
    database,
    user,
    password,
    port,
    ssl,
});

const db = drizzle(pool, { schema, logger: enableLogger });

export type DbClient = typeof db;

export default db;
