export interface IProjectScanRecord {
    software_project_scan_id: number;
    software_project_id: number;
}

export interface IProjectLanguageRecord {
    software_project_language_id: number;
    software_project_scan_id: number;
    language: string;
    num_lines: number;
    created_at: string;
    updated_at: string | null;
}

export type IProjectLanguage = Pick<IProjectLanguageRecord,
    | 'language'
    | 'num_lines'
>


export type ICreateProjectLanguageRecord = Pick<IProjectLanguageRecord,
    | 'software_project_scan_id'
    | 'language'
    | 'num_lines'
>
