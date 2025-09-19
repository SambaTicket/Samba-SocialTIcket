import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Ticket } from 'lucide-react';
import { EventNFT } from '@/types';

interface EventCardProps {
  event: EventNFT;
}

const EventCard = ({ event }: EventCardProps) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return `${(price / 1000000000).toFixed(2)} SUI`;
  };

  const isAvailable = event.tickets_available > 0;

  return (
    <Card className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={event.thumbnail}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={isAvailable ? "default" : "destructive"} className="bg-background/90 text-foreground">
            {isAvailable ? `${event.tickets_available} left` : 'Sold Out'}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {event.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.event_date)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{event.total_capacity} capacity</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ticket className="h-4 w-4 text-primary" />
          <span className="font-semibold text-lg">{formatPrice(event.price)}</span>
        </div>
        
        <Button 
          variant={isAvailable ? "hero" : "secondary"} 
          size="sm" 
          asChild
          disabled={!isAvailable}
        >
          <Link to={`/event/${event.id}`}>
            {isAvailable ? 'Get Tickets' : 'View Event'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;