use reqwest::{header, Client};
use std::fs::File;
use std::io::copy;
use tauri::api::path;

use crate::utils::get_tauri_conf;

#[derive(Debug, Clone)]
struct Asset {
    name: String,
    download_url: String,
}

#[derive(Debug)]
enum OS {
    Windows32,
    Windows64,
    Linux32,
    Linux64,
    MacOSX64,
    MacOSArm,
}

impl OS {
    fn from_current_os() -> Option<Self> {
        #[cfg(target_os = "windows")]
        {
            if cfg!(target_arch = "x86") {
                return Some(OS::Windows32);
            } else if cfg!(target_arch = "x86_64") {
                return Some(OS::Windows64);
            } else {
                panic!("Unsupported Windows architecture.");
            }
        }

        #[cfg(target_os = "linux")]
        {
            if cfg!(target_arch = "x86") {
                return Some(OS::Linux32);
            } else if cfg!(target_arch = "x86_64") {
                return Some(OS::Linux64);
            } else {
                panic!("Unsupported Linux architecture.");
            }
        }

        #[cfg(target_os = "macos")]
        {
            if cfg!(target_arch = "x86_64") {
                return Some(OS::MacOSX64);
            } else if cfg!(target_arch = "aarch64") {
                return Some(OS::MacOSArm);
            } else {
                panic!("Unsupported macOS architecture.");
            }
        }
    }
}

async fn get_latest_release_assets() -> Result<Vec<Asset>, reqwest::Error> {
    let url: &str = "https://api.github.com/repos/cloudflare/cloudflared/releases/latest";

    let mut headers = header::HeaderMap::new();
    headers.insert(
        header::USER_AGENT,
        header::HeaderValue::from_static(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
        ),
    );

    let client = reqwest::Client::builder()
        .default_headers(headers)
        .build()?;

    let response = match client.get(url).send().await {
        Ok(resp) => resp,
        Err(err) => {
            eprint!("Failed to fetch the latest release: {}", err);
            return Err(err);
        }
    };

    let body = response
        .text()
        .await
        .expect("Failed to read response body.");
    println!("body: {:?}", body);
    let release: serde_json::Value = serde_json::from_str(&body).expect("Failed to parse JSON.");

    let assets = release["assets"]
        .as_array()
        .unwrap_or_else(|| panic!("No assets found in the latest release."));

    let mut result = Vec::new();
    for asset in assets {
        let name = asset["name"].as_str().unwrap().to_string();
        let download_url = asset["browser_download_url"].as_str().unwrap().to_string();
        result.push(Asset { name, download_url });
    }
    Ok(result)
}

fn select_asset_for_os(assets: Vec<Asset>, os: OS) -> Option<Asset> {
    match os {
        OS::Windows32 => assets
            .iter()
            .find(|asset| asset.name.contains("windows-386")),
        OS::Windows64 => assets
            .iter()
            .find(|asset| asset.name.contains("windows-amd64")),
        OS::Linux32 => assets.iter().find(|asset| asset.name.contains("linux-386")),
        OS::Linux64 => assets
            .iter()
            .find(|asset| asset.name.contains("linux-amd64")),
        OS::MacOSX64 | OS::MacOSArm => assets
            .iter()
            .find(|asset| asset.name.contains("darwin-amd64")),
    }
    .cloned()
}

async fn download_asset(asset: Asset) -> Result<(), std::io::Error> {
    let conf = get_tauri_conf().unwrap();

    let response = match reqwest::get(&asset.download_url).await {
        Ok(resp) => resp,
        Err(err) => {
            return Err(std::io::Error::new(
                std::io::ErrorKind::Other,
                format!("Failed to fetch asset: {}", err),
            ));
        }
    };

    let download_dir = match path::app_local_data_dir(&conf) {
        Some(mut path) => {
            path.push("data");
            path
        }
        None => {
            return Err(std::io::Error::new(
                std::io::ErrorKind::Other,
                "Failed to determine the download directory.",
            ));
        }
    };
    std::fs::create_dir_all(&download_dir)?;

    let mut file_path = download_dir.clone();

    // ? If the asset name has an extension then we can
    // ? extract it and use it to create a new filename
    // ? with a different prefix.
    if let Some(dot_pos) = asset.name.rfind('.') {
        // Extract the extension
        let extension = &asset.name[dot_pos..];

        // Create a new filename with a different prefix
        file_path.push(format!("cloudflared{}", extension));
    } else {
        file_path.push("cloudflared");
    }

    let mut dest = File::create(&file_path)?;
    copy(&mut response.bytes().await.unwrap().as_ref(), &mut dest)?;
    Ok(())
}

#[tauri::command]
pub async fn run_download_asset() -> String {
    println!("Downloading asset...");
    let os = OS::from_current_os().expect("Failed to detect the current OS.");

    println!("Current OS: {:?}", os);

    let assets = get_latest_release_assets()
        .await
        .expect("Failed to fetch the latest release.");
    let selected_asset =
        select_asset_for_os(assets, os).expect("No suitable asset found for the current OS.");

    println!("Selected asset: {:?}", selected_asset);

    match download_asset(selected_asset).await {
        Ok(_) => return "Asset downloaded successfully.".to_string(),
        Err(e) => return std::string::String::from(e.to_string()),
    }
}
