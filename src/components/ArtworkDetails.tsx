
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { Artwork } from '@/types/Artwork';

interface ArtworkDetailsProps {
  artwork: Artwork | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({ artwork, open, onOpenChange, children }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  // Reset state when artwork changes or dialog opens
  useEffect(() => {
    if (open && artwork) {
      setCurrentImageIndex(0);
      setImageError(false);
    }
  }, [artwork, open]);
  
  if (!artwork) return null;
  
  // Combine main image with additional images
  const allImages = [artwork.imageSrc, ...(artwork.additionalImages || [])];
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    setImageError(false);
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col md:flex-row md:max-w-5xl md:h-[80vh] gap-6 p-0 overflow-hidden">
        <div className="relative flex-1 bg-black">
          {!imageError ? (
            <img 
              src={allImages[currentImageIndex]} 
              alt={artwork.title} 
              className="w-full h-full object-contain"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <ImageOff className="h-16 w-16 text-white/50 mb-4" />
              <p className="text-white/70">Image could not be loaded</p>
            </div>
          )}
          
          {allImages.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </div>
            </>
          )}
          
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
            
            {artwork.available !== undefined && (
              <div>
                <h4 className="text-sm uppercase text-muted-foreground mb-1">Availability</h4>
                <p className={artwork.available ? "text-green-600" : "text-amber-600"}>
                  {artwork.available ? "Available" : "Not Available"}
                </p>
              </div>
            )}
            
            {artwork.price && (
              <div>
                <h4 className="text-sm uppercase text-muted-foreground mb-1">Price</h4>
                <p>{artwork.price}</p>
              </div>
            )}
            
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkDetails;
