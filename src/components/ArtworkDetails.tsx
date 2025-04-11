
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { Artwork } from '@/types/Artwork';
import { logImageError } from '@/utils/imageUtils';

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
  const [isLoading, setIsLoading] = useState(true);
  const [currentArtwork, setCurrentArtwork] = useState<Artwork | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (open && artwork) {
      setCurrentImageIndex(0);
      setImageError(false);
      setIsLoading(true);
      setCurrentArtwork(artwork);
    }
  }, [artwork, open]);
  
  useEffect(() => {
    if (!currentArtwork) return;
    setIsLoading(true);
    setImageError(false);
  }, [currentImageIndex, currentArtwork]);
  
  if (!currentArtwork) return null;
  
  const allImages = [currentArtwork.imageSrc, ...(currentArtwork.additionalImages || [])];
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleImageError = () => {
    console.log(`Using fallback in details view for: ${currentArtwork.title}`);
    logImageError(allImages[currentImageIndex], currentArtwork.title);
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  const currentArtworkIndex = allArtworks.findIndex(art => art.id === currentArtwork.id);
  
  const goToNextArtwork = () => {
    if (allArtworks.length <= 1 || currentArtworkIndex === -1) return;
    const nextIndex = (currentArtworkIndex + 1) % allArtworks.length;
    setCurrentArtwork(allArtworks[nextIndex]);
    setCurrentImageIndex(0);
    setImageError(false);
    setIsLoading(true);
  };
  
  const goToPrevArtwork = () => {
    if (allArtworks.length <= 1 || currentArtworkIndex === -1) return;
    const prevIndex = (currentArtworkIndex - 1 + allArtworks.length) % allArtworks.length;
    setCurrentArtwork(allArtworks[prevIndex]);
    setCurrentImageIndex(0);
    setImageError(false);
    setIsLoading(true);
  };

  const displayImage = imageError 
    ? 'https://images.unsplash.com/photo-1518770660439-4636190af475' // Fallback image
    : allImages[currentImageIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };
  
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || !touchStartY.current || !touchEndY.current) return;
    
    const xDiff = touchStartX.current - touchEndX.current;
    const yDiff = touchStartY.current - touchEndY.current;
    
    if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 50) {
      if (xDiff > 0) {
        if (allImages.length > 1) {
          handleNextImage();
        } else {
          goToNextArtwork();
        }
      } else {
        if (allImages.length > 1) {
          handlePrevImage();
        } else {
          goToPrevArtwork();
        }
      }
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
    touchStartY.current = null;
    touchEndY.current = null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col max-w-5xl md:h-[80vh] gap-6 p-0 overflow-hidden bg-background">
        <div 
          className="relative w-full bg-white p-4 md:p-6 flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <ImageOff className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Image could not be loaded</p>
              <p className="text-sm text-muted-foreground mt-2">{currentArtwork.title}</p>
            </div>
          ) : (
            <div className="max-h-[50vh] md:max-h-[60vh] lg:max-h-[65vh] w-full flex items-center justify-center">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/30 z-10">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img 
                ref={imgRef}
                src={displayImage} 
                alt={currentArtwork.title} 
                className="max-w-full max-h-full object-contain mx-auto"
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="eager"
                decoding="async"
                style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease' }}
              />
            </div>
          )}
          
          {allImages.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full bg-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
              </button>
              
              <button 
                onClick={handleNextImage}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full bg-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground/20"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
              </button>
              
              <div className="absolute bottom-2 md:bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-foreground/10 text-foreground px-2 py-1 rounded-full text-xs">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </div>
            </>
          )}
          
          {allArtworks.length > 1 && currentArtworkIndex !== -1 && (
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 md:px-4">
              <button 
                onClick={goToPrevArtwork}
                className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-foreground/10 border border-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground/20 transform -translate-x-3 md:-translate-x-6"
                aria-label="Previous artwork"
              >
                <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
              </button>
              
              <button 
                onClick={goToNextArtwork}
                className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-foreground/10 border border-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground/20 transform translate-x-3 md:translate-x-6"
                aria-label="Next artwork"
              >
                <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
              </button>
            </div>
          )}
          
          <DialogClose className="absolute top-2 right-2 md:top-4 md:right-4 h-6 w-6 md:h-8 md:w-8 rounded-full bg-foreground/10 p-1.5 text-foreground hover:bg-foreground/20">
            <X className="h-full w-full" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
        
        <div className="p-4 md:p-6 w-full">
          <DialogHeader className="mb-4 text-center">
            <DialogTitle className="text-xl md:text-2xl lg:text-3xl">{currentArtwork.title}</DialogTitle>
            <DialogDescription className="text-sm md:text-base font-medium text-foreground/80">
              {currentArtwork.year}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            <div className="md:col-span-1">
              <h4 className="text-xs md:text-sm uppercase text-muted-foreground mb-1">Size</h4>
              <p className="text-sm md:text-base">{currentArtwork.size}</p>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="text-xs md:text-sm uppercase text-muted-foreground mb-1">Medium</h4>
              <p className="text-sm md:text-base">{currentArtwork.medium}</p>
            </div>
            
            {currentArtwork.price && (
              <div className="md:col-span-1">
                <h4 className="text-xs md:text-sm uppercase text-muted-foreground mb-1">Price</h4>
                <p className="text-sm md:text-base">{currentArtwork.price}</p>
              </div>
            )}
            
            {currentArtwork.description && (
              <div className="md:col-span-3">
                <h4 className="text-xs md:text-sm uppercase text-muted-foreground mb-1">Description</h4>
                <p className="text-sm md:text-base text-foreground/80">{currentArtwork.description}</p>
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
