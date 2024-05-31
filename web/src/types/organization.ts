export interface ISoftwareOrganizationRecord {
    software_organization_id: string;
    name: string;
    full_name: string;
    bio: string;
    html_url: string;
    avatar_url: string;
}

export type ICreateSoftwareOrganizationRecord = Pick<ISoftwareOrganizationRecord,
    | 'name'
    | 'html_url'
    | 'avatar_url'
    | 'full_name'
    | 'bio'
>
