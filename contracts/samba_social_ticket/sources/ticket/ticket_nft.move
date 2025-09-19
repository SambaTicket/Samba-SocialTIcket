module samba_social_ticket::ticket_nft;

use std::string::String;
use sui::display;
use sui::package;

public struct TICKET_NFT has drop {}

public struct TicketNFT has key, store {
	id: UID,
	name: String,
	description: String,
    event_id: UID,
    user_id: UID,
    price_paid: u64,
    image_url: String,
}

public fun id(self: &TicketNFT): &UID {
    &self.id;
}

public fun has_ticket(): Boolean {
    //To do -> add call to event and check if avalable tickets > 0
    return true;
}

public fun transfer_to_user() {

}

fun init(otw: EVENT_NFT, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);
    let keys = vector[
        b"name".to_string(),
        b"description".to_string(),
        b"links".to_string(),
        b"event_id".to_string(),
        b"user_id".to_string(),
        b"tickets_available".to_string(),
        b"image_url".to_string(),
    ];

    let values = vector[
        b"{name}".to_string(),
        b"{description}".to_string(),
        b"https://sambasocialticket.com/b/{id}".to_string(),
        b"{links}".to_string(),
        b"{event_id}".to_string(),
        b"{user_id}".to_string(),
        b"{image_url}".to_string(),
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
	total_capacity: u8,
	tickets_available: u8,
	organizer_id: UID
    links: vector<String>,
    ctx: &mut TxContext,
): TicketNFT {
    TicketNFT {
        id: object::new(ctx),
        name,
        description,
		thumbnail,
		event_date,
		links,
		total_capacity,
		tickets_available,
		organizer_id
    }
}