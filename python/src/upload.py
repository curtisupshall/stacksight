import requests
import json
import os

def send_results(request_url, tags):
    print('Your results are being uploaded')

    # Prepare the request
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

def send_error(request_url, errorMessage):
    print('Sending error message to API.')

    # Prepare the request
    authorization = f"Bearer {os.environ.get('STACKSIGHT_SECRET_KEY')}"
    headers = {
        'Authorization': authorization
    }
    data = json.dumps({
        'message': errorMessage
    })

    # Send the request
    print('Sending now...')
    requests.post(request_url, data=data, headers=headers)
    print('Sent.')