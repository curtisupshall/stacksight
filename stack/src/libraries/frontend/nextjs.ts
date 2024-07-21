import Library from "../../Library";

const NextJs: Library = {
    metadata: {
        name: 'next',
        label: 'Next.js',
        description: "A framework for building React apps",
        website: "https://nextjs.org/",
    },

    artifacts: [
        {
            file: /.*\/\.next$/,
            score: 0.75,
        },
        {
            file: /.\/app\/(page|layout).(tsx|jsx)$/,
            score: 0.50,
        }
    ],

    sources: [
        {
            file: /.*\.(tsx|jsx)$/,
            score: 0.75,
            linetext: /import .* from (\"|\')next(\/[a-z]+)?(\"|\')(;|$)/
        }
    ],

    packages: [
        {
            file: /.*\/package.json/,
            score: 1.0,
            linetext: /"next":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")/
        }
    ],

    children: [
        {
            metadata: {
                name: 'app-router',
                label: 'App Router',
                description: 'Next.js App Router',
                website: 'https://nextjs.org/docs/app',
            },
            artifacts: [
                {
                    file: /.*\/app\/.*\/(page|layout).(tsx|jsx)$/,
                    score: 1,
                }
            ]
        },
        {
            metadata: {
                name: 'pages-router',
                description: 'Next.js Pages Router',
                label: 'Pages Router',
                website: 'https://nextjs.org/docs/app',
            },
            artifacts: [
                {
                    file: /.*\/pages\/.*\.(tsx|jsx)$/,
                    score: 1,
                }
            ]
        }
    ]

}

export default NextJs;
