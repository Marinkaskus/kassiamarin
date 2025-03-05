
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  title: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  // Filter out images with errors
  const validImages = images.filter(img => !imageErrors[img]);
  
  // Reset currentImageIndex when validImages list changes
  useEffect(() => {
    if (validImages.length > 0 && currentImageIndex >= validImages.length) {
      setCurrentImageIndex(0);
    }
  }, [validImages.length, currentImageIndex]);
  
  const goToNextImage = () => {
    if (validImages.length === 0) return;
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % validImages.length);
  };

  const goToPrevImage = () => {
    if (validImages.length === 0) return;
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + validImages.length) % validImages.length);
  };

  const handleImageError = (imageSrc: string) => {
    console.error(`Failed to load image: ${imageSrc}`);
    setImageErrors(prev => ({...prev, [imageSrc]: true}));
  };
  
  if (validImages.length === 0) {
    return (
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center">
        <div className="flex flex-col items-center text-muted-foreground gap-2">
          <AlertCircle size={24} />
          <p>Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden group">
      <img 
        src={validImages[currentImageIndex]} 
        alt={`${title} - image ${currentImageIndex + 1}`} 
        className="w-full h-full object-cover transition-opacity duration-300"
        onError={() => handleImageError(validImages[currentImageIndex])}
      />
      
      {validImages.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              className="bg-background/70 text-foreground p-2 rounded-full hover:bg-background/90 transition-colors"
              onClick={goToPrevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="bg-background/70 text-foreground p-2 rounded-full hover:bg-background/90 transition-colors"
              onClick={goToNextImage}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {validImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-primary' : 'bg-background/70'
                }`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
