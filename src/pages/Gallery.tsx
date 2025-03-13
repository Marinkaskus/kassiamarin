
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { artworks } from '@/data/artworkData';
import ArtworkCard from '@/components/ArtworkCard';
import ArtworkDetails from '@/components/ArtworkDetails';
import { Artwork } from '@/types/Artwork';

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [artworkData, setArtworkData] = useState<Artwork[]>([]);

  // Load artworks from the data file
  useEffect(() => {
    setArtworkData(artworks);
  }, []);
  
  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setDetailsOpen(true);
  };
  
  const handleDetailsOpenChange = (open: boolean) => {
    setDetailsOpen(open);
    // Don't reset selectedArtwork when closing dialog
    // This allows us to maintain the selected artwork when reopening
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Art Gallery - Kassia Marin | Paintings and Artworks</title>
        <meta name="description" content="Browse Kassia Marin's gallery of paintings and artworks. Contemporary art pieces exploring memory, identity, and perception by Norwegian artist Kassia Marin." />
        <meta name="keywords" content="Kassia Marin art, paintings, contemporary art gallery, Norwegian art, Oslo artist" />
        <link rel="canonical" href="https://kassiamarin.studio/gallery" />
      </Helmet>
      
      <section className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-10 md:mb-16 animate-scale-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium">Gallery</h1>
            <p className="mt-3 md:mt-4 text-muted-foreground">
              A collection of paintings and artworks by Kassia Marin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {artworkData.map((artwork, index) => (
              <div 
                key={artwork.id} 
                className="relative transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  opacity: 0,
                  animation: `scaleIn 0.6s ease-out forwards`,
                  animationDelay: `${index * 100}ms`
                }}
              >
                <ArtworkCard 
                  artwork={artwork}
                  onClick={handleArtworkClick}
                  className="transition-transform duration-300 h-full"
                />
              </div>
            ))}
          </div>
          
          {artworkData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No artworks found.</p>
            </div>
          )}
        </div>
      </section>
      
      <ArtworkDetails 
        artwork={selectedArtwork}
        allArtworks={artworkData}
        open={detailsOpen}
        onOpenChange={handleDetailsOpenChange}
      />
    </Layout>
  );
};

export default Gallery;
