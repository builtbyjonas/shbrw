import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export function parseCLIArgs(): {
    url: string;
    width: number;
    height: number;
    optimized: boolean;
    noJS: boolean;
    hideScrollbar: boolean;
} {
    const argv = yargs(hideBin(process.argv))
        .option("url", {
            describe: "The URL to open",
            type: "string",
            demandOption: true,
        })
        .option("size", {
            describe: "The window size in format WIDTHxHEIGHT",
            type: "string",
            default: "1280x720",
        })
        .option("optimized", {
            describe: "Enable optimized mode",
            type: "boolean",
            default: false,
        })
        .option("noJS", {
            describe: "Disable JavaScript",
            type: "boolean",
            default: false,
        })
        .option("hideScrollbar", {
            describe: "Hide the overflow and overflow-x scrollbars of the website",
            type: "boolean",
            default: false,
        })
        .strict(false)
        .parseSync();

    const [width, height] = argv.size.split("x").map(Number);

    return {
        url: argv.url,
        width,
        height,
        optimized: argv.optimized,
        noJS: argv.noJS,
        hideScrollbar: argv.hideScrollbar,
    };
}
