import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wallet, User, Plus, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ST</span>
              </div>
              <span className="font-bold text-lg">SambaTickets</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              <Button 
                variant={isActive('/') ? 'secondary' : 'ghost'} 
                size="sm" 
                asChild
              >
                <Link to="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Events
                </Link>
              </Button>
              
              <Button 
                variant={isActive('/create') ? 'secondary' : 'ghost'} 
                size="sm" 
                asChild
              >
                <Link to="/create" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Event
                </Link>
              </Button>
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <Button 
              variant={isActive('/profile') ? 'secondary' : 'ghost'} 
              size="sm" 
              asChild
            >
              <Link to="/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            </Button>
            
            <Button variant="hero" size="sm" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-6 w-6 bg-gradient-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">ST</span>
              </div>
              <span className="font-semibold">SambaTickets</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Powered by Sui Blockchain & Walrus Storage
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;