from git import Repo
from typing import List

def clone_repos(repo_full_names: List[str]):
    for repo_full_name in repo_full_names:
        repo_url = f'git@github.com:{repo_full_name}.git'
        clone_dir = f'.cims/{repo_full_name}'

        try:
            Repo.clone_from(repo_url, clone_dir)
            print(f"Repository cloned successfully into {clone_dir}")
        except Exception as e:
            print(f"Failed to clone repository: {e}")
            raise e
