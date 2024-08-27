import Library from "../../Library";

const NextJs: Library = {
    metadata: {
        name: 'react',
        label: 'React.js',
        description: "The library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.",
        website: "https://react.dev/",
    },

    artifacts: [
        {
            file: /.\/index.(tsx|jsx)$/,
            score: 0.50,
        }
    ],

    sources: [
        {
            file: /.*\.(tsx|jsx)$/,
            score: 0.75,
            linetext: /import .* from (\"|\')react(\"|\')(;|$)/
        }
    ],

    packages: [
        {
            file: /.*\/package.json/,
            score: 0.5,
            linetext: /"react":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")/
        },
        {
            file: /.*\/package.json/,
            score: 0.5,
            linetext: /"react-dom":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")/
        }
    ],

    children: [
        {
            metadata: {
                name: 'react-typescript',
                label: 'TypeScript React',
                description: 'React with TypeScript',
                website: 'https://react.dev/learn/typescript',
            },
            artifacts: [
                {
                    file: /.\/index.tsx$/,
                    score: 0.95,
                }
            ],
            packages: [
                {
                    file: /.*\/package.json/,
                    score: 0.5,
                    linetext: /"\@types\/react":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")/
                },
                {
                    file: /.*\/package.json/,
                    score: 0.5,
                    linetext: /"\@types\/react-dom":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")/
                }
            ],
        }
    ]
}

export default NextJs;
