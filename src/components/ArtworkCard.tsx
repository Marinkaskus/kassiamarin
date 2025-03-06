
import React from 'react';
import { Artwork } from '@/types/Artwork';
import { cn } from '@/lib/utils';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
  className?: string;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick, className }) => {
  return (
    <div 
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-md transition-all duration-300 hover:shadow-md",
        className
      )}
      onClick={() => onClick(artwork)}
    >
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={artwork.imageSrc}
          alt={artwork.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-lg font-medium text-white">{artwork.title}</h3>
        <p className="text-sm text-white/80">{artwork.year}</p>
      </div>
    </div>
  );
};

export default ArtworkCard;
