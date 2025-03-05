
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  year: string;
  dimensions?: string;
  medium?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: number;
  videoUrl?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  columns = 3,
  videoUrl
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeDialog = () => {
    setSelectedImage(null);
  };

  const handleImageError = (imageId: number) => {
    console.error(`Failed to load image with ID: ${imageId}`);
    setImageErrors(prev => ({...prev, [imageId]: true}));
  };

  const getGridClass = () => {
    switch(columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  // Filter out images with loading errors
  const validImages = images.filter(img => !imageErrors[img.id]);

  return (
    <>
      <div className={`grid ${getGridClass()} gap-6 md:gap-8`}>
        {validImages.map((image, index) => (
          <div 
            key={image.id} 
            className={`group relative overflow-hidden aspect-square cursor-pointer animate-fade-in ${
              selectedImage?.id === image.id ? 'ring-2 ring-primary' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleImageClick(image)}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 z-10"></div>
            
            <img 
              src={image.src} 
              alt={image.alt}
              loading="lazy"
              onError={() => handleImageError(image.id)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <h3 className="text-lg font-medium text-white drop-shadow-md">{image.title}</h3>
              <p className="text-sm text-white/90 drop-shadow-md">{image.year}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={closeDialog}>
        <DialogContent className="max-w-4xl w-[90vw] p-0 bg-background">
          <DialogClose className="absolute right-4 top-4 z-10 rounded-full p-2 bg-background/80 text-foreground hover:bg-accent transition-colors">
            <X size={20} />
          </DialogClose>
          
          {selectedImage && (
            <div className="grid md:grid-cols-2 min-h-[60vh]">
              <div className="bg-black flex items-center justify-center p-4">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-medium">{selectedImage.title}</h3>
                <p className="text-muted-foreground mt-1">{selectedImage.year}</p>
                
                {selectedImage.medium && (
                  <p className="mt-4 text-sm">
                    <span className="text-muted-foreground">Medium: </span>
                    {selectedImage.medium}
                  </p>
                )}
                
                {selectedImage.dimensions && (
                  <p className="mt-2 text-sm">
                    <span className="text-muted-foreground">Dimensions: </span>
                    {selectedImage.dimensions}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
