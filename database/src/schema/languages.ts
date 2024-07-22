import { serial, varchar, pgTable, timestamp, integer } from 'drizzle-orm/pg-core'
import { ProjectScan } from './scans';

export const ProjectLanguage = pgTable('software_project_language', {
    softwareProjectLanguageId: serial('software_project_language_id').primaryKey(),
    softwareProjectScanId: integer('software_project_scan_id')
        .notNull()
        .references(() => ProjectScan.softwareProjectScanId),
    languageName: varchar('language_name', { length: 255 }).notNull(),
    numLines: integer('num_lines').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
});
