import Library from "../Library";
import nextjs from "./frontend/nextjs";

const allLibraries: Record<string, Library[]> = {
    'frontend': [
        new nextjs()
    ]
}

export default allLibraries