
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { Artwork } from '@/types/Artwork';

interface ArtworkDetailsProps {
  artwork: Artwork | null;
  allArtworks?: Artwork[]; // Added to allow navigation between artworks
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({ 
  artwork, 
  allArtworks = [], 
  open, 
  onOpenChange, 
  children 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState<Artwork | null>(null);
  
  // Reset state when artwork changes or dialog opens
  useEffect(() => {
    if (open && artwork) {
      setCurrentImageIndex(0);
      setImageError(false);
      setCurrentArtwork(artwork);
    }
  }, [artwork, open]);
  
  if (!currentArtwork) return null;
  
  // Combine main image with additional images
  const allImages = [currentArtwork.imageSrc, ...(currentArtwork.additionalImages || [])];
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    setImageError(false);
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    setImageError(false);
  };

  const handleImageError = () => {
    console.log(`Using fallback in details view for: ${currentArtwork.title}`);
    setImageError(true);
  };

  // Find current artwork index in the allArtworks array
  const currentArtworkIndex = allArtworks.findIndex(art => art.id === currentArtwork.id);
  
  // Navigate to next artwork
  const goToNextArtwork = () => {
    if (allArtworks.length <= 1 || currentArtworkIndex === -1) return;
    const nextIndex = (currentArtworkIndex + 1) % allArtworks.length;
    setCurrentArtwork(allArtworks[nextIndex]);
    setCurrentImageIndex(0);
    setImageError(false);
  };
  
  // Navigate to previous artwork
  const goToPrevArtwork = () => {
    if (allArtworks.length <= 1 || currentArtworkIndex === -1) return;
    const prevIndex = (currentArtworkIndex - 1 + allArtworks.length) % allArtworks.length;
    setCurrentArtwork(allArtworks[prevIndex]);
    setCurrentImageIndex(0);
    setImageError(false);
  };

  // Use a placeholder image when the original image fails to load
  const displayImage = imageError 
    ? 'https://images.unsplash.com/photo-1518770660439-4636190af475' // Fallback image
    : allImages[currentImageIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col md:flex-row md:max-w-5xl md:h-[80vh] gap-6 p-0 overflow-hidden bg-background">
        <div className="relative flex-1 bg-white p-6">
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <ImageOff className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Image could not be loaded</p>
              <p className="text-sm text-muted-foreground mt-2">{currentArtwork.title}</p>
            </div>
          ) : (
            <img 
              src={displayImage} 
              alt={currentArtwork.title} 
              className="w-full h-full object-contain"
              onError={handleImageError}
            />
          )}
          
          {allImages.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground/20"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-foreground/10 text-foreground px-2 py-1 rounded-full text-xs">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </div>
            </>
          )}
          
          {/* Add navigation buttons between artworks if we have multiple artworks */}
          {allArtworks.length > 1 && currentArtworkIndex !== -1 && (
            <div className="absolute bottom-1/2 -translate-y-1/2 w-full flex justify-between px-4">
              <button 
                onClick={goToPrevArtwork}
                className="h-12 w-12 rounded-full bg-foreground/10 border border-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground/20 transform -translate-x-6"
                aria-label="Previous artwork"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={goToNextArtwork}
                className="h-12 w-12 rounded-full bg-foreground/10 border border-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground/20 transform translate-x-6"
                aria-label="Next artwork"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
          
          <DialogClose className="absolute top-4 right-4 h-8 w-8 rounded-full bg-foreground/10 p-1.5 text-foreground hover:bg-foreground/20">
            <X className="h-full w-full" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
        
        <div className="flex-none md:w-1/3 p-6 overflow-y-auto">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl md:text-3xl">{currentArtwork.title}</DialogTitle>
            <DialogDescription className="text-base font-medium text-foreground/80">
              {currentArtwork.year}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm uppercase text-muted-foreground mb-1">Size</h4>
              <p>{currentArtwork.size}</p>
            </div>
            
            <div>
              <h4 className="text-sm uppercase text-muted-foreground mb-1">Medium</h4>
              <p>{currentArtwork.medium}</p>
            </div>
            
            {currentArtwork.description && (
              <div>
                <h4 className="text-sm uppercase text-muted-foreground mb-1">Description</h4>
                <p className="text-foreground/80">{currentArtwork.description}</p>
              </div>
            )}
            
            {currentArtwork.available !== undefined && (
              <div>
                <h4 className="text-sm uppercase text-muted-foreground mb-1">Availability</h4>
                <p className={currentArtwork.available ? "text-green-600" : "text-amber-600"}>
                  {currentArtwork.available ? "Available" : "Not Available"}
                </p>
              </div>
            )}
            
            {currentArtwork.price && (
              <div>
                <h4 className="text-sm uppercase text-muted-foreground mb-1">Price</h4>
                <p>{currentArtwork.price}</p>
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
