mod crypto;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            crypto::generate_key_pair,
            crypto::encrypt_diary,
            crypto::decrypt_diary
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
