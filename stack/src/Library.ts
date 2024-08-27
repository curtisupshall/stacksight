export interface Metadata {
    name: string;
    label: string;
    description: string;
    website: string;
}

interface ArtifactConfig {
    file: RegExp;
    score: number;
}

interface SourceConfig extends ArtifactConfig {
    // A line of text which qualifies the library
    linetext: RegExp;
}

type PackageConfig = SourceConfig;

type VersionConfig = {
    file: RegExp;
}

export type Tag = string;

/**
 * A tuple used for matching file pattern regexes
 */
export type Matcher = [
    // Regex pattern to match a particualr file
    RegExp,
    // Regex pattern to match a particular line within a file
    RegExp | undefined,
    // Tag associated with the match
    Tag,
    // Probability score
    number
]

export type LibraryOutput = {
    tag: Tag
    parentTag: string | null
    subtags: Tag[]
    metadata: Metadata
    matchers: Matcher[]
}

export default interface Library {
    metadata: Metadata;

    artifacts?: ArtifactConfig[];

    sources?: SourceConfig[];

    packages?: PackageConfig[];

    version?: VersionConfig;

    children?: Library[];

    subtags?: Tag[];
}

export const compile = (library: Library, parentTag: string| null = null): LibraryOutput[] => {
    const metadata = library.metadata;
    const artifacts = library.artifacts ?? [];
    const sources = library.sources ?? [];
    const packages = library.packages ?? [];
    const children = library.children ?? [];

    const tag = [parentTag, metadata.name].filter(Boolean).join('.');
    const subtags = library.subtags?.map((subtag) => [parentTag, subtag].filter(Boolean).join('.')) ?? [];

    const sourceMatchers: Matcher[] = sources.map((source) => [
        source.file,
        source.linetext,
        tag,
        source.score
    ]);

    const packageMatchers: Matcher[] = packages.map((pkg) => [
        pkg.file,
        pkg.linetext,
        tag,
        pkg.score
    ]);

    const artifactMathcers: Matcher[] = artifacts.map((artifact) => [
        artifact.file,
        undefined,
        tag,
        artifact.score
    ]);

    const matchers: Matcher[] = [
        ...artifactMathcers,
        ...sourceMatchers,
        ...packageMatchers,
    ]

    const childOutputs = children.reduce((outputs: LibraryOutput[], child: Library) => {
        compile(child, tag).forEach((output) => outputs.push(output));

        return outputs
    }, []);

    return [
        {
            tag,
            subtags,
            metadata,
            parentTag,
            matchers,
        },
        ...childOutputs
    ];
}
