import https from 'https'

export interface IProjectScanLambdaResponse {
    tags: string[];
    contributors: any[];
    lastCommit: any;
    languages: Record<string, number>
}


export async function sendResults(successEndpoint: string, results: IProjectScanLambdaResponse) {
    const authorization = `Bearer ${process.env.STACKSIGHT_SECRET_KEY}`
    const headers = {
        'Authorization': authorization
    }

    // return fetch(successEndpoint, {
    //     method: 'PATCH',
    //     headers,
    //     body: JSON.stringify(results), 
    // });
    const { tags } = results;
    console.log({ tags });
}

// def send_error(request_url, errorMessage):
//     print('Sending error message to API.')

//     # Prepare the request
//     authorization = f"Bearer {os.environ.get('STACKSIGHT_SECRET_KEY')}"
//     headers = {
//         'Authorization': authorization
//     }
//     data = json.dumps({
//         'message': errorMessage
//     })

//     # Send the request
//     print('Sending now...')
//     requests.post(request_url, data=data, headers=headers)
//     print('Sent.')
