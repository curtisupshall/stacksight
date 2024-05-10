import requests
import zipfile
import os

def download_and_unzip_repo(fullname, branch='master', destination_folder='.cims/'):
    os.makedirs(destination_folder)
    # Form the URL to download the repository zip
    download_url = f"https://github.com/{fullname}/archive/refs/heads/{branch}.zip"
    zip_path = os.path.join(destination_folder, f"tmp.zip")
    path_to_repo = os.path.join(destination_folder, f"{fullname.split('/')[1]}-{branch}")

    # Make the request and download the zip file
    print("Downloading repository...")
    response = requests.get(download_url)
    if response.status_code == 200:
        with open(zip_path, 'wb') as file:
            file.write(response.content)

        print("Download completed. Extracting files...")
        # Unzipping the file
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(destination_folder)
        print("Extraction completed.")
        
        # Optionally, remove the zip file after extraction
        os.remove(zip_path)
        print("Zip file removed.")
    else:
        print(f"Failed to download the repository. Status code: {response.status_code}")

    return path_to_repo

# # Example usage
# result = download_and_unzip_repo('curtisupshall/rdi', branch='master')

# print(result)
