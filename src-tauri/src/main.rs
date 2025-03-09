// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::api::path;
use tauri_plugin_log::LogTarget;

#[cfg(target_os = "linux")]
pub struct DbusState(Mutex<Option<dbus::blocking::SyncConnection>>);

mod utils;
use utils::{close_app, get_tauri_conf, show_in_folder};

mod download_assets;
use download_assets::run_download_asset;

fn main() {
    let conf = get_tauri_conf().unwrap();

    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([
                    LogTarget::Folder(path::app_local_data_dir(&conf).unwrap().join("logs")),
                    LogTarget::Stdout,
                    LogTarget::Webview,
                ])
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            show_in_folder,
            close_app,
            run_download_asset
        ])
        .setup(|_app| {
            #[cfg(target_os = "linux")]
            app.manage(DbusState(Mutex::new(
                dbus::blocking::SyncConnection::new_session().ok(),
            )));

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
