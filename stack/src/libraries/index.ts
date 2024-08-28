import Library from "../Library";
import ReactJs from "./frontend/react";
import NextJs from "./frontend/react";

const allLibraries: Record<string, Library[]> = {
    'frontend': [
        NextJs,
        ReactJs,
    ]
}

export default allLibraries