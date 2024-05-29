import { IProjectLanguage, IProjectScan, IProjectScanRecord } from "./project-scan";

export interface ISoftwareProjectRecord {
    software_project_id: number;
    owner_name: string;
    project_name: string;
    branch_name: string;
    full_name: string;
    description: string;
    html_url: string;
}

// Desired response type:
export interface ISoftwareProject extends ISoftwareProjectRecord {
    last_scan: IProjectScan;
}

export type ICreateSoftwareProjectRecord = Pick<ISoftwareProjectRecord,
    | 'owner_name'
    | 'project_name'
    | 'branch_name'
    | 'full_name'
    | 'description'
    | 'html_url'
>

export type SoftwareProjectStatus =
    | 'SCANNING'
    | 'SUCCEEDED'
    | 'FAILED'
    | 'PENDING'
