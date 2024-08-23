import { serial, varchar, pgTable, timestamp, integer } from 'drizzle-orm/pg-core'
import { Project } from './projects';

export const ProjectScan = pgTable('software_project_scan', {
    softwareProjectScanId: serial('software_project_scan_id').primaryKey(),
    softwareProjectId: integer('software_project_id')
        .notNull()
        .references(() => Project.softwareProjectId),
    dispatchedAt: timestamp('dispatched_at').notNull().defaultNow(),
    completedAt: timestamp('completed_at'),
    updatedAt: timestamp('aborted_at'),
});

export const ProjectTag = pgTable('software_project_scan_tag', {
    softwareProjectTagId: serial('software_project_scan_tag_id').primaryKey(),
    softwareProjectScanId: integer('software_project_scan_id')
        .notNull()
        .references(() => ProjectScan.softwareProjectScanId),

    tag: varchar('tag', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
});

export const ProjectCommit = pgTable('software_project_scan_commit', {
    softwareProjectCommitId: serial('software_project_commit_id').primaryKey(),
    softwareProjectScanId: integer('software_project_scan_id')
        .notNull()
        .references(() => ProjectScan.softwareProjectScanId),

    commitSha: varchar('commit_sha', { length: 63 }).notNull(),
    commitMessage: varchar('commit_message', { length: 1023 }).notNull(),
    authorName: varchar('author_name', { length: 63 }).notNull(),
    commitDate: timestamp('commit_date').notNull(),
    commitHtmlUrl: varchar('html_url', { length: 1023 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
});
