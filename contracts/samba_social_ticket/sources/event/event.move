module samba_social_ticket::event;

use std::string::String;
use sui::tx_context::{Self, TxContext};
use sui::transfer;
use sui::kiosk::{Self, Kiosk, KioskOwnerCap};
use sui::sui::SUI;
use sui::coin::Coin;

use samba_social_ticket::event_config::{Self, EventConfig};
use samba_social_ticket::event_nft;

//missing tax

#[allow(lint(self_transfer))]
public fun create_event(
    name: String,
    description: String,
    thumbnail: String,
    links: vector<String>,
    event_date: u64,
    location: Location,
    total_capacity: u64,
    config: &mut EventConfig,
    payment: Coin<SUI>,
    ctx: &mut TxContext,
) {

    event_config::collect_tax(config, payment);

    let sender = tx_context::sender(ctx);
    let (mut kiosk, kiosk_cap): (Kiosk, KioskOwnerCap) = kiosk::new(ctx);

    let event_nft = event_nft::mint(
        name,
        description,
        thumbnail,
        links,
        event_date,
        location,
        total_capacity,
        tickets_available,
        sender,
        ctx,
    );

    kiosk::place(&mut kiosk, &kiosk_cap, event_nft);
    
    transfer::public_transfer(kiosk_cap, sender);
    transfer::public_share_object(kiosk);
}