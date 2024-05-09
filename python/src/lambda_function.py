from vc import clone_repos
from classify import classify

def lambda_handler(event, context):
    repo_fullnames = ['curtisupshall/rdi']
    
    # Clone the repos
    clone_repos(repo_fullnames)

    # Process the repos
    processed = []
    for repo_fullname in repo_fullnames:
        libraries = classify(repo_fullname)
        processed.append({
            'fullName': repo_fullname,
            'tags': libraries
        })

    return {
        'statusCode': 200,
        'body': processed
        # 'body': 'Howdy'
    }

