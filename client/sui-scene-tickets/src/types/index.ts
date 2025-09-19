export interface EventNFT {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  event_date: number;
  links: string[];
  total_capacity: number;
  tickets_available: number;
  price: number;
  organizer: string;
}

export interface TicketNFT {
  id: string;
  event_id: string;
  owner: string;
  price_paid: number;
  image_url: string;
}

export interface UserProfileNFT {
  id: string;
  name: string;
  pfp: string;
  bio: string;
  links: string[];
  ownedTickets?: TicketNFT[];
  ownedEvents?: EventNFT[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  creator: string;
  event_id: string;
  image: string;
  minted_supply: number;
  total_supply: number;
}

export interface BadgeNFT {
  id: string;
  template_id: string;
  recipient: string;
  awarded_at: number;
  image: string;
}