import { fs } from "@tauri-apps/api";
import { BaseDirectory } from "@tauri-apps/api/fs";
import { Logger } from "./logger";

export async function checkAppFolders(): Promise<void> {
    const dataFolderExists = await fs.exists("data/", {
        dir: BaseDirectory.AppLocalData,
    });
    const configFolderExists = await fs.exists("config/", {
        dir: BaseDirectory.AppLocalData,
    });

    if (!dataFolderExists) {
        await Logger.info("Creating data folder");
        await fs.createDir("data", {
            recursive: true,
            dir: BaseDirectory.AppLocalData,
        });
    }
    if (!configFolderExists) {
        await Logger.info("Creating config folder");
        await fs.createDir("config", {
            recursive: true,
            dir: BaseDirectory.AppLocalData,
        });
    }
}
