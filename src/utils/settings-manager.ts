import { appLocalDataDir } from '@tauri-apps/api/path';
import { SettingsManager } from "tauri-settings";

export const settingsManager = new SettingsManager<SettingsManagerSchema>(
    {
        theme: "light",
        tunnels: [],
    },
    {
        dir: await appLocalDataDir(),
        fileName: "config/settings.json",
    }
);

export async function initializeSettingsManager(): Promise<void> {
    await settingsManager.initialize();
    await settingsManager.syncCache();
}
