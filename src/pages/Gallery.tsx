
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { artworks } from '@/data/artworkData';
import ArtworkCard from '@/components/ArtworkCard';
import ArtworkDetails from '@/components/ArtworkDetails';
import ArtworkEditor from '@/components/ArtworkEditor';
import { Artwork } from '@/types/Artwork';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Edit, Plus } from 'lucide-react';
import { logout } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';
import ArtworkCreator from '@/components/ArtworkCreator';

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [creatorOpen, setCreatorOpen] = useState(false);
  const [artworkData, setArtworkData] = useState<Artwork[]>([]);
  const { currentUser, isAdmin } = useAuth();
  const { toast } = useToast();

  // Load artworks from the source of truth
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
      // Use the hardcoded artworks if no saved data
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

  const handleCreateArtwork = (newArtwork: Artwork) => {
    try {
      // Check if we already have too many artworks (to prevent storage quota issues)
      if (artworkData.length > 50) {
        // Consider removing some older items if we have too many
        const updatedArtworks = [...artworkData.slice(-49), newArtwork];
        setArtworkData(updatedArtworks);
        localStorage.setItem('gallery_artworks', JSON.stringify(updatedArtworks));
      } else {
        const updatedArtworks = [...artworkData, newArtwork];
        setArtworkData(updatedArtworks);
        localStorage.setItem('gallery_artworks', JSON.stringify(updatedArtworks));
      }
      
      toast({
        title: "Artwork added",
        description: `"${newArtwork.title}" has been added to the gallery`
      });
    } catch (error) {
      console.error("Error adding artwork:", error);
      
      // Handle localStorage quota exceeded error
      if (error instanceof Error && error.name === "QuotaExceededError") {
        toast({
          title: "Storage limit reached",
          description: "Please remove some existing artworks before adding new ones.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add new artwork. Please try again.",
          variant: "destructive"
        });
      }
      
      throw error; // Re-throw to let ArtworkCreator handle it
    }
  };
  
  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const handleAddNewClick = () => {
    setCreatorOpen(true);
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
            {isAdmin && (
              <Button 
                onClick={handleAddNewClick} 
                className="mt-4 flex items-center"
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" /> Add New Artwork
              </Button>
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
          
          {artworkData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No artworks found.</p>
            </div>
          )}
        </div>
      </section>
      
      <ArtworkDetails 
        artwork={selectedArtwork}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      >
        {isAdmin && selectedArtwork && (
          <Button 
            variant="outline" 
            className="mt-6 w-full" 
            onClick={handleEditClick}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Artwork
          </Button>
        )}
      </ArtworkDetails>
      
      {isAdmin && selectedArtwork && (
        <ArtworkEditor
          artwork={selectedArtwork}
          open={editorOpen}
          onOpenChange={setEditorOpen}
          onSave={handleArtworkUpdate}
        />
      )}

      {isAdmin && (
        <ArtworkCreator
          open={creatorOpen}
          onOpenChange={setCreatorOpen}
          onSave={handleCreateArtwork}
          type="artwork"
        />
      )}
    </Layout>
  );
};

export default Gallery;
