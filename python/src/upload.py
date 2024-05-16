import requests
import json
import os

def upload_results(project, tags):
    print('Your results are being uploaded')
    software_project_id = project.get('softwareProjectId')
    software_project_scan_id = project.get('softwareProjectScanId')
    if not software_project_id:
        raise Exception('No software project ID was found.')

    api_host = os.environ.get('PYTHON_UPLOAD_API_ENDPOINT')
    endpoint=f'/api/projects/{software_project_id}/scans/{software_project_scan_id}'
    
    # Prepare the request
    request_url = f'{api_host}/{endpoint}'
    authorization = f"Bearer {os.environ.get('STACKSIGHT_SECRET_KEY')}"
    headers = {
        'Authorization': authorization
    }
    data = json.dumps({
        'tags': tags
    })

    # Send the request
    print('Sending now...')
    requests.patch(request_url, data=data, headers=headers)
    print('Sent.')
