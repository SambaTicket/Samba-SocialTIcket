module samba_social_ticket::event_config;

use sui::balance::{Self, Balance};
use sui::coin::{Self, Coin};
use sui::sui::SUI;

public struct EventAdminCap has key, store {
    id: UID,
}

public struct EventConfig has key, store {
    id: UID,
    create_event_tax: u64,
    balance: Balance<SUI>,
}


// This function is called once when the package is published.
fun init(ctx: &mut TxContext) {
    let admin_cap = EventAdminCap {
        id: object::new(ctx),
    };
    transfer::transfer(admin_cap, tx_context::sender(ctx));

    let config = EventConfig {
        id: object::new(ctx),
        create_event_tax: 1000, 
        balance: balance::zero<SUI>(),
    };
    transfer::share_object(config);
}

public fun get_create_event_tax(config: &EventConfig): u64 {
    config.create_event_tax;
}