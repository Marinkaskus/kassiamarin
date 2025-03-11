
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { artworks } from '@/data/artworkData';
import ArtworkCard from '@/components/ArtworkCard';
import ArtworkDetails from '@/components/ArtworkDetails';
import ArtworkEditor from '@/components/ArtworkEditor';
import AdminLogin from '@/components/AdminLogin';
import { Artwork } from '@/types/Artwork';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Edit, Lock } from 'lucide-react';
import { logout } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [artworkData, setArtworkData] = useState<Artwork[]>([]);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { currentUser, isAdmin } = useAuth();
  const { toast } = useToast();

  // Restore artwork data from localStorage or use default
  useEffect(() => {
    const savedArtworks = localStorage.getItem('gallery_artworks');
    if (savedArtworks) {
      try {
        setArtworkData(JSON.parse(savedArtworks));
      } catch (e) {
        console.error('Error parsing saved artworks:', e);
        setArtworkData(artworks);
      }
    } else {
      setArtworkData(artworks);
    }
  }, []);
  
  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setDetailsOpen(true);
  };
  
  const handleEditClick = () => {
    if (selectedArtwork) {
      setEditorOpen(true);
    }
  };
  
  const handleArtworkUpdate = (updatedArtwork: Artwork) => {
    const updatedArtworks = artworkData.map(artwork => 
      artwork.id === updatedArtwork.id ? updatedArtwork : artwork
    );
    
    setArtworkData(updatedArtworks);
    setSelectedArtwork(updatedArtwork);
    
    // Persist changes to localStorage
    localStorage.setItem('gallery_artworks', JSON.stringify(updatedArtworks));
    
    toast({
      title: "Changes saved",
      description: "Your changes have been saved permanently",
    });
  };
  
  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };
  
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16 animate-scale-in">
            <h1 className="text-4xl md:text-5xl font-medium">Gallery</h1>
            <p className="mt-4 text-muted-foreground">
              A collection of paintings.
            </p>
            
            {isAdmin ? (
              <div className="mt-6 flex justify-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Admin Mode
                </span>
              </div>
            ) : (
              <div className="mt-6">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setLoginModalOpen(true)}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Lock className="h-3 w-3" /> Admin
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {artworkData.map((artwork, index) => (
              <div 
                key={artwork.id} 
                className="relative transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  opacity: 0,
                  animation: `scaleIn 0.6s ease-out forwards`,
                  animationDelay: `${index * 100}ms`
                }}
              >
                <ArtworkCard 
                  artwork={artwork}
                  onClick={handleArtworkClick}
                  className="transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <ArtworkDetails 
        artwork={selectedArtwork}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      >
        {isAdmin && selectedArtwork && (
          <Button 
            onClick={handleEditClick}
            variant="outline" 
            size="sm"
            className="mt-4 flex items-center gap-2"
          >
            <Edit className="h-4 w-4" /> Edit Artwork
          </Button>
        )}
      </ArtworkDetails>
      
      {selectedArtwork && (
        <ArtworkEditor
          artwork={selectedArtwork}
          open={editorOpen}
          onOpenChange={setEditorOpen}
          onSave={handleArtworkUpdate}
        />
      )}
      
      {loginModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <AdminLogin 
              onLoginSuccess={() => setLoginModalOpen(false)}
            />
            <Button 
              variant="ghost" 
              className="absolute top-6 right-6 text-white" 
              onClick={() => setLoginModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
