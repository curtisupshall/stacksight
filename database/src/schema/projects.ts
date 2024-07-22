import { serial, varchar, pgTable } from 'drizzle-orm/pg-core'

export const ProjectsTable = pgTable('software_project_new', {
    software_project_id: serial('software_project_id').primaryKey(),
    owner_name: varchar('owner_name', { length: 255 }).notNull()
});
