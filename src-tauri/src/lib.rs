use tauri::Manager;

mod crypto;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_keychain::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            crypto::generate_key_pair,
            crypto::generate_aes_key,
            crypto::encrypt_data,
            crypto::encrypt_key_for_recipient,
            crypto::decrypt_data,
            crypto::decrypt_diary,
            crypto::decrypt_reply,
        ])
        .setup(|app| {
            #[cfg(any(target_os = "android", target_os = "ios"))]
            let _ = app.handle().plugin(tauri_plugin_biometric::init());

            let salt_path = app
                .path()
                .app_local_data_dir()
                .expect("Failed to get app local data dir")
                .join("sotto_salt.txt");

            app.handle().plugin(tauri_plugin_stronghold::Builder::with_argon2(&salt_path).build())?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
