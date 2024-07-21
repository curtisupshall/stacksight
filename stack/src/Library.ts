export interface LibraryMetadata {
    kind: 'library';
    name: string;
    label: string;
    description: string;
    website: string;
}

export interface VariantMetadata {
    kind: 'variant';
    name: string;
    label: string;
    website: string;
}

interface Artifact {
    file: RegExp;
    score: number;
}

interface Source extends Artifact {
    // A line of text which qualifies the library
    linetext: RegExp;
}

type Variant = {
    metadata: VariantMetadata;
    artifacts?: Artifact[];
    sources?: Source[];
}

// type Package = {
//     // e.g. package.json
//     file: RegExp;
//     // e.g. "next": "14.0.1"
//     dependency: RegExp;
// }

type Version = {
    // e.g. pacage.json
    file: RegExp;
}

export type Tag = string;

export type Matcher = [
    // Regex for file
    RegExp,
    // Regex for file contents
    RegExp | undefined,
    // Tag
    Tag,
    // Score
    number
]

interface CompiledLibrary {
    tagData: Record<Tag, LibraryMetadata | VariantMetadata>, 
    matchers: Matcher[]
}

export default abstract class Library {
    _artifacts: Artifact[];

    constructor() {
        this._artifacts = [];
    }

    abstract metadata(): LibraryMetadata;

    artifacts(): Artifact[] {
        return [];
    }

    sources(): Source[] {
        return [];
    }

    // packages(): Package[] {
    //     return [];
    // }

    version(): Version | undefined {
        return undefined;
    }

    /**
     * Provides information about which variant of the library is being used.
     */
    variants(): Variant[] {
        return [];
    }

    compile(): CompiledLibrary {
        const metadata = this.metadata();
        const artifacts = this.artifacts();
        const sources = this.sources();
        // const packages = this.packages();
        const variants = this.variants();

        const tagData: Record<Tag, LibraryMetadata | VariantMetadata> = {
            [metadata.name]: metadata
        };
        
        variants.forEach((variant) => {
            const variantTag = [metadata.name, variant.metadata.name].join('.');
            tagData[variantTag] = variant.metadata;
        });

        const sourceMatchers: Matcher[] = sources.map((source) => [
            source.file,
            source.linetext,
            metadata.name,
            source.score
        ]);

        const artifactMathcers: Matcher[] = artifacts.map((artifact) => [
            artifact.file,
            undefined,
            metadata.name,
            artifact.score
        ]);

        const variantMatchers: Matcher[] = variants.reduce((matchers: Matcher[], variant: Variant) => {
            const tag = [metadata.name, variant.metadata.name].join('.');

            const variantArtifactMatchers: Matcher[] = (variant.artifacts ?? []).map((artifact) => [
                artifact.file,
                undefined,
                tag,
                artifact.score
            ]);

            const variantSourceMatchers: Matcher[] = (variant.sources ?? []).map((source) => [
                source.file,
                source.linetext,
                tag,
                source.score
            ]);

            return [
                ...matchers,
                ...variantArtifactMatchers,
                ...variantSourceMatchers
            ];
        }, [])

        const matchers: Matcher[] = [
            ...artifactMathcers,
            ...sourceMatchers,
            // ...packages.map((package) => {
            //     package.file
            // }),
            ...variantMatchers
        ]

        return {
            tagData,
            matchers,
        }
    }
}
