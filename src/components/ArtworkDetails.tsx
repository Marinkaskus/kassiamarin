
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Image } from 'lucide-react';
import { Artwork } from '@/types/Artwork';
import ImageCarousel from '@/components/ImageCarousel';
import { useAuth } from '@/contexts/AuthContext';

interface ArtworkDetailsProps {
  artwork: Artwork | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  footer?: React.ReactNode;  // Keep this prop for custom footer content
  onAdjustWhiteBalance?: (artwork: Artwork) => void;
}

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({ 
  artwork, 
  open, 
  onOpenChange,
  footer,
  onAdjustWhiteBalance
}) => {
  const { isAdmin } = useAuth();  // Add useAuth hook to check admin status
  
  // Create an array of images for the carousel
  const getImageArray = () => {
    if (!artwork) return [];
    
    const images = [artwork.imageSrc];
    if (artwork.additionalImages && artwork.additionalImages.length > 0) {
      images.push(...artwork.additionalImages);
    }
    
    return images;
  };
  
  if (!artwork) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0 space-y-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{artwork.title}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="p-6 pt-2">
          <ImageCarousel
            images={getImageArray()}
            title={artwork.title}
            autoPlay={false}
          />
          
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-sm">
            <div>
              <span className="font-medium">Year:</span> {artwork.year}
            </div>
            <div>
              <span className="font-medium">Medium:</span> {artwork.medium}
            </div>
            <div>
              <span className="font-medium">Size:</span> {artwork.size}
            </div>
            <div>
              <span className="font-medium">Status:</span>{' '}
              <span className={artwork.available ? 'text-green-600' : 'text-red-600'}>
                {artwork.available ? 'Available' : 'Not Available'}
              </span>
            </div>
          </div>
          
          {artwork.description && (
            <div className="mt-4">
              <p className="text-sm">{artwork.description}</p>
            </div>
          )}
          
          {/* Only show admin controls if user is admin */}
          {isAdmin && onAdjustWhiteBalance && (
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onAdjustWhiteBalance(artwork)}
                className="flex items-center gap-2"
              >
                <Image className="h-4 w-4" />
                Adjust White Balance
              </Button>
            </div>
          )}
          
          {/* Render custom footer content if provided */}
          {footer}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkDetails;
