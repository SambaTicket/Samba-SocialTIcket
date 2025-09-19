module samba_social_ticket::event_nft;

use std::string::String;
use sui::display;
use sui::package;

const EInsufficientFunds: u64 = 0;


public struct EVENT_NFT has drop {}

public struct EventNFT has key, store {
	id: UID,
	name: String,
	description: String,
	thumbnail: String,
	event_date: u64,
	links: vector<String>,
	//location: Location,
	total_capacity: u8,
	tickets_available: u8,
	//price: ??
	organizer_id: UID
}

//public struct Location {
//	type: String, //ONLINE | ON_SITE
//	city: String,
//	state: String, 
//	address_location: String,
//	description: String,
//	url_access: String
//}


fun init(otw: EVENT_NFT, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);
    let keys = vector[
        b"name".to_string(),
        b"description".to_string(),
        b"links".to_string(),
        b"event_date".to_string(),
        b"total_capacity".to_string(),
        b"tickets_available".to_string(),
        b"organizer_id".to_string(),
    ];

    let values = vector[
        b"Event: {name}".to_string(),
        b"{description}".to_string(),
        b"https://sambasocialticket.com/b/{id}".to_string(),
        b"{links}".to_string(),
        b"{even_date}".to_string(),
        b"{total_capacity}".to_string(),
        b"{organizer_id}".to_string(),
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
): EventNFT {
    EventNFT {
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


public fun id(self: &EventNFT): &UID {
    &self.id;
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

public fun update_tickets_available(self: &mut EventNFT, amount: String) {
	self.tickets_available = tickets_available - amount;
}

public fun has_available_ticket(self> &mut EvetNFT) {
	return self.tickets_available > 0;
}