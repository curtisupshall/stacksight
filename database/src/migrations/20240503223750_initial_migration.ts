import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    /**
     * Creates the software projects table
     */
    await knex.raw(`
        CREATE TABLE "software_project" (
            "software_project_id"   SERIAL PRIMARY KEY,
            "owner_name"            VARCHAR(255) NOT NULL,
            "project_name"          VARCHAR(255) NOT NULL,
            "branch_name"           VARCHAR(255) NOT NULL,
            "full_name"             VARCHAR(255) NOT NULL,
            "description"           VARCHAR(1024) NOT NULL,
            "html_url"              VARCHAR(1024) NOT NULL,
            "created_at"            TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updated_at"            TIMESTAMP(3)
        );

        ALTER TABLE "software_project" ADD CONSTRAINT "software_project_full_name_branch_name_unique" UNIQUE ("full_name", "branch_name");
    `);

    /**
     * Creates the table used to record software project scans
     */
    await knex.raw(`
        CREATE TABLE "software_project_scan" (
            "software_project_scan_id"  SERIAL PRIMARY KEY,
            "software_project_id"       INTEGER NOT NULL,
            "dispatched_at"             TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "completed_at"              TIMESTAMP(3),
            "aborted_at"                TIMESTAMP(3),
        
            FOREIGN KEY ("software_project_id") REFERENCES "software_project" ("software_project_id")
        );
    `);


    /**
     * Creates the table used to record software project tags discovered during scans
     */
    await knex.raw(`
        CREATE TABLE "software_project_tag" (
            "software_project_tag_id"   SERIAL PRIMARY KEY,
            "software_project_id"       INTEGER NOT NULL,
            "tag"                       VARCHAR(255),
            "created_at"                TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updated_at"                TIMESTAMP(3),
            
            FOREIGN KEY ("software_project_id") REFERENCES "software_project" ("software_project_id")
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(``);
}

