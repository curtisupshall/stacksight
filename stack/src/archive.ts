import fs from 'fs';
import path from 'path';
import https from 'https';
import crypto from 'crypto';
import AdmZip from 'adm-zip';

const generateArchiveName = (): string => {
	return crypto.randomUUID();
}

const recursivelyDeleteFolder = (destinationFolder: string) => {
	if (fs.existsSync(destinationFolder)) {
		// Recursively delete everything
		fs.readdirSync(destinationFolder).forEach((fileOrDir) => {
			const fullPath = path.join(destinationFolder, fileOrDir);
			if (fs.lstatSync(fullPath).isDirectory()) {
				fs.rmSync(fullPath, { recursive: true });
			} else {
				fs.unlinkSync(fullPath);
			}
		});
	}
}

export async function downloadAndUnzipRepo(
	fullname: string,
	branch: string = 'master',
	destinationFolder: string = '.projects/'
): Promise<{ pathToRepo: string }> {
	// Create the folder used to store the repo
	recursivelyDeleteFolder(destinationFolder);
	fs.mkdirSync(destinationFolder, { recursive: true });

	// Form the URL to download the repository zip
	const downloadUrl = `https://github.com/${fullname}/archive/refs/heads/${branch}.zip`;
	const archiveName = `${generateArchiveName()}.zip`;
	const zipPath = path.join(destinationFolder, archiveName);
	const pathToRepo = path.join(destinationFolder, `${fullname.split('/')[1]}-${branch}`);

	console.log("Downloading repository...");

	// Make the request and download the zip file
	await new Promise<void>((resolve, reject) => {
		https.get(downloadUrl, (response) => {
			if (response.statusCode === 302) {
				// Handle GitHub's redirect
				https.get(response.headers.location!, (redirectedResponse) => {
					const fileStream = fs.createWriteStream(zipPath);
					redirectedResponse.pipe(fileStream);

					fileStream.on('finish', () => {
						fileStream.close();
						console.log(`Repository downloaded as ${zipPath}`);
						resolve();
					});
				}).on('error', (err) => {
					fs.unlink(zipPath, () => { }); // Delete the file if an error occurs
					reject(err);
				});
			} else if (response.statusCode === 200) {
				const fileStream = fs.createWriteStream(zipPath);
				response.pipe(fileStream);

				fileStream.on('finish', () => {
					fileStream.close();
					console.log(`Repository downloaded as ${zipPath}`);
					resolve();
				});
			} else {
				reject(new Error(`Failed to download repository. Status code: ${response.statusCode}`));
			}
		}).on('error', (err) => {
			reject(err);
		});
	});

	console.log("Download completed. Extracting files...");

	// Unzip the archive
	const zipBuffer = fs.readFileSync(zipPath);
	const archive = new AdmZip(zipBuffer);

	// Write the extracted files to the destination folder
	archive.extractAllTo(destinationFolder, true);

	// fs.writeFileSync(pathToRepo, extractedBuffer);

	console.log("Extraction completed.");

	// Remove the zip file after extraction
	fs.unlinkSync(zipPath);
	console.log("Zip file removed.");

	return { pathToRepo };
}
