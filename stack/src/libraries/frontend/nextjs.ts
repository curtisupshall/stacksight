import Library from "../../Library";

export default class extends Library {
    metadata = () => ({
        name: 'next',
        label: 'Next.js',
        description: "A framework for building React apps",
        website: "https://nextjs.org/",
    });

    artifacts = () => [
        {
            file: /.*\/\.next$/,
            score: 0.5,
        },
        {
            file: /.\/app\/.*\/(page|layout).(tsx|jsx)$/,
            score: 0.5,
        }
    ];

    sources = () => [
        {
            file: /.*\.(tsx|jsx)$/,
            score: 0.5,
            linetext: /import .* from (\"|\')next(\/[a-z])?(\"|\')(;|$)/
        }
    ];

    // packages = () => [
    //     {

    //     }
    // ];

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
                    file: /.\/app\/.*\/(page|layout).(tsx|jsx)$/,
                    score: 1,
                }
            ]
        },
        // {
        //     name: 'pages-router',
        //     label: 'Pages Router',
        //     website: 'https://nextjs.org/docs/app',
        //     artifacts: [
        //         {
        //             file: /.*\/pages\/.*\.(tsx|jsx)$/,
        //             score: 1,
        //             disqualify: /.*\/(page|layout).(tsx|jsx)$/,
        //         }
        //     ]
        // }
    ];

}
