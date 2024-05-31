from classify import classify
from download import download_and_unzip_repo
from upload import send_results
from vc import get_contributors_json, get_languages_json, get_last_commit_json
import json
import os

def lambda_handler(event, context):
    records = event.get('Records')

    for index, record in enumerate(records):
        body = json.loads(record.get('body'))

        # Get data from request body
        project_body = body.get('project', {})
        endpoints_body = body.get('api', {})

        repo_fullname = project_body.get('repoFullName')
        branch = project_body.get('branchName')

        success_endpoint = endpoints_body.get('successEndpoint')
        error_endpoint = endpoints_body.get('errorEndpoint')

        # Clone the repo
        destination_folder = os.environ.get('PYTHON_LOCAL_DESTINATION_FOLDER')
        path_to_repo = download_and_unzip_repo(repo_fullname, branch, destination_folder)

        # Process the repos
        tags = classify(path_to_repo)
        contributors = get_contributors_json(repo_fullname)
        languages = get_languages_json(repo_fullname)
        last_commit = get_last_commit_json(repo_fullname)

        send_results(success_endpoint, tags, contributors, languages, last_commit)

    return {
        'statusCode': 200,
        'body': 'Done.'
    }

