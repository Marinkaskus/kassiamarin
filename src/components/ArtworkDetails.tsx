
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Artwork } from '@/types/Artwork';
import BuyArtworkButton from './BuyArtworkButton';

interface ArtworkDetailsProps {
  artwork: Artwork | null;
  allArtworks: Artwork[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({
  artwork,
  allArtworks,
  open,
  onOpenChange,
}) => {
  if (!artwork) return null;

  const currentIndex = allArtworks.findIndex(a => a.id === artwork.id);
  const hasNext = currentIndex < allArtworks.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      const nextArtwork = allArtworks[currentIndex + 1];
      // This would need to be handled by the parent component
      console.log('Next artwork:', nextArtwork);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      const prevArtwork = allArtworks[currentIndex - 1];
      // This would need to be handled by the parent component
      console.log('Previous artwork:', prevArtwork);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-medium">{artwork.title}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <div className="aspect-square bg-stone-100/80 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={artwork.imageSrc}
                alt={artwork.title}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>
            
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={!hasPrev}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Forrige
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={!hasNext}
              >
                Neste
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <p>{artwork.year}</p>
                <p>{artwork.size}</p>
                <p>{artwork.medium}</p>
              </div>
              
              {artwork.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {artwork.description}
                </p>
              )}
            </div>
            
            <div className="pt-4 border-t">
              <BuyArtworkButton 
                artworkId={artwork.id} 
                artworkTitle={artwork.title}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkDetails;
