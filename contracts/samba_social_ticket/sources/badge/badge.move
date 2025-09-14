module samba_social_ticket::badge;

use sui::kiosk::{Self, Kiosk, KioskOwnerCap};
use sui::clock::{Self, Clock};
use std::string::String;

const ESupplyDepleted: u64 = 0;

// BADGES DEVEM SER SOULBOUND

// Witness
public struct BADGE has drop {}

// O "Molde" do Badge
public struct Badge has key, store {
    id: UID,
    name: String,
    image: String,
    description: String,
    total_supply: u64,
    minted_supply: u64,
    event_id: ID,
    creator: address,
    }

// A instância do Badge para o usuário
public struct BadgeNFT has key, store {
    id: UID,
    template_id: ID,
    name: String,
    image_url: String,
    recipient: address,
    awarded_at: u64,
    }


// Função de inicialização
fun init(_otw: BADGE, _ctx: &mut TxContext) {}

/// Cria o "molde" de um novo tipo de badge.
#[allow(lint(public_entry))]

public entry fun create_badge_template(
    name: String,
    image: String,
    description: String,
    total_supply: u64,
    event_id: ID,
    ctx: &mut TxContext,
) {

let template = Badge {
    id: object::new(ctx),
    name,
    image,
    description,
    total_supply,
    minted_supply: 0,
    event_id,
    creator: tx_context::sender(ctx),
};

transfer::public_share_object(template);
}


/// Premia um usuário com um badge SOULBOUND, colocando-o em seu KIOSK.

#[allow(lint(public_entry))]
public entry fun award_badge_to_user(
    template: &mut Badge,
    user_kiosk: &mut Kiosk,
    kiosk_cap: &KioskOwnerCap,
    recipient: address,
    clock: &Clock,
    ctx: &mut TxContext,
) {

assert!(template.minted_supply < template.total_supply, ESupplyDepleted);

template.minted_supply = template.minted_supply + 1;


let badge_nft = BadgeNFT {
    id: object::new(ctx),
    template_id: object::id(template),
    name: template.name,
    image_url: template.image,
    recipient,
    awarded_at: clock::timestamp_ms(clock),
    };


// --- OS PASSOS CRÍTICOS ---

// 1. Coloca o badge dentro do Kiosk do usuário PRIMEIRO

kiosk::place(user_kiosk, kiosk_cap, badge_nft);

// 2. Badge já fica protegido dentro do Kiosk (Soulbound através do sistema Kiosk)

}


// === FUNÇÕES DE CONSULTA ===


/// Retorna informações do template do badge

public fun get_badge_info(badge: &Badge): (String, String, u64, u64) {

(badge.name, badge.description, badge.minted_supply, badge.total_supply)

}

/// Retorna informações do badge NFT

public fun get_badge_nft_info(badge_nft: &BadgeNFT): (String, address, u64) {

(badge_nft.name, badge_nft.recipient, badge_nft.awarded_at)

}

/// Verifica se ainda há badges disponíveis no template

public fun badges_available(badge: &Badge): u64 {

badge.total_supply - badge.minted_supply

}

/// Verifica se o badge template foi criado por um endereço específico

public fun is_creator(badge: &Badge, creator: address): bool {

badge.creator == creator

} 