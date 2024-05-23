import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    /**
     * Changes the constraint on the projects table so that no two projects can be added.
     */
    await knex.raw(`
        -- Start transaction
        BEGIN;
        
        -- Drop the existing constraint
        ALTER TABLE "software_project"
        DROP CONSTRAINT "software_project_full_name_branch_name_unique";
        
        -- Add the new constraint for uniqueness on just the project fullname
        ALTER TABLE "software_project"
        ADD CONSTRAINT "software_project_full_name_unique" UNIQUE ("full_name");
        
        -- Commit transaction
        COMMIT;
    `);
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        -- Start transaction
        BEGIN;
        
        -- Drop the existing constraint on just the "full_name"
        ALTER TABLE "software_project"
        DROP CONSTRAINT "software_project_full_name_unique";
        
        -- Re-add the original constraint for uniqueness on both "full_name" and "branch_name"
        ALTER TABLE "software_project"
        ADD CONSTRAINT "software_project_full_name_branch_name_unique" UNIQUE ("full_name", "branch_name");
        
        -- Commit transaction
        COMMIT;
    `);
}
