import Library from "../Library";
import Angular from "./frontend/angular";
import ReactJs from "./frontend/react";
import NextJs from "./frontend/nextjs";
import VueJs from "./frontend/vue";

const allLibraries: Record<string, Library[]> = {
    'frontend': [
        Angular,
        NextJs,
        ReactJs,
        VueJs,
    ]
}

export default allLibraries