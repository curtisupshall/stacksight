import requests
import json
import os

def upload_results(project, tags):
    print('Your results are being uploaded')
    software_project_id = project.get('softwareProjectId')
    if not software_project_id:
        raise Exception('No software project ID was found.')

    api_host = 'https://0c76-24-69-152-131.ngrok-free.app'
    endpoint=f'/api/projects/{software_project_id}'
    
    # Prepare the request
    request_url = f'{api_host}/{endpoint}'
    
    authorization = f"Bearer {os.environ.get('CIMS_SECRET_KEY')}"
    headers = {
        'Authorization': authorization
    }
    data = json.dumps({
        'tags': tags
    })
    
    print('Sending now...')
    # Send the request
    requests.patch(request_url, data=data, headers=headers)
    print('Sent.')

upload_results(
    {
        'softwareProjectId': 2,
    },
    ['javascript']
)