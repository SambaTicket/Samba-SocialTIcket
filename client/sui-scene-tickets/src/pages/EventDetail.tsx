import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Ticket, 
  ExternalLink, 
  ArrowLeft,
  Clock,
  Star,
  Share2,
  Heart
} from 'lucide-react';
import { mockEvents } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/">Back to Events</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return `${(price / 1000000000).toFixed(2)} SUI`;
  };

  const totalPrice = event.price * ticketQuantity;
  const isAvailable = event.tickets_available > 0;

  const handlePurchase = () => {
    toast({
      title: "Purchase Initiated",
      description: `Purchasing ${ticketQuantity} ticket(s) for ${formatPrice(totalPrice)}. Please confirm in your wallet.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Event link copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>
        </Button>
      </div>

      {/* Event Image */}
      <div className="relative h-[400px] md:h-[500px] mb-8">
        <img
          src={event.thumbnail}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-0 right-0">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={isAvailable ? "default" : "destructive"} className="text-sm">
                {isAvailable ? `${event.tickets_available} tickets left` : 'Sold Out'}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                NFT Ticket
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
              {event.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Event Details
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{formatDate(event.event_date)}</div>
                      <div className="text-sm text-muted-foreground">{formatTime(event.event_date)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{event.total_capacity} capacity</div>
                      <div className="text-sm text-muted-foreground">{event.total_capacity - event.tickets_available} attending</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">About this event</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {event.links.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-3">Links</h3>
                      <div className="space-y-2">
                        {event.links.map((link, index) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <ExternalLink className="h-4 w-4" />
                            {link}
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Organizer</h3>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold">
                        {event.organizer.slice(2, 4).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">Event Organizer</div>
                      <div className="text-sm text-muted-foreground font-mono">
                        {event.organizer.slice(0, 6)}...{event.organizer.slice(-4)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Purchase Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Get Your Ticket
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {formatPrice(event.price)}
                  </div>
                  <div className="text-sm text-muted-foreground">per ticket</div>
                </div>

                {isAvailable ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Quantity</span>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                            disabled={ticketQuantity <= 1}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{ticketQuantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setTicketQuantity(Math.min(event.tickets_available, ticketQuantity + 1))}
                            disabled={ticketQuantity >= event.tickets_available}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg" 
                      variant="hero"
                      onClick={handlePurchase}
                    >
                      Purchase Ticket{ticketQuantity > 1 ? 's' : ''}
                    </Button>

                    <div className="text-xs text-muted-foreground text-center">
                      This will mint an NFT ticket to your wallet. 
                      Gas fees apply for blockchain transaction.
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="text-lg font-semibold text-destructive">
                      Sold Out
                    </div>
                    <Button variant="secondary" disabled className="w-full">
                      No Tickets Available
                    </Button>
                  </div>
                )}

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Available</span>
                    <span>{event.tickets_available} / {event.total_capacity}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${((event.total_capacity - event.tickets_available) / event.total_capacity) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;