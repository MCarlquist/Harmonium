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

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "lowercase")]
pub enum ArtistEndpoint {
    Tracks,
    Albums,
    MusicInfo,
}

impl ArtistEndpoint {
    /// Returns the artist subresource path: `albums`, `musicinfo`, or `tracks`.
    pub fn path(&self) -> &str {
        match self {
            ArtistEndpoint::Albums => "albums",
            ArtistEndpoint::MusicInfo => "musicinfo",
            ArtistEndpoint::Tracks => "tracks",
        }
    }
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

/// Fetches the Jamendo results for an artist ID and artist subresource.
///
/// `endpoint` is the subpath under `artists`, such as `musicinfo`, `tracks`, or
/// `albums`. Returns the response's results array, which may be empty.
///
/// # Errors
/// Returns a string error if the request fails, the HTTP status is not successful,
/// or the response cannot be decoded as a Jamendo response.
#[tauri::command]
async fn get_artist_by_id(id: String, endpoint: String) -> Result<Vec<Value>, String> {
    let url = format!(
        "https://api.jamendo.com/v3.0/artists/{}?client_id=42a786e1&format=jsonpretty&id={}",
        endpoint, id
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

/// Fetches album results with nested tracks from Jamendo for the given album ID.
///
/// Returns the response's results array, which may be empty.
///
/// # Errors
/// Returns a string error if the request fails, the HTTP status is not successful,
/// or the response cannot be decoded as a Jamendo response.
#[tauri::command]
async fn get_album_by_id(id: String) -> Result<Vec<Value>, String> {
    let url = format!(
        "https://api.jamendo.com/v3.0/albums/tracks/?client_id=42a786e1&format=jsonpretty&id={}",
        id
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
/// Runs the Tauri application with Jamendo search and artist and album lookups.
///
/// # Panics
/// Panics if the Tauri application fails to run.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            search_jamendo,
            get_artist_by_id,
            get_album_by_id
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
