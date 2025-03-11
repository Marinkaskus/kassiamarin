
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { artworks } from '@/data/artworkData';
import ArtworkCard from '@/components/ArtworkCard';
import ArtworkDetails from '@/components/ArtworkDetails';
import { Artwork } from '@/types/Artwork';

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setDetailsOpen(true);
  };
  
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-medium">Gallery</h1>
            <p className="mt-4 text-muted-foreground">
              A collection of paintings and graphic prints exploring themes of nature, identity, and modern existence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {artworks.map((artwork, index) => (
              <div key={artwork.id} className="relative">
                <ArtworkCard 
                  artwork={artwork}
                  onClick={handleArtworkClick}
                  className={`animate-fade-in-up [animation-delay:${index * 100}ms]`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <ArtworkDetails 
        artwork={selectedArtwork}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </Layout>
  );
};

export default Gallery;
