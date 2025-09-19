module samba_social_ticket::event_config;

use sui::balance::{Self, Balance};
use sui::coin::{Self, Coin};
use sui::sui::SUI;
use sui::transfer;
use sui::tx_context::{Self, TxContext};
use sui::object::{Self, UID};

const ENotAdmin: u64 = 0;
const EPaymentNotExact: u64 = 1;


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
        create_event_tax: 1_000_000_000, //1 SUI
        balance: balance::zero<SUI>(),
    };
    transfer::share_object(config);
}

public entry fun set_create_event_tax(
        _cap: &EventAdminCap,
        config: &mut EventConfig,
        new_tax: u64
    ) {
        config.create_event_tax = new_tax;
}

public entry fun withdraw_balance(
    _cap: &EventAdminCap,
    config: &mut EventConfig,
    ctx: &mut TxContext
) {
    let amount = config.balance.value();
    if (amount > 0) {
            let coins = coin::from_balance(config.balance.split(amount), ctx);
            transfer::public_transfer(coins, tx_context::sender(ctx));
    }
}

public(package) fun collect_tax(config: &mut EventConfig, payment: Coin<SUI>) {
    assert!(payment.value() == config.create_event_tax, EPaymentNotExact);
    config.balance.join(payment.into_balance());
}

public fun get_create_event_tax(config: &EventConfig): u64 {
    config.create_event_tax
}