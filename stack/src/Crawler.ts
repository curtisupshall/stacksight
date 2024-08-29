import fs from 'fs';
import path from 'path';

import Library, { compile, LibraryOutput, Matcher, Tag } from './Library';

const IGNORE_DIRS: string[] = [
	'.git',
	'node_modules',
]

class Crawler {
	private _outputs: Record<Tag, LibraryOutput>;
	private _scores: Record<Tag, number>;
	private _filePaths: string[];

	constructor() {
		this._filePaths = [];
		this._outputs = {};
		this._scores = {};
	}

	public scores() {
		return this._scores;
	}

	public observe(library: Library) {
		const outputs = compile(library);
		
		outputs.forEach((output: LibraryOutput) => {
			this._scores[output.tag] = 0;
			this._outputs[output.tag] = output;
		});
	}

	/**
	 * Recursively collects all absoltue file paths under the given directory
	 */
	private collectFilePaths(projectPath: string): void {
		try {
			const entries = fs.readdirSync(projectPath, { withFileTypes: true });

			entries.forEach((entry) => {
				const fullPath = path.join(projectPath, entry.name);

				if (entry.isDirectory()) {
					if (IGNORE_DIRS.includes(entry.name)) {
						return;
					}

					this.collectFilePaths(fullPath);
				} else if (entry.isFile()) {
					this._filePaths.push(fullPath);
				}
			});
		} catch (err) {
			console.error(`Error reading directory ${projectPath}:`, err);
		}
	}


	public crawl(projectPath: string) {
		this.collectFilePaths(projectPath);

		const matchers = Object.values(this._outputs).reduce((acc: Matcher[], output) => {
			return [...acc, ...output.matchers];
		}, [])

		matchers.forEach((matcher: Matcher) => {
			const [
				fileRegex,
				contentRegex,
				tag,
				score
			] = matcher;

			// console.log(matcher)
			for (let i in this._filePaths) {
				const filePath = this._filePaths[i];


				if (!fileRegex.test(filePath)) {
					// Filename does not match
					continue;
				}

				if (contentRegex) {
					const [lineNumber, line] = this.testFileContent(filePath, contentRegex);
					if (lineNumber > -1) {
						// TODO report line number
						// console.log(tag)
						// console.log(filePath);
						// console.log(lineNumber)
						// console.log(line);
					} else {
						continue;
					}
				}
				
				// console.log('MATCH:', matcher)

				this._scores[tag] += score;
				break;
			}

		});

		return this.scores();
	}

	private testFileContent(filePath: string, contentRegex: RegExp): [number, string | null] {
		try {
			const data: string = fs.readFileSync(filePath, 'utf8');
			const lines = data.split('\n');
			const index = lines.findIndex((line) => contentRegex.test(line));
			if (index > -1) {
				return [index, lines[index]]
			}
		} catch (err) {
			console.error(`Error reading file ${filePath}:`, err);
		}
		return [-1, null];
	}

	public tags(): Tag[] {
		const scores = this.scores()
		const tags = Object.entries(scores)
			.filter(([tag, score]) => {
				if (score < 1.0) {
					return false;
				}
				const parentTag = this._outputs[tag].parentTag
				if (parentTag && this._scores[parentTag] < 1.0) {
					return false;
				}
			    return score >= 1.0;
			})
			.map(([tag, _score]) => tag);
		
		const tagSet = new Set<Tag>(tags);

		tags.forEach((tag) => {
			if (this._outputs[tag].subtags) {
				this._outputs[tag].subtags.forEach((subtag) => {
					tagSet.add(subtag);
				})
			}
		});

		return Array.from(tagSet);
	}
}

export default Crawler;
