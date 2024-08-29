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

    const scores = crawler.crawl(projectPath);
    const tags = Object.entries(scores)
        // .filter(([tag, score]) => {
        //     return score >= 1.0;
        // })
        .map(([tag, score]) => `${tag}(${score})`);

    return tags;
}
