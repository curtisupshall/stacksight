import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    /**
     * Creates the software_project_languages table
     */
    await knex.raw(`
        CREATE TABLE "software_organization" (
            "software_organization_id"   SERIAL PRIMARY KEY,
            "name"                       INTEGER NOT NULL,
            "html_url"                   VARCHAR(255),
            "avatar_url"                 VARCHAR(255),
            "created_at"                 TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updated_at"                 TIMESTAMP(3)
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        DROP TABLE "software_organization";
    `);
}
