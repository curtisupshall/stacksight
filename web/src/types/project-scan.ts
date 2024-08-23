import { ProjectCommit, ProjectLanguage, ProjectScan, ProjectTag } from "@/database/schemas";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { ProjectScanContributorRecord } from "./contributor";

export type ProjectScanRecord = InferSelectModel<typeof ProjectScan>;

export type ProjectScanTagRecord = InferSelectModel<typeof ProjectTag>;
export type CreateProjectScanTagRecord = InferInsertModel<typeof ProjectTag>;

export type ProjectScanCommitRecord = InferSelectModel<typeof ProjectCommit>;
export type CreateProjectScanCommitRecord = InferInsertModel<typeof ProjectCommit>;

export type ProjectScanRecordWithRelations = ProjectScanRecord & {
    tags: ProjectScanTagRecord[],
    commits: ProjectScanCommitRecord[],
    contributors: ProjectScanContributorRecord[],
};

export type CreateProjectScanRecord = InferInsertModel<typeof ProjectScan>;
