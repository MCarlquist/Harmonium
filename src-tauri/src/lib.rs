// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use serde::{Deserialize, Serialize};
use serde_json::Value;

// 1. Define an enum for the endpoints
#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "lowercase")]
pub enum JamendoEndpoint {
    Artists,
    Tracks,
    Playlists,
}

impl JamendoEndpoint {
    pub fn path(&self) -> &str {
        match self {
            JamendoEndpoint::Artists => "artists",
            JamendoEndpoint::Tracks => "tracks",
            JamendoEndpoint::Playlists => "playlists",
        }
    }
}
// 2. Generic response wrapper matching Jamendo's JSON structure
#[derive(Deserialize, Debug)]
pub struct JamendoApiResponse {
    pub headers: Value,
    pub results: Vec<Value>,
}

#[tauri::command]
async fn search_jamendo(endpoint: JamendoEndpoint, query: String) -> Result<Vec<Value>, String> {
    let url = format!(
        "https://api.jamendo.com/v3.0/{}?client_id=42a786e1&format=json&namesearch={}",
        endpoint.path(),
        query
    );

    let client = reqwest::Client::new();
    let response = client
        .get(&url)
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    if !response.status().is_success() {
        return Err(format!("API error status: {}", response.status()));
    }

    let data = response
        .json::<JamendoApiResponse>()
        .await
        .map_err(|e| format!("Failed to parse JSON: {}", e))?;

    Ok(data.results)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![search_jamendo])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
