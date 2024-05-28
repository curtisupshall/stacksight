import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    /**
     * Adds commit-related columns to the software_project_scan table
     */
    await knex.raw(`
        -- Start transaction
        BEGIN;
        
        ALTER TABLE software_project_scan
        ADD COLUMN commit_sha VARCHAR(64)
        ADD COLUMN commit_message VARChAR(255),
        ADD COLUMN author_name VARCHAR(64),
        ADD COLUMN commit_date TIMESTAMP,
        ADD COLUMN commit_html_url VARCHAR(255);

        COMMIT;
    `);
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        --TODO
    `);
}
