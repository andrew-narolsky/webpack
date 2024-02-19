export interface buildPath {
    entry: string,
    html: string,
    output: string,
    public: string,
    src: string
}

export type buildMode = 'development' | 'production';

export interface buildOptions {
    port: number,
    paths: buildPath,
    mode: buildMode
}