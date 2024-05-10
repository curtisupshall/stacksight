import requests
import json

def upload_results():
    api_host = 'https://6c97-24-69-152-131.ngrok-free.app'
    endpoint='/api/results'
    
    request_url = f'{api_host}/{endpoint}'
    requests.post(request_url, data=json.dumps({ "name": "Bob" }))

upload_results()