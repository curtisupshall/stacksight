import * as fs from 'fs';
import * as path from 'path';

import allLibraries from './libraries/index'
import Library, { compile, LibraryOutput, Matcher, Tag } from './Library';

// interface LibraryStats {
//   metadata: Metadata;
//   score: number;
// }

const IGNORE_DIRS: string[] = [
	'.git',
	'node_modules',
]


class Crawler {
	private _projectPath: string;
	private _outputs: LibraryOutput[];
	private _scores: Record<Tag, number>;
	private _filePaths: string[];

	constructor(projectPath: string) {
		this._projectPath = projectPath;
		this._filePaths = [];
		this._outputs = [];
		this._scores = {};
	}

	public run(): void {
		this.crawl(this._projectPath);
	}

	public scores() {
		return this._scores;
	}

	public observe(library: Library) {
		const outputs = compile(library);
		
		outputs.forEach((output: LibraryOutput) => {
			this._scores[output.tag] = 0;
			this._outputs.push(output)
		});
	}

	/**
	 * Recursively collects all absoltue file paths under the given directory
	 */
	private collectFilePaths(dir: string): void {
		try {
			const entries = fs.readdirSync(dir, { withFileTypes: true });

			entries.forEach((entry) => {
				const fullPath = path.join(dir, entry.name);

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
			console.error(`Error reading directory ${dir}:`, err);
		}
	}


	private crawl(dir: string): void {
		this.collectFilePaths(this._projectPath);

		const matchers = this._outputs.reduce((acc: Matcher[], output) => {
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
}

// Usage
const projectPath = './.projects/moh-pipd/';
const crawler = new Crawler(projectPath);

Object.entries(allLibraries).forEach(([categorySlug, libraries]) => {
	libraries.forEach((library) => {

		crawler.observe(library);
	})
})

crawler.run();

console.log(crawler.scores())
