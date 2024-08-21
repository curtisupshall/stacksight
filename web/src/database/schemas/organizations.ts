import { serial, varchar, pgTable, timestamp } from 'drizzle-orm/pg-core'


export const SoftwareOrganization = pgTable('software_organization', {
    softwareOrganizationId: serial('software_organization_id').primaryKey(),
    name: varchar('name', { length: 63 }).notNull(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    bio: varchar('full_name', { length: 1023 }).notNull(),
    htmlUrl: varchar('htmlUrl', { length: 1023 }).notNull(),
    avatarUrl: varchar('avatar_url', { length: 1023 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
});
