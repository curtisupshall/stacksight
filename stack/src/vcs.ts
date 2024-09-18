
export const getLastCommitJson = async (repoFullname: string) => {
    const response = await fetch(`https://api.github.com/repos/${repoFullname}/commits?per_page=1`);
    const json = await response.json();
    return json[0];
}

export const getContributorsJson = async (repoFullname: string) => {
    const response = await fetch(`https://api.github.com/repos/${repoFullname}/contributors`);
    return response.json();
}

export const getLanguagesJson = async (repoFullname: string) => {
    const response = await fetch(`https://api.github.com/repos/${repoFullname}/languages`);
    return response.json();
}

