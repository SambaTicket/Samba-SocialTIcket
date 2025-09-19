module samba_social_ticket::event;

use std::string::String;
use sui::display;
use sui::package;


public struct EVENT_NFT has drop {}

public struct EventNFT has key, store {
	id: UID,
	name: String,
	description: String,
	thumbnail: String,
	event_date: u64,
	links: vector<String>,
	location: Location,
	total_capacity: u8,
	tickets_available: u8,
	//price: ??
	organizer_id: UID
}

public struct Location {
	type: String, //ONLINE | ON_SITE
	city: String,
	state: String, 
	address_location: String,
	description: String,
	url_access: String
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