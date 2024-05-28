export interface IProjectScanRecord {
    software_project_scan_id: number;
    software_project_id: number;
    commit_sha: string;
    commit_message: string;
    author_name: string;
    commit_date: string;
    commit_html_url: string;
    dispatched_at: string;
    completed_at: string | null;
    aborted_at: string | null;
}

export interface IProjectScan extends IProjectScanRecord {
    tags: string[] | null;
    languages: IProjectLanguage[] | null;
}

export interface IProjectLanguageRecord {
    software_project_language_id: number;
    software_project_scan_id: number;
    language_name: string;
    num_lines: number;
    created_at: string;
    updated_at: string | null;
}

export type IProjectLanguage = Pick<IProjectLanguageRecord,
    | 'language_name'
    | 'num_lines'
>

export type ICreateProjectLanguageRecord = Pick<IProjectLanguageRecord,
    | 'software_project_scan_id'
    | 'language_name'
    | 'num_lines'
>
