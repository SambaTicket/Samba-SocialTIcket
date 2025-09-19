module samba_social_ticket::ticket_nft;

use samba_social_ticket::event;

use std::string::String;
use sui::display;
use sui::package;

const EInsufficientFunds: u64 = 0;
const ETicketsSoldOut: u64 = 0;

public struct TICKET_NFT has drop {}

public struct TicketNFT has key, store {
	id: UID,
	name: String,
	description: String,
    event_id: UID,
    user_id: address,
    price_paid: u64,
    image_url: String,
}

public fun id(self: &TicketNFT): &UID {
    &self.id;
}

public fun has_available_ticket(): Boolean {
    //To do -> add call to event and check if avalable tickets > 0
    //
    return true;
}

public fun transfer_to_user() {

}

fun init(otw: TICKET_NFT, ctx: &mut TxContext) {
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

public(package) fun mint(
	name: String,
	description: String,
	thumbnail: String,
	user_id: UID,
	event_id: UID,
	links: vector<String>,
    ctx: &mut TxContext,
): TicketNFT {

    event::has_available_ticket(event_id);
    
    TicketNFT {
        id: object::new(ctx),
        name,
        description,
		thumbnail,
		links,
		user_id,
        event_id
    }
}