import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    /**
     * Creates the software_project_languages table
     */
    await knex.raw(`
        CREATE TABLE "software_project_language" (
            "software_project_language_id"   SERIAL PRIMARY KEY,
            "software_project_scan_id"       INTEGER NOT NULL,
            "language"                       VARCHAR(255),
            "num_lines"                      INTEGER,
            "created_at"                     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updated_at"                     TIMESTAMP(3),
        
            FOREIGN KEY ("software_project_scan_id") REFERENCES "software_project_scan" ("software_project_scan_id")
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        DROP TABLE "software_project_language";
    `);
}
