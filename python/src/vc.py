import requests

def get_last_commit_json(repo_fullname: str):
    response = requests.get(f'https://api.github.com/repos/{repo_fullname}/commits?per_page=1')
    response.raise_for_status()
    return response.json()

def get_contributors_json(repo_fullname: str):
    response = requests.get(f'https://api.github.com/repos/{repo_fullname}/contributors')
    response.raise_for_status()
    return response.json()

def get_languages_json(repo_fullname: str):
    response = requests.get(f'https://api.github.com/repos/{repo_fullname}/languages')
    response.raise_for_status()
    return response.json()
