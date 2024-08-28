import Library from "../../Library";

const VueJs: Library = {
    metadata: {
        name: 'vue',
        label: 'Vue.js',
        description: "A progressive JavaScript framework for building user interfaces.",
        website: "https://vuejs.org/",
    },

    artifacts: [
        {
            file: /.\/App.vue$/,
            score: 0.90,
        }
    ],

    sources: [
        {
            file: /.*\/main\.(ts|js)$/,
            score: 0.50,
            linetext: /import .* from (\"|\')\vue(\"|\')(;|$)/
        },
        {
            file: /.*\.vue$/,
            score: 0.25,
            linetext: /(defineProps\<\{|defineProps\(\{)/
        }
    ],

    packages: [
        {
            file: /.*\/package.json/,
            score: 0.75,
            linetext: /"vue":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")/
        },
    ],

    children: [
        {
            metadata: {
                name: 'vue-typescript',
                label: 'TypeScript Vue',
                description: 'Vue with TypeScript',
                website: 'https://vuejs.org/guide/typescript/overview',
            },
            artifacts: [
                {
                    file: /.\/main.ts$/,
                    score: 0.75,
                }
            ],
            sources: [
                {
                    file: /.*\.vue$/,
                    score: 0.50,
                    linetext: /defineProps\<\{/
                }
            ],
            packages: [
                {
                    file: /.*\/package.json/,
                    score: 0.5,
                    linetext: /"\@vue\/tsconfig":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")/
                }
            ],
        }
    ]
}

export default VueJs;
