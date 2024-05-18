export interface IProjectScanRecord {
    software_project_scan_id: number;
    software_project_id: number;
}

export interface IProjectLanguageRecord {
    software_project_language_id: number;
    software_project_scan_id: number;
    langauge: string;
    num_lines: number;
    created_at: string;
    updated_at: string | null;
}

export type IProjectLanguage = Pick<IProjectLanguageRecord,
    | 'langauge'
    | 'num_lines'
>


export type ICreateProjectLanguageRecord = Pick<IProjectLanguageRecord,
    | 'software_project_scan_id'
    | 'langauge'
    | 'num_lines'
>
