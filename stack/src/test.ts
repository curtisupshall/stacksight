import { handler } from './lambda_function';

async function main() {

    await handler({
        Records: [
            {
                body: {
                    project: {
                        repoFullName: 'bcgov/biohubbc',
                        branchName: 'dev'
                    },
                    api: {
                        successEndpoint: 'http://localhost:3000/api/projects/1/scans/1',
                        errorEndpoint: 'http://localhost:3000/api/projects/1/scans/1/error'
                    }
                }
            }
        ]
    })
}

main();