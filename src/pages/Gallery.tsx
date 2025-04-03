
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
    // Make sure we're getting all the artworks from the data file
    console.log("Loading artworks:", artworks.length);
    setArtworkData([...artworks]); // Create a new array to ensure state update
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
        <title>Art Gallery - Kassia Marin | Paintings and Mixed Media Works</title>
        <meta name="description" content="Browse Kassia Marin's gallery of paintings and mixed media artworks. Contemporary art pieces exploring memory, identity, and perception by Norwegian artist Kassia Marin." />
        <meta name="keywords" content="Kassia Marin art, paintings, contemporary art gallery, Norwegian art, Oslo artist, mixed media art, Kassia Marin gallery" />
        <link rel="canonical" href="https://kassiamarin.studio/gallery" />
        <meta property="og:title" content="Art Gallery - Kassia Marin | Contemporary Artworks" />
        <meta property="og:description" content="Browse Kassia Marin's gallery of paintings and mixed media artworks exploring memory and identity." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kassiamarin.studio/gallery" />
      </Helmet>
      
      <section className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16 animate-scale-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-gotu">Gallery</h1>
            <p className="mt-3 md:mt-4 text-muted-foreground">
              A collection of paintings and mixed media artworks by Kassia Marin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {artworkData.map((artwork, index) => (
              <div 
                key={artwork.id} 
                style={{ 
                  opacity: 0,
                  animation: `scaleIn 0.6s ease-out forwards`,
                  animationDelay: `${index * 100}ms`
                }}
              >
                <ArtworkCard 
                  artwork={artwork}
                  onClick={handleArtworkClick}
                  className="h-full"
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
