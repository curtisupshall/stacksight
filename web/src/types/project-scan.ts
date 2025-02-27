import { ProjectCommit, ProjectLanguage, ProjectScan, ProjectTag } from "@/database/schemas";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { ProjectScanContributorRecord } from "./contributor";
import { ProjectScanLanguageRecord } from "./languages";

export type ProjectScanRecord = InferSelectModel<typeof ProjectScan>;

export type ProjectScanTagRecord = InferSelectModel<typeof ProjectTag>;
export type CreateProjectScanTagRecord = InferInsertModel<typeof ProjectTag>;

export type ProjectScanCommitRecord = InferSelectModel<typeof ProjectCommit>;
export type CreateProjectScanCommitRecord = InferInsertModel<typeof ProjectCommit>;

export type ProjectScanRecordWithRelations = ProjectScanRecord & {
    tags: ProjectScanTagRecord[],
    commit: ProjectScanCommitRecord | null,
    contributors: ProjectScanContributorRecord[],
    languages: ProjectScanLanguageRecord[],
};

export type CreateProjectScanRecord = InferInsertModel<typeof ProjectScan>;
