import { Project } from "@/database/schemas";
import { InferInsertModel, type InferSelectModel } from 'drizzle-orm'

export type SoftwareProjectRecord = InferSelectModel<typeof Project>;


// Desired response type:
// export interface ISoftwareProject extends ISoftwareProjectRecord {
//     last_scan: IProjectScan | null;
// }

export type CreateSoftwareProjectRecord = InferInsertModel<typeof Project>;

export type SoftwareProjectStatus =
    | 'SCANNING'
    | 'SUCCEEDED'
    | 'FAILED'
    | 'PENDING'
