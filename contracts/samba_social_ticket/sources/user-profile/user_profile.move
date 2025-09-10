module samba_social_ticket::user_profile;

use samba_social_ticket::user_profile_nft::{Self, UserProfileNFT};
use std::string::String;
use sui::dynamic_object_field as dof;

#[allow(lint(self_transfer))]
public fun mint_profile(
    name: String,
    pfp: String,
    bio: String,
    links: vector<String>,
    ctx: &mut TxContext,
) {
    let mut profile = user_profile_nft::mint(name, pfp, bio, ctx);

    //let new_feed = feed::new_feed(ctx);
    //dof::add(user_profile_nft::id_mut(&mut social), b"feed".to_string(), new_feed);

    let sender = tx_context::sender(ctx);

    transfer::public_transfer(profile, sender);
}

public fun mint_ticket() {
	//to do
}