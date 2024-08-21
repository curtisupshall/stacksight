import { serial, varchar, pgTable, timestamp, integer } from 'drizzle-orm/pg-core'
import { ProjectScan } from './scans';

export const ProjectScanContributor = pgTable('software_project_scan_contributor', {
    softwareProjectContributorId: serial('software_project_contributor_id').primaryKey(),
    softwareProjectScanId: integer('software_project_scan_id')
        .notNull()
        .references(() => ProjectScan.softwareProjectScanId),
    login: varchar('login', { length: 63 }).notNull(),
    htmlUrl: varchar('htmlUrl', { length: 1023 }).notNull(),
    avatarUrl: varchar('avatar_url', { length: 1023 }).notNull(),
    contributions: integer('contributions'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
});
