module samba_social_ticket::ticket_nft;

use std::string::{Self, String};
use sui::object::{Self, ID, UID};
use sui::tx_context::{Self, TxContext};
use sui::transfer;
use sui::package;
use sui::display;
use sui::url::{Self, Url};


const EInsufficientFunds: u64 = 0;
const ETicketsSoldOut: u64 = 1;

public struct TICKET_NFT has drop {}

public struct TicketNFT has key, store {
	id: UID,
    event_id: ID,
    owner: address,
    price_paid: u64,
    image_url: String,
}

public fun id(self: &TicketNFT): &UID {
    &self.id
}

fun init(otw: TICKET_NFT, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);
    let keys = vector[
        b"event_id".to_string(),
        b"owner".to_string(),
        b"price_paid".to_string(),
        b"image_url".to_string(),
    ];

    let values = vector[
        b"https://sambasocialticket.com/ticket/{id}".to_string(),
       // b"{links}".to_string(),
        b"{event_id}".to_string(),
        b"{owner}".to_string(),
        b"{price_paid}".to_string(),
        b"{image_url}".to_string(),
    ];

    let mut display = display::new_with_fields<TicketNFT>(
        &publisher,
        keys,
        values,
        ctx,
    );
    display.update_version();

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}

//public(package) fun mint(
//	thumbnail: String,
//	owner: address,
//	event_id: UID,
//	links: vector<String>,
//    ctx: &mut TxContext,
//): TicketNFT {
//
//    event::has_available_ticket(event_id);
//
//    TicketNFT {
//        id: object::new(ctx),
//		thumbnail,
//		links,
//		owner_id,
//        event_id
//    }
//}

public fun owner(self: &TicketNFT): address {
    self.owner
}


public(package) fun mint(
	event_id: ID,
	owner: address,
	price_paid: u64,
	image_url: String,
    ctx: &mut TxContext,
): TicketNFT {
    
    TicketNFT {
        id: object::new(ctx),
        event_id,
        owner,
        price_paid,
        image_url
    }
}