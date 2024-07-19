import * as fs from 'fs';
import * as path from 'path';

import Library, { Tag, Matcher, Metadata } from './Library';

interface LibraryStats {
  metadata: Metadata;
  score: number;
}

class Crawler {
  private projectPath: string;
  private matchers: Matcher[];
  private libraries: Record<Tag, LibraryStats>;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
    this.libraries = {};
  }

  public run(): void {
    this.crawl(this.projectPath);
  }

  public observe(library: Library) {
    const { matchers, tags } = library.compile();

    matchers.forEach((matcher) => {
      this.matchers.push(matcher)
    });

    tags.forEach((tag) => {
      this.libraries[tag] 
    })
  }

  private crawl(dir: string): void {
    fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
      if (err) {
        console.error(`Error reading directory ${dir}:`, err);
        return;
      }

      entries.forEach(entry => {
        const fullPath = path.join(dir, entry.name);

        

        console.log(fullPath);

        // if (entry.isDirectory()) {
        //   console.log(`Folder: ${entry.name}`);
        //   this.crawl(fullPath);
        // } else if (entry.isFile()) {
        //   console.log(`File: ${entry.name}`);
        //   this.printFileLines(fullPath, 2);
        // }
      });
    });
  }

  private printFileLines(filePath: string, numberOfLines: number): void {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${filePath}:`, err);
        return;
      }

      const lines = data.split('\n').slice(0, numberOfLines);
      lines.forEach((line, index) => {
        console.log(`Line ${index + 1}: ${line}`);
      });
    });
  }
}

// Usage
const projectPath = './.projects/hipo-uni';
const crawler = new Crawler(projectPath);
crawler.run();
