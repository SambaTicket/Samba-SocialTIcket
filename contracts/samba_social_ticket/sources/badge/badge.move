module samba_social_ticket::badge;


// BADGES DEVEM SER SOULBOUND

public struct BADGE has drop {}

public struct Badge has key, store {
	id: UID,
	name: String,
    image: String,
	description: String,
    timestamp: u64, 
    //event: Event
    //supply?: u8 how to make it optional?
}

#[allow(lint(self_transfer))]
fun handle_payment(
    //config
    mut payment: Coin<SUI>,
    tax_amount: u64,
    ctx: &mut TxContext,
) {
    assert!(coin::value(&payment) >= tax_amount, EInsufficientFunds);
    
    let tax = coin::split<SUI>(&mut payment, tax_amount, ctx);
    //config.add_balance(tax);

    //...
}