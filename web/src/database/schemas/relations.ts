import { relations } from 'drizzle-orm';
import { Project } from './projects';
import { ProjectCommit, ProjectScan, ProjectTag } from './scans';
import { ProjectScanContributor } from './contributors';
import { ProjectLanguage } from './languages';

export const ProjectRelations = relations(Project, ({ many }) => {
    return {
        scans: many(ProjectScan),
    }
});

export const ProjectScanRelations = relations(ProjectScan, ({ one, many }) => {
    return {
        tags: many(ProjectTag),
        commit: one(ProjectCommit),
        contributors: many(ProjectScanContributor),
        languages: many(ProjectLanguage),
        project: one(Project, {
            fields: [ProjectScan.softwareProjectId],
            references: [Project.softwareProjectId]
        }),
    }
});

export const ProjectTagRelations = relations(ProjectTag, ({ one }) => {
    return {
        scan: one(ProjectScan, {
            fields: [ProjectTag.softwareProjectScanId],
            references: [ProjectScan.softwareProjectScanId]
        }),
    }
});

export const ProjectCommitRelations = relations(ProjectCommit, ({ one }) => {
    return {
        scan: one(ProjectScan, {
            fields: [ProjectCommit.softwareProjectScanId],
            references: [ProjectScan.softwareProjectScanId],
        }),
    }
});

export const ProjectScanContributorRelations = relations(ProjectScanContributor, ({ one }) => {
    return {
        scan: one(ProjectScan, {
            fields: [ProjectScanContributor.softwareProjectScanId],
            references: [ProjectScan.softwareProjectScanId]
        }),
    }
});

export const ProjectScanLanguageRelations = relations(ProjectLanguage, ({ one }) => {
    return {
        scan: one(ProjectScan, {
            fields: [ProjectLanguage.softwareProjectScanId],
            references: [ProjectScan.softwareProjectScanId]
        }),
    }
});
