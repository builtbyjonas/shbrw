import { BrowserWindow, nativeImage, app } from "electron";
import { createContextMenu } from "./createContextMenu.js";
import { APP_NAME, WINDOW_ICON, WINDOW_TITLE } from "./constants.js";

export async function startWindow(
    url: string,
    options: { width?: number; height?: number; noJS?: boolean; hideScrollbar?: boolean },
): Promise<void> {
    let icon = nativeImage.createFromPath(WINDOW_ICON);
    if (icon.isEmpty()) {
        console.error(
            `(${APP_NAME}) Failed to load image from path '${WINDOW_ICON}'`,
        );
        icon = nativeImage.createEmpty();
    }

    const win = new BrowserWindow({
        width: options.width || 1280,
        height: options.height || 720,
        show: true,
        frame: false,
        icon: nativeImage.createFromPath(WINDOW_ICON),
        title: WINDOW_TITLE,
        webPreferences: {
            javascript: !options.noJS,
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    await win.loadURL(url);

    if (options.hideScrollbar) {
        await win.webContents.insertCSS(
            "html, body { overflow: hidden !important; overflow-x: hidden !important; }",
        );
    }

    win.setTitle(WINDOW_TITLE);
    if (icon) {
        win.setIcon(nativeImage.createFromPath(WINDOW_ICON));
    }

    win.webContents.on("context-menu", async (e, params) => {
        const menu = await createContextMenu(win);
        menu.popup();
    });

    win.on("closed", () => {
        app.quit();
    });
}
