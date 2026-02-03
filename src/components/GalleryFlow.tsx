import React, { useState, useEffect } from 'react';
import { Artwork } from '@/types/Artwork';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';
import { logImageError } from '@/utils/imageUtils';

interface GalleryFlowProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
}

interface GalleryItemProps {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
  alignment: 'left' | 'right';
  index: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ artwork, onClick, alignment, index }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!artwork.imageSrc) {
      setImageError(true);
      setIsLoading(false);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
      setImageError(false);
    };
    img.onerror = () => {
      logImageError(artwork.imageSrc, artwork.title);
      setImageError(true);
      setIsLoading(false);
    };
    img.src = artwork.imageSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [artwork.imageSrc, artwork.title]);

  const altText = artwork.alt || `${artwork.title} - ${artwork.medium} artwork by Kassia Marin (${artwork.year})`;

  return (
    <div
      className={cn(
        "relative w-full py-12 md:py-20 animate-fade-in",
        "cursor-pointer group"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => onClick(artwork)}
    >
      <div
        className={cn(
          "flex flex-col gap-6 md:gap-12",
          alignment === 'right' ? "md:flex-row-reverse" : "md:flex-row"
        )}
      >
        {/* Image */}
        <div className={cn(
          "flex-1 flex",
          alignment === 'right' ? "justify-end" : "justify-start"
        )}>
          {imageError ? (
            <div className="w-full max-w-2xl aspect-[4/3] flex flex-col items-center justify-center bg-muted/30 rounded-sm">
              <ImageOff className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">{artwork.title}</p>
            </div>
          ) : (
            <div className="relative w-full max-w-2xl">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/30 z-10">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <img
                src={artwork.imageSrc}
                alt={altText}
                className={cn(
                  "w-full h-auto object-contain transition-all duration-500",
                  isLoading ? "opacity-0" : "opacity-100",
                  "group-hover:scale-[1.01]"
                )}
                loading="lazy"
                onError={() => setImageError(true)}
                onLoad={() => setIsLoading(false)}
                decoding="async"
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className={cn(
          "flex-shrink-0 w-full md:w-64 flex flex-col justify-end",
          alignment === 'right' ? "md:text-left md:items-start" : "md:text-left md:items-start"
        )}>
          <h2 className="font-gotu text-xl md:text-2xl mb-3 tracking-wide">
            {artwork.title}
          </h2>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>{artwork.year}</p>
            <p>{artwork.medium}</p>
            <p>{artwork.size}</p>
          </div>
          {artwork.description && (
            <p className="mt-4 text-sm text-muted-foreground/80 max-w-xs">
              {artwork.description}
            </p>
          )}
        </div>
      </div>

      {/* Separator line */}
      <div className="mt-12 md:mt-20 border-b border-border/40" />
    </div>
  );
};

const GalleryFlow: React.FC<GalleryFlowProps> = ({ artworks, onArtworkClick }) => {
  // Alternating pattern for alignment
  const getAlignment = (index: number): 'left' | 'right' => {
    // First image is right-aligned as requested
    return index % 2 === 0 ? 'right' : 'left';
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {artworks.map((artwork, index) => (
        <GalleryItem
          key={artwork.id}
          artwork={artwork}
          onClick={onArtworkClick}
          alignment={getAlignment(index)}
          index={index}
        />
      ))}
    </div>
  );
};

export default GalleryFlow;
