import { EventNFT, UserProfileNFT, TicketNFT } from '@/types';

export const mockEvents: EventNFT[] = [
  {
    id: '1',
    name: 'Music Festival 2024',
    description: 'Join us for an unforgettable night of live music featuring top artists from around the world. Experience amazing performances, food, and community.',
    thumbnail: '/src/assets/hero-event.jpg',
    event_date: Math.floor(new Date('2024-12-15T20:00:00Z').getTime() / 1000),
    links: ['https://musicfest2024.com', 'https://twitter.com/musicfest2024'],
    total_capacity: 5000,
    tickets_available: 1250,
    price: 500000000, // 0.5 SUI
    organizer: '0x123abc456def789ghi012jkl345mno678pqr901stu234vwx567yz890'
  },
  {
    id: '2',
    name: 'Tech Conference 2024',
    description: 'Leading technology conference bringing together innovators, developers, and entrepreneurs. Learn about the latest trends in blockchain, AI, and Web3.',
    thumbnail: '/src/assets/tech-conference.jpg',
    event_date: Math.floor(new Date('2024-11-20T09:00:00Z').getTime() / 1000),
    links: ['https://techconf2024.com'],
    total_capacity: 1000,
    tickets_available: 750,
    price: 2000000000, // 2 SUI
    organizer: '0x456def789ghi012jkl345mno678pqr901stu234vwx567yz890123abc'
  },
  {
    id: '3',
    name: 'Art Gallery Opening',
    description: 'Contemporary art exhibition featuring digital and traditional artworks. Meet the artists and explore innovative creative expressions.',
    thumbnail: '/src/assets/art-gallery.jpg',
    event_date: Math.floor(new Date('2024-11-10T18:00:00Z').getTime() / 1000),
    links: ['https://moderngallery.art'],
    total_capacity: 200,
    tickets_available: 0,
    price: 100000000, // 0.1 SUI
    organizer: '0x789ghi012jkl345mno678pqr901stu234vwx567yz890123abc456def'
  },
  {
    id: '4',
    name: 'Web3 Workshop Series',
    description: 'Hands-on workshop series covering smart contract development, DeFi protocols, and NFT creation. Perfect for developers and crypto enthusiasts.',
    thumbnail: '/src/assets/tech-conference.jpg',
    event_date: Math.floor(new Date('2024-12-01T14:00:00Z').getTime() / 1000),
    links: ['https://web3workshop.dev', 'https://github.com/web3workshop'],
    total_capacity: 100,
    tickets_available: 25,
    price: 1500000000, // 1.5 SUI
    organizer: '0x012jkl345mno678pqr901stu234vwx567yz890123abc456def789ghi'
  }
];

export const mockUserProfile: UserProfileNFT = {
  id: 'user1',
  name: 'Alex Chen',
  pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
  bio: 'Tech enthusiast and event organizer passionate about Web3 and blockchain technology. Love connecting people through amazing experiences.',
  links: ['https://twitter.com/alexchen', 'https://linkedin.com/in/alexchen'],
  ownedTickets: [],
  ownedEvents: [mockEvents[1]] // User created the tech conference
};

export const mockTickets: TicketNFT[] = [
  {
    id: 'ticket1',
    event_id: '1',
    owner: 'user1',
    price_paid: 500000000,
    image_url: '/src/assets/hero-event.jpg'
  }
];