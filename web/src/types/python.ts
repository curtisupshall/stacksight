

export interface IProjectScanSqsMessage {
    project: {
        repoFullName: string;
        branchName: string;
    },
    api: {
        successEndpoint: string;
        errorEndpoint: string;
    }
}
