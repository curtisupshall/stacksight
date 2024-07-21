import Library from "../../Library";

export default class extends Library {
    metadata = () => ({
        kind: 'library' as const,
        name: 'next',
        label: 'Next.js',
        description: "A framework for building React apps",
        website: "https://nextjs.org/",
    });

    artifacts = () => [
        {
            file: /.*\/\.next$/,
            score: 0.75,
        },
        {
            file: /.\/app\/(page|layout).(tsx|jsx)$/,
            score: 0.50,
        }
    ];

    sources = () => [
        {
            file: /.*\.(tsx|jsx)$/,
            score: 0.75,
            linetext: /import .* from (\"|\')next(\/[a-z]+)?(\"|\')(;|$)/
        },
        {
            file: /.*\/package.json/,
            score: 1.0,
            linetext: /"next":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")/
        }
    ];

    variants = () => [
        {
            metadata: {
                kind: 'variant' as const,
                name: 'app-router',
                label: 'App Router',
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
                kind: 'variant' as const,
                name: 'pages-router',
                label: 'Pages Router',
                website: 'https://nextjs.org/docs/app',
            },
            artifacts: [
                {
                    file: /.*\/pages\/.*\.(tsx|jsx)$/,
                    score: 1,
                    disqualify: /.*\/(page|layout).(tsx|jsx)$/,
                }
            ]
        }
    ];

}
