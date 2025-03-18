
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X, Play, ImageOff } from 'lucide-react';
import { logImageError, getDeviceInfo } from '@/utils/imageUtils';

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
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});
  const [showVideo, setShowVideo] = useState(false);
  const [deviceInfo] = useState(getDeviceInfo());

  // Initialize loading state for all images
  useEffect(() => {
    if (images.length > 0) {
      const loadingState: Record<number, boolean> = {};
      images.forEach(img => {
        loadingState[img.id] = true;
      });
      setImageLoading(loadingState);
    }
  }, [images]);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setShowVideo(false);
  };

  const toggleVideo = () => {
    setShowVideo(prev => !prev);
    if (selectedImage) setSelectedImage(null);
  };

  const closeDialog = () => {
    setSelectedImage(null);
    setShowVideo(false);
  };

  const handleImageError = (imageId: number) => {
    console.error(`Failed to load image with ID: ${imageId}`);
    const image = images.find(img => img.id === imageId);
    if (image) {
      logImageError(image.src, image.title);
    }
    
    setImageErrors(prev => ({...prev, [imageId]: true}));
    setImageLoading(prev => ({...prev, [imageId]: false}));
  };
  
  const handleImageLoad = (imageId: number) => {
    setImageLoading(prev => ({...prev, [imageId]: false}));
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

  const validImages = images.filter(img => !imageErrors[img.id]);

  // Detect if we're on iOS/iPad to adjust for Safari behavior
  const specialSafariClasses = deviceInfo.isIPad && deviceInfo.isSafari 
    ? "max-height: -webkit-fill-available; height: auto;" 
    : "";

  return (
    <>
      <div 
        className="w-full aspect-[4/3] overflow-hidden mb-4 relative flex items-center justify-center"
        style={{ minHeight: deviceInfo.isIPad ? '300px' : 'auto' }}
      >
        {showVideo && videoUrl ? (
          <iframe
            src={videoUrl}
            title="Exhibition Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        ) : (
          validImages.length > 0 && (
            <div className="w-full h-full flex items-center justify-center bg-secondary/5">
              {imageLoading[selectedImage?.id ?? validImages[0].id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/20 z-10">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img 
                src={selectedImage ? selectedImage.src : validImages[0].src} 
                alt={selectedImage ? selectedImage.alt : validImages[0].alt}
                className="max-w-full max-h-full object-contain"
                onError={() => handleImageError(selectedImage?.id ?? validImages[0].id)}
                onLoad={() => handleImageLoad(selectedImage?.id ?? validImages[0].id)}
                style={{ 
                  opacity: imageLoading[selectedImage?.id ?? validImages[0].id] ? 0 : 1,
                  transition: 'opacity 0.3s ease' 
                }}
                loading="eager"
                decoding="async"
              />
            </div>
          )
        )}
        
        {videoUrl && (
          <button
            onClick={toggleVideo}
            className="absolute bottom-4 right-4 bg-background/70 text-foreground p-2 rounded-full hover:bg-background/90 transition-colors"
            aria-label={showVideo ? "Show image" : "Show video"}
          >
            <Play size={16} className={showVideo ? "opacity-50" : "opacity-100"} />
          </button>
        )}
      </div>

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
            
            {imageLoading[image.id] && (
              <div className="absolute inset-0 bg-muted flex items-center justify-center z-5">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            <div className="w-full h-full flex items-center justify-center bg-muted/20">
              <img 
                src={image.src} 
                alt={image.alt}
                loading="lazy"
                decoding="async"
                onError={() => handleImageError(image.id)}
                onLoad={() => handleImageLoad(image.id)}
                className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                style={{ 
                  opacity: imageLoading[image.id] ? 0 : 1,
                  transition: 'opacity 0.3s ease'  
                }}
              />
            </div>
            
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
                {imageLoading[selectedImage.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                  onError={() => handleImageError(selectedImage.id)}
                  onLoad={() => handleImageLoad(selectedImage.id)}
                  style={{ 
                    opacity: imageLoading[selectedImage.id] ? 0 : 1,
                    transition: 'opacity 0.3s ease'  
                  }}
                  loading="eager"
                  decoding="async"
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
