use rsa::{pkcs1v15::DecryptingKey, pkcs8::{DecodePrivateKey, DecodePublicKey}, rand_core::RngCore, traits::Decryptor, RsaPrivateKey, RsaPublicKey};
use aes_gcm::{aead::{Aead, KeyInit, OsRng}, Aes256Gcm, Key, Nonce};
use serde::{Serialize, Deserialize};
use base64::prelude::*;

#[derive(Serialize, Deserialize)]
pub struct DiaryData {
    pub title: String,
    pub content: String,
}

#[tauri::command]
pub fn encrypt_diary(public_key_pem: String, diary: DiaryData) -> Result<(String, String, String), String> {
    let json = serde_json::to_string(&diary).map_err(|e| e.to_string())?;
    let public_key = RsaPublicKey::from_public_key_pem(&public_key_pem)
        .map_err(|e| format!("Invalid public key: {:?}", e))?;

    let mut aes_key: [u8; 32] = [0u8; 32];
    let mut rng = OsRng;
    rng.fill_bytes(&mut aes_key);
    let nonce_bytes: [u8; 12] = rand::random();
    let nonce = Nonce::from_slice(&nonce_bytes);

    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(&aes_key));
    let encrypted_data = cipher
        .encrypt(nonce, json.as_bytes())
        .map_err(|e| format!("AES encryption failed: {:?}", e))?;

    let encrypted_key = public_key
        .encrypt(&mut rng, rsa::pkcs1v15::Pkcs1v15Encrypt, &aes_key)
        .map_err(|e| format!("RSA encryption failed: {:?}", e))?;

    Ok((
        BASE64_STANDARD.encode(&encrypted_data),
        BASE64_STANDARD.encode(&encrypted_key),
        BASE64_STANDARD.encode(&nonce_bytes),
    ))
}

#[tauri::command]
pub fn decrypt_diary(
    private_key_pem: String,
    encrypted_data_b64: String,
    encrypted_key_b64: String,
    nonce_b64: String,
) -> Result<DiaryData, String> {
    let private_key = RsaPrivateKey::from_pkcs8_pem(&private_key_pem)
        .map_err(|e| format!("Invalid private key: {:?}", e))?;

    let encrypted_data = BASE64_STANDARD.decode(encrypted_data_b64)
        .map_err(|e| format!("encrypted_data decode error: {:?}", e))?;
    let encrypted_key = BASE64_STANDARD.decode(encrypted_key_b64)
        .map_err(|e| format!("encrypted_key decode error: {:?}", e))?;
    let nonce_bytes = BASE64_STANDARD.decode(nonce_b64)
        .map_err(|e| format!("nonce decode error: {:?}", e))?;
    let nonce = Nonce::from_slice(&nonce_bytes);

    let decryptor = DecryptingKey::new(private_key);
    let aes_key = decryptor.decrypt(&encrypted_key)
        .map_err(|e| format!("RSA decryption failed: {:?}", e))?;

    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(&aes_key));
    let decrypted_data = cipher.decrypt(nonce, encrypted_data.as_ref())
        .map_err(|e| format!("AES decryption failed: {:?}", e))?;

    let json_str = String::from_utf8(decrypted_data)
        .map_err(|e| format!("UTF-8 decode error: {:?}", e))?;
    let diary: DiaryData = serde_json::from_str(&json_str)
        .map_err(|e| format!("JSON parse error: {:?}", e))?;

    Ok(diary)
}
