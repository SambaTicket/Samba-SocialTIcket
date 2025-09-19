module samba_social_ticket::ticket_nft;

use samba_social_ticket::event;

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
    image_url: Url,
}

public fun id(self: &TicketNFT): &UID {
    &self.id
}

fun init(otw: TICKET_NFT, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);
    let keys = vector[
        b"name".to_string(),
        b"description".to_string(),
        b"links".to_string(),
        b"event_id".to_string(),
        b"owner".to_string(),
        b"tickets_available".to_string(),
        b"image_url".to_string(),
    ];

    let values = vector[
        b"{name}".to_string(),
        b"{description}".to_string(),
        b"https://sambasocialticket.com/ticket/{id}".to_string(),
        b"{links}".to_string(),
        b"{event_id}".to_string(),
        b"{owner}".to_string(),
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
    self.owner;
}


public(package) fun mint(
        event: &mut EventNFT,
        owner: address,
        price_paid: u64,
        ctx: &mut TxContext,
    ): TicketNFT {
        assert!(event_nft::has_available_ticket(event), ETicketsSoldOut);

        event_nft::decrease_tickets_available(event, 1);

        TicketNFT {
            id: object::new(ctx),
            event_id: id(event),
            owner,
            price_paid,
            image_url: url::new_unsafe_from_bytes(string::bytes(&event.thumbnail)),
        }
    }