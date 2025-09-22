import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EventCard from '@/components/EventCard';
import { Search, Filter, Calendar, TrendingUp, Users, Sparkles } from 'lucide-react';
import { mockEvents } from '@/data/mockData';
import heroEventImage from '@/assets/hero-event.jpg';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'available' && event.tickets_available > 0) ||
                           (selectedCategory === 'sold-out' && event.tickets_available === 0);
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All Events', count: mockEvents.length },
    { id: 'available', label: 'Available', count: mockEvents.filter(e => e.tickets_available > 0).length },
    { id: 'sold-out', label: 'Sold Out', count: mockEvents.filter(e => e.tickets_available === 0).length }
  ];

  const stats = [
    { label: 'Total Events', value: mockEvents.length, icon: Calendar, color: 'text-primary' },
    { label: 'Active Tickets', value: mockEvents.reduce((sum, e) => sum + (e.total_capacity - e.tickets_available), 0), icon: Users, color: 'text-accent' },
    { label: 'Revenue (SUI)', value: '12.5K', icon: TrendingUp, color: 'text-success' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0">
          <img
            src={heroEventImage}
            alt="Featured Events"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-accent" />
              <Badge variant="secondary" className="bg-background/20 text-primary-foreground border-primary-foreground/20">
                Powered by Sui Blockchain
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-4">
              Experience Events
              <br />
              <span className="text-accent">Own the Moment</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Buy, sell, and collect event tickets as NFTs. Join exclusive experiences and build your digital collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="accent" className="text-lg px-8">
                Explore Events
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20">
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border/50">
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Search and Filter Section */}
        <section className="space-y-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    {category.label}
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'all' ? 'All Events' : 
               selectedCategory === 'available' ? 'Available Events' : 'Sold Out Events'}
            </h2>
            <div className="text-muted-foreground">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;