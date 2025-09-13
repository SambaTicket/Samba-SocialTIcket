module samba_social_ticket::user_profile;

use samba_social_ticket::user_profile_nft;
use std::string::String;
use sui::kiosk::{Self, Kiosk, KioskOwnerCap};

#[allow(lint(self_transfer))]
public fun mint_profile(
    name: String,
    pfp: String,
    bio: String,
    links: vector<String>,
    ctx: &mut TxContext,
) {
    let sender = tx_context::sender(ctx);
    let (mut kiosk, kiosk_cap): (Kiosk, KioskOwnerCap) = kiosk::new(ctx);

    let profile_nft = user_profile_nft::mint(
        name,
        pfp,
        bio,
        links,
        ctx,
    );

    kiosk::place(&mut kiosk, &kiosk_cap, profile_nft);
    
    transfer::public_transfer(kiosk_cap, sender);
    transfer::public_share_object(kiosk);
}



public fun mint_ticket() {
	//to do
}