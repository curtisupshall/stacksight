import { type Tag } from "./Library";
import Crawler from "./Crawler";
import allLibraries from "./libraries";

export const classify = async (projectPath: string): Promise<Tag[]> => {
    console.log(`Classifying project at ${projectPath}`);
    const crawler = new Crawler();

    Object.values(allLibraries).forEach((libraries) => {
        libraries.forEach((library) => {
            crawler.observe(library);
        })
    })

    crawler.crawl(projectPath);
    console.log(crawler.scores());
    const tags = crawler.tags();

    return tags;
}
