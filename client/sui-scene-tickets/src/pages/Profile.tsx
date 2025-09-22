import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Ticket, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  ExternalLink,
  Plus,
  Trophy
} from 'lucide-react';
import { mockUserProfile, mockEvents, mockTickets } from '@/data/mockData';
import EventCard from '@/components/EventCard';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockUserProfile);
  const [editedProfile, setEditedProfile] = useState(mockUserProfile);

  const userTickets = mockTickets.filter(ticket => ticket.owner === profile.id);
  const userEvents = mockEvents.filter(event => event.organizer === 'user1');
  
  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const getTicketEvent = (ticketEventId: string) => {
    return mockEvents.find(event => event.id === ticketEventId);
  };

  const formatPrice = (price: number) => {
    return `${(price / 1000000000).toFixed(2)} SUI`;
  };

  const stats = [
    { label: 'Tickets Owned', value: userTickets.length, icon: Ticket },
    { label: 'Events Created', value: userEvents.length, icon: Calendar },
    { label: 'Total Value', value: `${formatPrice(userTickets.reduce((sum, ticket) => sum + ticket.price_paid, 0))}`, icon: Trophy }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8 bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.pfp} alt={profile.name} />
                <AvatarFallback className="text-2xl">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                {!isEditing ? (
                  <>
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-bold">{profile.name}</h1>
                      <Badge variant="secondary">Verified</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="ml-auto"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                    <p className="text-muted-foreground">{profile.bio}</p>
                    {profile.links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {profile.links.map((link, index) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {link.replace(/^https?:\/\//, '')}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Input
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                        className="text-2xl font-bold"
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={handleSaveProfile}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                    <div className="space-y-2">
                      {editedProfile.links.map((link, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={link}
                            onChange={(e) => {
                              const newLinks = [...editedProfile.links];
                              newLinks[index] = e.target.value;
                              setEditedProfile({...editedProfile, links: newLinks});
                            }}
                            placeholder="https://..."
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const newLinks = editedProfile.links.filter((_, i) => i !== index);
                              setEditedProfile({...editedProfile, links: newLinks});
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditedProfile({...editedProfile, links: [...editedProfile.links, '']});
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Link
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              My Tickets ({userTickets.length})
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              My Events ({userEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-6">
            {userTickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userTickets.map((ticket) => {
                  const event = getTicketEvent(ticket.event_id);
                  if (!event) return null;
                  
                  return (
                    <Card key={ticket.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img
                          src={ticket.image_url}
                          alt={`Ticket for ${event.name}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge variant="default" className="bg-success text-success-foreground">
                            Owned
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{event.name}</h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Paid: {formatPrice(ticket.price_paid)}</span>
                          <span>#{ticket.id}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Ticket className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No tickets yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start collecting event tickets to build your digital collection
                  </p>
                  <Button asChild>
                    <a href="/">Explore Events</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            {userEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No events created</h3>
                  <p className="text-muted-foreground mb-4">
                    Start creating events and selling tickets as NFTs
                  </p>
                  <Button asChild>
                    <a href="/create">Create Your First Event</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;