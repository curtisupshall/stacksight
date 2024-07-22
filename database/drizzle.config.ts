import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    schema: "./src/schema/index.ts",
    out: "./migrations",

    // Not needed, since credentials are already imported in src/migrate.ts
    // dbCredentials: {
    //     url: process.env.POSTGRES_DATABASE_URL as string
    // },
});
