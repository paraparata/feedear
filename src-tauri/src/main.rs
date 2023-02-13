#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod feedear;
mod helper;

use std::path::PathBuf;

use feedear::Feedear;
use helper::read_file;

#[tauri::command]
fn generate_snapshot(feeds: &str, path: &str) {
    let constructor = Feedear::new(&feeds);
    constructor.create_json(&path);
}

#[tauri::command]
fn get_feeds(path: &str) -> Result<String, String> {
    let file_path = PathBuf::from(&path);
    let contents = read_file(&file_path).map_err(|err| err.to_string())?;

    Ok(contents.into())
}

#[tauri::command]
fn get_feed(path: &str, parent_id: &str) -> Result<String, String> {
    let file_path = PathBuf::from(&path);
    let contents = read_file(&file_path).map_err(|err| err.to_string())?;

    let constructor = Feedear::new(&contents);
    let data = constructor.filter_feed(&parent_id);

    Ok(data.into())
}

#[tauri::command]
fn get_topic(path: &str) -> Result<String, String> {
    let file_path = PathBuf::from(&path);
    let contents = read_file(&file_path).map_err(|err| err.to_string())?;

    let constructor = Feedear::new(&contents);
    let data = constructor.filter_topic();

    Ok(data.into())
}

#[allow(unused_imports)]
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            generate_snapshot,
            get_feeds,
            get_feed,
            get_topic
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
