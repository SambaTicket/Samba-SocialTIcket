import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Upload, 
  Plus, 
  X, 
  Clock,
  Users,
  DollarSign,
  Info,
  Link as LinkIcon,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EventFormData {
  name: string;
  description: string;
  thumbnail: string;
  event_date: string;
  event_time: string;
  links: string[];
  total_capacity: number;
  price: number;
}

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    description: '',
    thumbnail: '',
    event_date: '',
    event_time: '',
    links: [''],
    total_capacity: 100,
    price: 0.1
  });

  const handleInputChange = (field: keyof EventFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...formData.links];
    newLinks[index] = value;
    setFormData(prev => ({
      ...prev,
      links: newLinks
    }));
  };

  const addLinkField = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, '']
    }));
  };

  const removeLinkField = (index: number) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      links: newLinks.length > 0 ? newLinks : ['']
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to Walrus storage here
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({
          ...prev,
          thumbnail: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.name || !formData.description || !formData.event_date) {
        throw new Error('Please fill in all required fields');
      }

      // Convert date/time to timestamp
      const eventDateTime = new Date(`${formData.event_date}T${formData.event_time}`);
      const timestamp = Math.floor(eventDateTime.getTime() / 1000);

      // In a real app, this would call the Sui smart contract
      console.log('Creating event with data:', {
        ...formData,
        event_timestamp: timestamp,
        price_mist: formData.price * 1000000000, // Convert SUI to MIST
        links: formData.links.filter(link => link.trim() !== '')
      });

      toast({
        title: "Event Created Successfully! 🎉",
        description: `Your event "${formData.name}" has been created and published on the blockchain.`,
      });

      // Simulate delay and redirect
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      toast({
        title: "Error Creating Event",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const priceInMist = formData.price * 1000000000;
  const createTax = 1; // 1 SUI
  const totalCost = formData.price + createTax;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              NFT Event Creation
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Create Your Event</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn your event into an NFT experience. Sell tickets on-chain and create lasting digital memories.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Event Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your event name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your event..."
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="thumbnail">Event Image</Label>
                    <div className="space-y-4">
                      <Input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                      {formData.thumbnail && (
                        <div className="relative aspect-video rounded-lg overflow-hidden border">
                          <img
                            src={formData.thumbnail}
                            alt="Event preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Date & Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Date & Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="event_date">Event Date *</Label>
                      <Input
                        id="event_date"
                        type="date"
                        value={formData.event_date}
                        onChange={(e) => handleInputChange('event_date', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="event_time">Event Time *</Label>
                      <Input
                        id="event_time"
                        type="time"
                        value={formData.event_time}
                        onChange={(e) => handleInputChange('event_time', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Capacity & Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Capacity & Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="total_capacity">Total Capacity</Label>
                      <Input
                        id="total_capacity"
                        type="number"
                        value={formData.total_capacity}
                        onChange={(e) => handleInputChange('total_capacity', parseInt(e.target.value) || 0)}
                        min="1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Ticket Price (SUI)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    Additional Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.links.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={link}
                        onChange={(e) => handleLinkChange(index, e.target.value)}
                        placeholder="https://..."
                      />
                      {formData.links.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeLinkField(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addLinkField}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Link
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Event Name:</span>
                      <span className="font-medium truncate ml-2">
                        {formData.name || 'Untitled Event'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-medium">{formData.total_capacity}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ticket Price:</span>
                      <span className="font-medium">{formData.price} SUI</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Max Revenue:</span>
                      <span className="font-medium text-success">
                        {(formData.price * formData.total_capacity).toFixed(2)} SUI
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <h4 className="font-semibold text-sm">Blockchain Costs</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Creation Tax:</span>
                        <span>{createTax} SUI</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gas Estimate:</span>
                        <span>~0.02 SUI</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total Cost:</span>
                        <span>~{(createTax + 0.02).toFixed(2)} SUI</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-muted-foreground">
                        Your event will be minted as an NFT. Tickets will be sold as individual NFTs to attendees.
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    variant="hero"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Event...' : 'Create Event'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;