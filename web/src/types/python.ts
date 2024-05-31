

export interface IProjectScanSqsMessageBody {
    project: {
        repoFullName: string;
        branchName: string;
    },
    api: {
        successEndpoint: string;
        errorEndpoint: string;
    }
}

export interface IProjectScanLambdaResponse {
    tags: string[];
    contributors: any[];
    last_commit: any;
    languages: Record<string, number>
}
