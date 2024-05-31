import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    /**
     * Creates the software_organization table
     */
    await knex.raw(`
        CREATE TABLE "software_organization" (
            "software_organization_id"   SERIAL PRIMARY KEY,
            "name"                       VARCHAR(64),
            "full_name"                  VARCHAR(255),
            "bio"                        VARCHAR(255),
            "html_url"                   VARCHAR(255),
            "avatar_url"                 VARCHAR(255),
            "created_at"                 TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updated_at"                 TIMESTAMP(3)
        );
    `);
}

/**
 * Removes the software_organization table
 */
export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        DROP TABLE "software_organization";
    `);
}
