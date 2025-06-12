use rsa::{pkcs1::{DecodeRsaPrivateKey, DecodeRsaPublicKey, EncodeRsaPrivateKey, EncodeRsaPublicKey}, pkcs1v15::DecryptingKey, rand_core::RngCore, traits::Decryptor, RsaPrivateKey, RsaPublicKey};
use aes_gcm::{aead::{Aead, KeyInit, OsRng}, Aes256Gcm, Key, Nonce};
use serde::{Serialize, Deserialize};
use base64::prelude::*;

#[derive(Serialize, Deserialize)]
pub struct DiaryData {
    pub emoji: String,
    pub title: String,
    pub content: String,
    pub location: Option<String>,
    pub weather: Option<String>,
    pub attachments: Vec<String>,
}

#[derive(Serialize, Deserialize)]
pub struct ReplyData {
    pub emoji: String,
    pub content: String,
}

#[tauri::command]
pub fn generate_key_pair() -> Result<(String, String), String> {
    let mut rng = OsRng;
    let bits = 2048;
    let private_key = RsaPrivateKey::new(&mut rng, bits)
        .map_err(|e| format!("Key generation failed: {:?}", e))?;
    let public_key = RsaPublicKey::from(&private_key);

    let private_key_pem = private_key.to_pkcs1_pem(Default::default())
        .map_err(|e| format!("Private key PEM encoding failed: {:?}", e))?
        .to_string();

    let public_key_pem = public_key.to_pkcs1_pem(Default::default())
        .map_err(|e| format!("Public key PEM encoding failed: {:?}", e))?
        .to_string();

    Ok((private_key_pem, public_key_pem))
}

#[tauri::command]
pub fn encrypt_data(data: String, prev_aes_key: Option<String>) -> Result<(String, String, String), String> {
    let aes_key: [u8; 32] = if let Some(b64) = prev_aes_key {
        BASE64_STANDARD
            .decode(b64)
            .map_err(|e| format!("Failed to decode provided AES key: {:?}", e))?
            .try_into()
            .map_err(|_| "Invalid AES key length".to_string())?
    } else {
        let mut key = [0u8; 32];
        let mut rng = OsRng;
        rng.fill_bytes(&mut key);
        key
    };

    let nonce_bytes: [u8; 12] = rand::random();
    let nonce = Nonce::from_slice(&nonce_bytes);

    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(&aes_key));
    let encrypted_data = cipher
        .encrypt(nonce, data.as_bytes())
        .map_err(|e| format!("AES encryption failed: {:?}", e))?;

    Ok((
        BASE64_STANDARD.encode(&encrypted_data),
        BASE64_STANDARD.encode(&aes_key),
        BASE64_STANDARD.encode(&nonce_bytes),
    ))
}

#[tauri::command]
pub fn encrypt_key_for_recipient(
    public_key_pem: String,
    aes_key: String,
) -> Result<String, String> {
    let public_key = RsaPublicKey::from_pkcs1_pem(&public_key_pem)
        .map_err(|e| format!("Invalid public key: {:?}", e))?;

    let aes_key = BASE64_STANDARD
        .decode(&aes_key)
        .map_err(|e| format!("Failed to decode AES key: {:?}", e))?;

    let mut rng = OsRng;
    let encrypted_key = public_key
        .encrypt(&mut rng, rsa::pkcs1v15::Pkcs1v15Encrypt, &aes_key)
        .map_err(|e| format!("RSA encryption failed: {:?}", e))?;

    Ok(BASE64_STANDARD.encode(&encrypted_key))
}

#[tauri::command]
pub fn decrypt_data(
    private_key_pem: String,
    encrypted_data_b64: String,
    encrypted_key_b64: String,
    nonce_b64: String,
) -> Result<String, String> {
    let private_key = RsaPrivateKey::from_pkcs1_pem(&private_key_pem)
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

    let string_data = String::from_utf8(decrypted_data)
        .map_err(|e| format!("UTF-8 decode error: {:?}", e))?;

    Ok(string_data)
}

#[tauri::command]
pub fn decrypt_diary(
    private_key_pem: String,
    encrypted_data_b64: String,
    encrypted_key_b64: String,
    nonce_b64: String,
) -> Result<DiaryData, String> {
    let decrypted_json = decrypt_data(private_key_pem, encrypted_data_b64, encrypted_key_b64, nonce_b64)?;
    serde_json::from_str(&decrypted_json)
        .map_err(|e| format!("Failed to deserialize DiaryData: {:?}", e))
}

#[tauri::command]
pub fn decrypt_reply(
    private_key_pem: String,
    encrypted_data_b64: String,
    encrypted_key_b64: String,
    nonce_b64: String,
) -> Result<ReplyData, String> {
    let decrypted_json = decrypt_data(private_key_pem, encrypted_data_b64, encrypted_key_b64, nonce_b64)?;
    serde_json::from_str(&decrypted_json)
        .map_err(|e| format!("Failed to deserialize ReplyData: {:?}", e))
}
