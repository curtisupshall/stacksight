from git import Repo

def clone_repo(repo_full_names):
    for repo_full_name in repo_full_names:
        repo_url = f'git@github.com:{repo_full_name}.git'
        clone_dir = f'.cims/{repo_full_name}'

        try:
            Repo.clone_from(repo_url, clone_dir)
            print(f"Repository cloned successfully into {clone_dir}")
        except Exception as e:
            print(f"Failed to clone repository: {e}")


clone_repo([
    'curtisupshall/mandelbrot-ascii',
    'focustimetech/ftt-spotlight',
    'bcgov/pims',
    'bcgov/biohubbc',
    'bcgov/biohub-platform',
    'bcgov/performance',
])
