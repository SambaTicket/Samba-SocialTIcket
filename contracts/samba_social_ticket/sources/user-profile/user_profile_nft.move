module samba_social_ticket::user_profile_nft;

use std::string::String;
use sui::display;
use sui::package;


public struct USER_PROFILE_NFT has drop {}

public struct UserProfileNFT has key, store {
	id: UID,
	name: String,
	pfp: String,
	bio: String,
	links: vector<String>
}

fun init(otw: USER_PROFILE_NFT, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);
    let keys = vector[
        b"name".to_string(),
        b"description".to_string(),
        b"link".to_string(),
        b"image_url".to_string(),
        b"thumbnail_url".to_string(),
        b"project_url".to_string(),
        b"creator".to_string(),
    ];

    let values = vector[
        b"Profile: {name}".to_string(),
        b"{bio}".to_string(),
        b"https://sambasocialticket.com/b/{id}".to_string(),
        b"{pfp}".to_string(),
        b"{pfp}".to_string(),
        b"https://sambasocialticket.com/".to_string(),
        b"Samba Social Ticket Network".to_string(),
    ];

    let mut display = display::new_with_fields<UserProfileNFT>(
        &publisher,
        keys,
        values,
        ctx,
    );
    display.update_version();

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}

public(package) fun mint(
    name: String,
    pfp: String,
    bio: String,
    links: vector<String>,
    ctx: &mut TxContext,
): UserProfileNFT {
    UserProfileNFT {
        id: object::new(ctx),
        name,
        pfp,
        bio,
        links
    }
}


public fun id(self: &UserProfileNFT): &UID {
    &self.id
}


public fun update_name(self: &mut UserProfileNFT, name: String) {
    self.name = name;
}

public fun update_pfp(self: &mut UserProfileNFT, pfp: String) {
    self.pfp = pfp;
}

public fun update_bio(self: &mut UserProfileNFT, bio: String) {
    self.bio = bio;
}

public fun add_link(self: &mut UserProfileNFT, link: String) {
    self.links.push_back(link);
}

public fun remove_link(self: &mut UserProfileNFT, index: u64) {
    self.links.remove(index);
}