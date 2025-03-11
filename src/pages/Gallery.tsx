import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { artworks } from '@/data/artworkData';
import ArtworkCard from '@/components/ArtworkCard';
import ArtworkDetails from '@/components/ArtworkDetails';
import ArtworkEditor from '@/components/ArtworkEditor';
import { Artwork } from '@/types/Artwork';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { logout } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';
import { adjustWhiteBalance } from '@/utils/imageProcessing';

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [artworkData, setArtworkData] = useState<Artwork[]>([]);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const { currentUser, isAdmin } = useAuth();
  const { toast } = useToast();

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

  const handleAdjustWhiteBalance = async (artwork: Artwork) => {
    if (!artwork) return;
    
    setIsAdjusting(true);
    toast({
      title: "Processing",
      description: "Adjusting white balance, please wait...",
    });
    
    try {
      // Pass the base64/data URL string directly instead of fetching
      const adjustedImageBase64 = await adjustWhiteBalance(artwork.imageSrc);
      
      // Update the artwork
      const updatedArtwork = { ...artwork, imageSrc: adjustedImageBase64 };
      
      // Update in state and localStorage
      const updatedArtworks = artworkData.map(item => 
        item.id === artwork.id ? updatedArtwork : item
      );
      
      setArtworkData(updatedArtworks);
      setSelectedArtwork(updatedArtwork);
      
      localStorage.setItem('gallery_artworks', JSON.stringify(updatedArtworks));
      
      toast({
        title: "Success",
        description: "White balance adjusted successfully",
      });
    } catch (error) {
      console.error('Error adjusting white balance:', error);
      toast({
        title: "Error",
        description: "Failed to adjust white balance",
        variant: "destructive",
      });
    } finally {
      setIsAdjusting(false);
    }
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
      />
      
      {isAdmin && selectedArtwork && (
        <ArtworkEditor
          artwork={selectedArtwork}
          open={editorOpen}
          onOpenChange={setEditorOpen}
          onSave={handleArtworkUpdate}
        />
      )}
    </Layout>
  );
};

export default Gallery;
