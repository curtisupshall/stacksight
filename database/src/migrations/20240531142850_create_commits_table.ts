import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    /**
     * Removes commit-related columns from the software_project_scan table and creates the
     * software_project_scan_commit table
     */
        await knex.raw(`
        -- Start transaction
        BEGIN;

        ALTER TABLE software_project_scan
        DROP COLUMN commit_sha,
        DROP COLUMN commit_message,
        DROP COLUMN author_name,
        DROP COLUMN commit_date,
        DROP COLUMN commit_html_url;

        CREATE TABLE "software_project_scan_commit" (
            "software_project_scan_commit_id"   SERIAL PRIMARY KEY,
            "software_project_scan_id"          INTEGER NOT NULL,
            "commit_sha"                        VARCHAR(64),
            "commit_message"                    VARChAR(255),
            "author_name"                       VARCHAR(64),
            "commit_date"                       TIMESTAMP,
            "commit_html_url"                   VARCHAR(255),
            "created_at"                        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updated_at"                        TIMESTAMP(3),
        
            FOREIGN KEY ("software_project_scan_id") REFERENCES "software_project_scan" ("software_project_scan_id")
        );

        COMMIT;
    `);

    /**
     * Creates the software_project_languages table
     */
    await knex.raw(`
        
    `);
}

export async function down(knex: Knex): Promise<void> {
    /**
     * Adds commit-related columns to the software_project_scan table and drops the 
     * software_project_scan_commit table
     */
    await knex.raw(`
        -- Start transaction
        BEGIN;
        
        ALTER TABLE software_project_scan
        ADD COLUMN commit_sha VARCHAR(64),
        ADD COLUMN commit_message VARChAR(255),
        ADD COLUMN author_name VARCHAR(64),
        ADD COLUMN commit_date TIMESTAMP,
        ADD COLUMN commit_html_url VARCHAR(255);

        DROP TABLE software_project_scan_commit;

        COMMIT;
    `);
}
