import Library from "../Library";
import Angular from "./frontend/angular";
import ReactJs from "./frontend/react";
import NextJs from "./frontend/nextjs";

const allLibraries: Record<string, Library[]> = {
    'frontend': [
        Angular,
        NextJs,
        ReactJs,
    ]
}

export default allLibraries