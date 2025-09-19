module samba_social_ticket::event;

use std::string::String;

	event_date: u64,
	location: Location,
	total_capacity: u8,
	tickets_available: u8,
	//price: ??
	organizer_id: UID

#[allow(lint(self_transfer))]
public fun mint_event(
    name: String,
    description: String,
    thumbnail: String,
    links: vector<String>,
    event_date: u64,
    location: Location,
    total_capacity: u8,
    tickets_available: u8,
    organizer_id: UID
    ctx: &mut TxContext,
) {
    let sender = tx_context::sender(ctx);
    let (mut kiosk, kiosk_cap): (Kiosk, KioskOwnerCap) = kiosk::new(ctx);

    let event_nft = event_nft::mint(
        name,
        description,
        thumbnail,
        links,
        event_date,
        location,
        total_capacity,
        tickets_available,
        organizer_id,
        ctx,
    );

    kiosk::place(&mut kiosk, &kiosk_cap, event_nft);
    
    transfer::public_transfer(kiosk_cap, sender);
    transfer::public_share_object(kiosk);
}