from classify import classify
from download import download_and_unzip_repo
from upload import upload_results
import json

def lambda_handler(event, context):
    records = event.get('Records')

    for index, record in enumerate(records):
        body = json.loads(record.get('body'))
        print(f'Found record {index}')

        # Clone the repo
        repo_fullname = body.get('repoFullName')
        branch = body.get('branchName')
        path_to_repo = download_and_unzip_repo(repo_fullname, branch)

        # Process the repos
        tags = classify(path_to_repo)
        upload_results(body, tags)

    return {
        'statusCode': 200,
        'body': 'Done.'
    }

