
import React from 'react';
import { ImageIcon } from 'lucide-react';
import { Artwork } from '@/types/Artwork';
import ArtworkItem from './ArtworkItem';

interface GalleryTabContentProps {
  artworks: Artwork[];
  onEditArtwork: (artwork: Artwork) => void;
  onDeleteItem: (id: number, type: 'artwork' | 'project') => void;
}

const GalleryTabContent: React.FC<GalleryTabContentProps> = ({ 
  artworks, 
  onEditArtwork, 
  onDeleteItem 
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {artworks.map(artwork => (
          <ArtworkItem 
            key={artwork.id} 
            artwork={artwork} 
            onEdit={onEditArtwork} 
            onDelete={onDeleteItem} 
          />
        ))}
      </div>
      
      {artworks.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
          <h3 className="mt-4 text-lg font-medium">No artworks found</h3>
          <p className="text-muted-foreground">Try a different search term or add a new artwork.</p>
        </div>
      )}
    </>
  );
};

export default GalleryTabContent;
