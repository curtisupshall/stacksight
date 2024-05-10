
export interface ISoftwareProject {
    software_project_id: number;
    owner_name: string;
    project_name: string;
    branch_name: string;
    description: string;
    html_url: string;
    last_scan_dispatched_at: string;
    last_scan_completed_at: string;
}

export type SoftwareProjectStatus =
    | 'PENDING'
    | 'SUCCEEDED'
    | 'FAILED'
    | 'UNKNOWN'
