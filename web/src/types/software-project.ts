import { Project } from "@/database/schemas";
import { InferInsertModel, type InferSelectModel } from 'drizzle-orm'
import { ProjectScanRecordWithRelations } from "./project-scan";

export type SoftwareProjectRecord = InferSelectModel<typeof Project>;

export type SoftwareProjectWithLatestScan = SoftwareProjectRecord & {
    scan: ProjectScanRecordWithRelations | null;
};

export type CreateSoftwareProjectRecord = InferInsertModel<typeof Project>;

export type SoftwareProjectStatus =
    | 'SCANNING'
    | 'SUCCEEDED'
    | 'FAILED'
    | 'PENDING'
