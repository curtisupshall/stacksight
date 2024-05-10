from vc import clone_repos
from classify import classify
from download import download_and_unzip_repo

def lambda_handler(event, context):
    repo_fullname = 'bcgov/biohubbc'

    # Clone the repo
    branch = 'dev'
    path_to_repo = download_and_unzip_repo(repo_fullname, branch)

    # Process the repos
    processed = []

    libraries = classify(path_to_repo)
    processed.append({
        'fullName': repo_fullname,
        'tags': libraries
    })

    return {
        'statusCode': 200,
        'body': processed
    }

