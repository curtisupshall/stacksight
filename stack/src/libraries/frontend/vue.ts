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
            linetext: /import .* from (\"|\')vue(\"|\')(;|$)/
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
                description: 'Vue.js with TypeScript',
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
        },
        {
            metadata: {
                name: 'vue-jsx',
                label: 'Vue JSX',
                description: 'Vue.js with JSX support',
                website: 'https://vuejs.org/guide/extras/render-function',
            },
            sources: [
                {
                    file: /.*\/tsconfig.json$/,
                    score: 1,
                    linetext: /"jsx": "preserve"/
                }
            ],
            packages: [
                {
                    file: /.*\/package.json/,
                    score: 1,
                    linetext: /"(\@vue\/babel-preset-jsx|\@vitejs\/plugin-vue-jsx)":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")/
                }
            ],
        },
        {
            metadata: {
                name: 'pinia',
                label: 'Pinia',
                description: 'State management for Vue.js',
                website: 'https://pinia.vuejs.org/',
            },
            sources: [
                {
                    file: /.*\/main\.(js|ts)$/,
                    score: 0.75,
                    linetext: /app\.use\(createPinia\(\)\)/
                },
                {
                    file: /.(ts|js)$/,
                    score: 0.50,
                    linetext: /import .* from (\"|\')pinia(\"|\')(;|$)/
                },
            ],
            packages: [
                {
                    file: /.*\/package.json/,
                    score: 0.95,
                    linetext: /"pinia":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")/
                }
            ],
        },
        {
            metadata: {
                name: 'vue-router',
                label: 'Vue Router',
                description: 'The official Router for Vue.js',
                website: 'https://router.vuejs.org/',
            },
            sources: [
                {
                    file: /.(ts|js)$/,
                    score: 0.75,
                    linetext: /import .* from (\"|\')vue-router(\"|\')(;|$)/
                },
            ],
            packages: [
                {
                    file: /.*\/package.json/,
                    score: 0.75,
                    linetext: /"vue-router":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")/
                }
            ],
        },
    ]
}

export default VueJs;
