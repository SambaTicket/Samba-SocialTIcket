module samba_social_ticket::walrus_storage;

use std::string::{Self, String};
use sui::url::{Self, Url};

/// Estrutura para representar um recurso armazenado no Walrus
public struct WalrusBlob has store, copy, drop {
    blob_id: String,
    url: Url,
    content_type: String,
    size: u64,
}

/// Cria uma nova referência para um blob no Walrus
public fun new_walrus_blob(
    blob_id: String,
    content_type: String,
    size: u64,
): WalrusBlob {
    let walrus_url = build_walrus_url(blob_id);
    WalrusBlob {
        blob_id,
        url: walrus_url,
        content_type,
        size,
    }
}

/// Constrói a URL do Walrus para um blob_id
public fun build_walrus_url(blob_id: String): Url {
    let base_url = string::utf8(b"https://walrus.space/v1/");
    let mut full_url = string::utf8(b"");
    string::append(&mut full_url, base_url);
    string::append(&mut full_url, blob_id);
    url::new_unsafe(string::to_ascii(full_url))
}

/// Getters para WalrusBlob
public fun get_blob_id(blob: &WalrusBlob): String {
    blob.blob_id
}

public fun get_url(blob: &WalrusBlob): Url {
    blob.url
}

public fun get_content_type(blob: &WalrusBlob): String {
    blob.content_type
}

public fun get_size(blob: &WalrusBlob): u64 {
    blob.size
}

/// Converte WalrusBlob para string URL para use em displays
public fun blob_to_display_url(blob: &WalrusBlob): String {
    // Converter URL para string manualmente já que url::to_string não existe
    let base_url = string::utf8(b"https://walrus.space/v1/");
    let mut full_url = string::utf8(b"");
    string::append(&mut full_url, base_url);
    string::append(&mut full_url, blob.blob_id);
    full_url
}

/// Cria um WalrusBlob para imagens (helper function)
public fun new_image_blob(blob_id: String, image_type: String, size: u64): WalrusBlob {
    let mut content_type = string::utf8(b"image/");
    string::append(&mut content_type, image_type);
    new_walrus_blob(blob_id, content_type, size)
}

/// Cria um WalrusBlob para metadados JSON
public fun new_metadata_blob(blob_id: String, size: u64): WalrusBlob {
    new_walrus_blob(blob_id, string::utf8(b"application/json"), size)
}

/// Valida se um blob_id tem o formato correto (básico)
public fun is_valid_blob_id(blob_id: &String): bool {
    // Blob IDs do Walrus geralmente têm 64 caracteres hex
    string::length(blob_id) >= 32 && string::length(blob_id) <= 128
}