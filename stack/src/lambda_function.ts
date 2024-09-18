import { downloadAndUnzipRepo } from "./archive";
import { classify } from "./classify";
import { sendResults } from "./upload";
import { getContributorsJson, getLanguagesJson, getLastCommitJson} from "./vcs";

interface IProjectScanSqsMessage {
    project: {
        repoFullName: string;
        branchName: string;
    },
    api: {
        successEndpoint: string;
        errorEndpoint: string;
    }
}

type Event = {
    Records: { body: IProjectScanSqsMessage }[]
}

export async function handler(event: Event): Promise<void> {
    const { Records } = event;

    const destinationFolder = process.env.PROCESSING_LOCAL_DESTINATION_FOLDER; // os.environ.get('PROCESSING_LOCAL_DESTINATION_FOLDER')
    
    const promises = Records.map(async (record) => {
        const { body: { project, api } } = record;
        const { successEndpoint } = api;

        const { pathToRepo } = await downloadAndUnzipRepo(
            project.repoFullName,
            project.branchName,
            destinationFolder
        );

        const tags = await classify(pathToRepo);
        const contributors = await getContributorsJson(project.repoFullName)
        const languages = await getLanguagesJson(project.repoFullName)
        const lastCommit = await getLastCommitJson(project.repoFullName)

        return sendResults(
            successEndpoint,
            {
                tags,
                contributors,
                languages,
                lastCommit
            }
        );
    });

    await Promise.all(promises);
}
