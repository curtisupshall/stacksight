
export interface ISoftwareProjectRecord {
    software_project_id: number;
    owner_name: string;
    project_name: string;
    branch_name: string;
    full_name: string;
    description: string;
    html_url: string;
}

export interface ISoftwareProject extends ISoftwareProjectRecord {
    last_scan_dispatched_at: string;
    last_scan_completed_at: string | null;
    last_scan_aborted_at: string | null;
    tags: string[] | null;
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
    | 'PENDING'
    | 'SUCCEEDED'
    | 'FAILED'
    | 'UNKNOWN'
