from git import Repo

def clone_repo(repo_full_name):
    repo_url = f'https://github.com/{repo_full_name}.git'
    clone_dir = f'.cims/{repo_full_name}/SOURCE'

    try:
        Repo.clone_from(repo_url, clone_dir)
        print(f"Repository cloned successfully into {clone_dir}")
    except Exception as e:
        print(f"Failed to clone repository: {e}")

clone_repo('curtisupshall/mandelbrot-ascii')
