export interface WindowOptions {
    width?: number;
    height?: number;
    noJS?: boolean;
    hideScrollbar?: boolean;
    x?: number;
    y?: number;
}

export interface CLIArgs {
    url: string;
    width: number;
    height: number;
    optimized: boolean;
    noJS: boolean;
    hideScrollbar: boolean;
}
