module samba_social_ticket::event_nft;

use std::string::String;
use sui::display;
use sui::package;


const ETicketsSoldOut: u64 = 0;
const EInvalidAmount: u64 = 1;

public struct EVENT_NFT has drop {}

public struct EventNFT has key, store {
	id: UID,
	name: String,
	description: String,
	thumbnail: String,
	event_date: u64,
	links: vector<String>,
	total_capacity: u64,
	tickets_available: u64,
	price: u64,
	organizer: address
}


fun init(otw: EVENT_NFT, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);
    let keys = vector[
        b"name".to_string(),
        b"description".to_string(),
        b"event_date".to_string(),
        b"total_capacity".to_string(),
        b"price".to_string(),
        b"organizer".to_string(),
    ];

    let values = vector[
        b"Event: {name}".to_string(),
        b"{description}".to_string(),
        b"{event_date}".to_string(),
        b"{total_capacity}".to_string(),
        b"{price}".to_string(),
        b"{organizer}".to_string(),
    ];

    let mut display = display::new_with_fields<EventNFT>(
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
	description: String,
	thumbnail: String,
	event_date: u64,
	links: vector<String>,
	total_capacity: u64,
	price: u64,
	organizer: address,
    ctx: &mut TxContext,
): EventNFT {
    EventNFT {
        id: object::new(ctx),
        name,
        description,
		thumbnail,
		event_date,
		links,
		total_capacity,
		tickets_available: total_capacity,
		price,
		organizer
    }
}


public fun id(self: &EventNFT): &UID {
    &self.id
}

public fun update_name(self: &mut EventNFT, name: String) {
    self.name = name;
}

public fun update_thumbnail(self: &mut EventNFT, thumbnail: String) {
    self.thumbnail = thumbnail;
}

public fun update_description(self: &mut EventNFT, description: String) {
    self.description = description;
}


public fun has_available_ticket(self: &EventNFT): bool {
	self.tickets_available > 0
}

public(package) fun decrease_tickets_available(self: &mut EventNFT, amount: u64) {
    assert!(self.tickets_available >= amount, ETicketsSoldOut);
    self.tickets_available = self.tickets_available - amount;
}