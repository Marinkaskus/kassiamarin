
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, Pause, Play, Video } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  title: string;
  autoPlay?: boolean;
  interval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  title, 
  autoPlay = true, 
  interval = 5000 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  
  // Filter out images with errors
  const validImages = images.filter(img => !imageErrors[img]);
  
  // Check if current item is a video
  const isCurrentItemVideo = validImages[currentImageIndex]?.startsWith('video:');
  const currentVideoUrl = isCurrentItemVideo 
    ? validImages[currentImageIndex].replace('video:', '') 
    : '';
  
  // Reset currentImageIndex when validImages list changes
  useEffect(() => {
    if (validImages.length > 0 && currentImageIndex >= validImages.length) {
      setCurrentImageIndex(0);
    }
    
    // Preload the next image to improve performance
    if (validImages.length > 1 && !isCurrentItemVideo) {
      const nextIndex = (currentImageIndex + 1) % validImages.length;
      if (!validImages[nextIndex].startsWith('video:')) {
        const img = new Image();
        img.src = validImages[nextIndex];
      }
    }
  }, [validImages.length, currentImageIndex, isCurrentItemVideo]);
  
  // Automatic image rotation
  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlay && validImages.length > 1 && !isPaused && !isCurrentItemVideo) {
        autoPlayTimerRef.current = setInterval(() => {
          setCurrentImageIndex(prevIndex => (prevIndex + 1) % validImages.length);
        }, interval);
      }
    };
    
    const clearAutoPlay = () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
    
    clearAutoPlay();
    startAutoPlay();
    
    return () => clearAutoPlay();
  }, [autoPlay, validImages.length, interval, isPaused, isCurrentItemVideo]);
  
  // Pause autoplay when user interacts with carousel
  useEffect(() => {
    const handleUserInteraction = () => {
      if (autoPlay && !isPaused) {
        setIsPaused(true);
      }
    };
    
    // Resume autoplay after a period of inactivity
    const resumeTimer = isPaused ? setTimeout(() => {
      setIsPaused(false);
    }, 30000) : null; // Resume after 30 seconds of inactivity
    
    return () => {
      if (resumeTimer) clearTimeout(resumeTimer);
    };
  }, [isPaused, autoPlay]);
  
  const goToNextImage = () => {
    if (validImages.length === 0) return;
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % validImages.length);
    setIsPaused(true); // Pause autoplay when manually navigating
  };

  const goToPrevImage = () => {
    if (validImages.length === 0) return;
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + validImages.length) % validImages.length);
    setIsPaused(true); // Pause autoplay when manually navigating
  };

  const handleImageError = (imageSrc: string) => {
    console.error(`Failed to load image: ${imageSrc}`);
    setImageErrors(prev => ({...prev, [imageSrc]: true}));
  };
  
  const handleImageLoad = (imageSrc: string) => {
    setImagesLoaded(prev => ({...prev, [imageSrc]: true}));
  };
  
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };
  
  // Touch event handlers for swipe navigation
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
    
    // Only register horizontal swipes if they're more horizontal than vertical
    if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 50) {
      if (xDiff > 0) {
        // Swiped left -> show next
        goToNextImage();
      } else {
        // Swiped right -> show previous
        goToPrevImage();
      }
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
    touchStartY.current = null;
    touchEndY.current = null;
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
    <div 
      className="relative w-full aspect-[4/3] overflow-hidden group touch-manipulation"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {isCurrentItemVideo ? (
        <div className="absolute inset-0 z-10">
          <iframe 
            src={currentVideoUrl}
            title={`${title} - video`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
      ) : (
        validImages.map((src, index) => (
          <div 
            key={src} 
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {!imagesLoaded[src] && (
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img 
              src={src} 
              alt={`${title} - image ${index + 1}`} 
              className="w-full h-full object-contain"
              loading={index === currentImageIndex ? "eager" : "lazy"}
              onError={() => handleImageError(src)}
              onLoad={() => handleImageLoad(src)}
            />
          </div>
        ))
      )}
      
      {validImages.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <button 
              className="bg-background/70 text-foreground p-1.5 sm:p-2 rounded-full hover:bg-background/90 transition-colors"
              onClick={goToPrevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={16} className="sm:size-20" />
            </button>
            <button 
              className="bg-background/70 text-foreground p-1.5 sm:p-2 rounded-full hover:bg-background/90 transition-colors"
              onClick={goToNextImage}
              aria-label="Next image"
            >
              <ChevronRight size={16} className="sm:size-20" />
            </button>
          </div>
          
          <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center gap-1 sm:gap-2 z-20">
            {validImages.map((src, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-primary' : 'bg-background/70'
                } ${src.startsWith('video:') ? 'flex items-center justify-center' : ''}`}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsPaused(true);
                }}
                aria-label={`Go to ${src.startsWith('video:') ? 'video' : 'image'} ${index + 1}`}
              >
                {src.startsWith('video:') && <div className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-background/40 flex items-center justify-center"><Video size={6} className="sm:size-8" /></div>}
              </button>
            ))}
          </div>
          
          {autoPlay && !isCurrentItemVideo && (
            <button
              onClick={togglePause}
              className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-background/70 text-foreground p-1.5 sm:p-2 rounded-full hover:bg-background/90 transition-colors opacity-0 group-hover:opacity-100 z-20"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? <Play size={12} className="sm:size-16" /> : <Pause size={12} className="sm:size-16" />}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
