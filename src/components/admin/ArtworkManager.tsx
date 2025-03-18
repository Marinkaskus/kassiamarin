
import React, { useState } from 'react';
import { Artwork } from '@/types/Artwork';
import { useToast } from '@/hooks/use-toast';
import ArtworkEditor from '@/components/ArtworkEditor';

interface ArtworkManagerProps {
  artworkData: Artwork[];
  setArtworkData: React.Dispatch<React.SetStateAction<Artwork[]>>;
  setStorageError: React.Dispatch<React.SetStateAction<string | null>>;
}

const ArtworkManager: React.FC<ArtworkManagerProps> = ({ 
  artworkData, 
  setArtworkData,
  setStorageError
}) => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const { toast } = useToast();

  const handleArtworkUpdate = (updatedArtwork: Artwork) => {
    const updatedArtworks = artworkData.map(artwork => 
      artwork.id === updatedArtwork.id ? updatedArtwork : artwork
    );
    
    setArtworkData(updatedArtworks);
    setSelectedArtwork(null);
    
    localStorage.setItem('gallery_artworks', JSON.stringify(updatedArtworks));
    
    toast({
      title: "Changes saved",
      description: `"${updatedArtwork.title}" has been updated`,
    });
    
    setEditorOpen(false);
  };

  const handleEditArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setEditorOpen(true);
  };

  return (
    <>
      {selectedArtwork && (
        <ArtworkEditor
          artwork={selectedArtwork}
          open={editorOpen}
          onOpenChange={setEditorOpen}
          onSave={handleArtworkUpdate}
        />
      )}
    </>
  );
};

export default ArtworkManager;
