import { serial, varchar, pgTable, timestamp } from 'drizzle-orm/pg-core'

export const Project = pgTable('software_project', {
    softwareProjectId: serial('software_project_id').primaryKey(),
    ownerName: varchar('owner_name', { length: 255 }).notNull(),
    projectName: varchar('project_name', { length: 255 }).notNull(),
    branchName: varchar('branch_name', { length: 255 }).notNull(),
    fullName: varchar('full_name', { length: 255 }).notNull().unique(),
    description: varchar('description', { length: 1023 }).notNull(),
    htmlUrl: varchar('html_url', { length: 1023 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
});
