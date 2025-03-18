
import React from 'react';
import { Button } from '@/components/ui/button';
import { Artwork } from '@/types/Artwork';
import { Check, Edit, Trash2, X } from 'lucide-react';

interface ArtworkItemProps {
  artwork: Artwork;
  onEdit: (artwork: Artwork) => void;
  onDelete: (id: number, type: 'artwork' | 'project') => void;
}

const ArtworkItem: React.FC<ArtworkItemProps> = ({ artwork, onEdit, onDelete }) => {
  return (
    <div className="group relative border rounded-md overflow-hidden bg-card">
      <div className="aspect-square overflow-hidden">
        <img 
          src={artwork.imageSrc} 
          alt={artwork.title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium truncate">{artwork.title}</h3>
        <p className="text-sm text-muted-foreground">{artwork.year} • {artwork.medium}</p>
        
        <div className="flex justify-between items-center mt-2">
          <span className="flex items-center">
            {artwork.available ? (
              <span className="text-xs flex items-center text-green-600">
                <Check className="h-3 w-3 mr-1" /> Available
              </span>
            ) : (
              <span className="text-xs flex items-center text-red-600">
                <X className="h-3 w-3 mr-1" /> Not Available
              </span>
            )}
          </span>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => onEdit(artwork)}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-destructive"
              onClick={() => onDelete(artwork.id, 'artwork')}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkItem;
