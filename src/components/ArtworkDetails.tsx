
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Sun } from 'lucide-react';
import { Artwork } from '@/types/Artwork';
import ImageCarousel from '@/components/ImageCarousel';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { adjustWhiteBalance } from '@/utils/imageProcessing';

interface ArtworkDetailsProps {
  artwork: Artwork | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  footer?: React.ReactNode;
  onAdjustWhiteBalance?: (artwork: Artwork) => void;
}

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({ 
  artwork, 
  open, 
  onOpenChange,
  footer
}) => {
  const { isAdmin } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkDetails;
