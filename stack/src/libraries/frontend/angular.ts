import Library from "../../Library";

const Angular: Library = {
    metadata: {
        name: 'angular',
        label: 'Angular',
        description: "A structural framework for dynamic web apps.",
        website: "https://angular.dev/",
    },

    artifacts: [
        {
            file: /.\/angular.json$/,
            score: 0.50,
        }
    ],

    sources: [
        {
            file: /.*\.ts$/,
            score: 0.75,
            linetext: /import .* from (\"|\')\@angular\/core(\"|\')(;|$)/
        },
        {
            file: /.*\.ts$/,
            score: 0.75,
            linetext: /\@Component\(\{/
        }
    ],

    packages: [
        {
            file: /.*\/package.json/,
            score: 0.75,
            linetext: /"\@angular\/core":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")/
        },
    ],

    children: [
        {
            metadata: {
                name: 'angular-ssr',
                label: 'Angular SSR',
                description: 'Angular with server-side rendering',
                website: 'https://angular.dev/guide/ssr',
            },
            packages: [
                {
                    file: /.*\/package.json/,
                    score: 1,
                    linetext: /"\@angular\/ssr":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")/
                },
            ],
        },
        {
            metadata: {
                name: 'angular-ngrx',
                label: 'NGRX',
                description: 'Reactive state for Angular',
                website: 'https://ngrx.io/',
            },
            packages: [
                {
                    file: /.*\/package.json/,
                    score: 1,
                    linetext: /"\@ngrx\/store":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")/
                },
            ],
        },

    ]
}

export default Angular;
