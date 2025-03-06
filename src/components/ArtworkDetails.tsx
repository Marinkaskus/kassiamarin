
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Artwork } from '@/types/Artwork';

interface ArtworkDetailsProps {
  artwork: Artwork | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({ artwork, open, onOpenChange }) => {
  if (!artwork) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col md:flex-row md:max-w-5xl md:h-[80vh] gap-6 p-0 overflow-hidden">
        <div className="relative flex-1 bg-black">
          <img 
            src={artwork.imageSrc} 
            alt={artwork.title} 
            className="w-full h-full object-contain"
          />
          <DialogClose className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/40 p-1.5 text-white hover:bg-black/60">
            <X className="h-full w-full" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
        
        <div className="flex-none md:w-1/3 p-6 overflow-y-auto">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl md:text-3xl">{artwork.title}</DialogTitle>
            <DialogDescription className="text-base font-medium text-foreground/80">
              {artwork.year}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm uppercase text-muted-foreground mb-1">Size</h4>
              <p>{artwork.size}</p>
            </div>
            
            <div>
              <h4 className="text-sm uppercase text-muted-foreground mb-1">Medium</h4>
              <p>{artwork.medium}</p>
            </div>
            
            {artwork.description && (
              <div>
                <h4 className="text-sm uppercase text-muted-foreground mb-1">Description</h4>
                <p className="text-foreground/80">{artwork.description}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkDetails;
