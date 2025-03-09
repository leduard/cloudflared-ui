import { tauri } from "@tauri-apps/api";

export async function showInFolder(path: string) {
    await tauri.invoke("show_in_folder", { path });
}

export async function closeApp() {
    await tauri.invoke("close_app");
}

export async function downloadAsset() {
    return await tauri.invoke("run_download_asset");
}
