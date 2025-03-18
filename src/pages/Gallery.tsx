
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { artworks, isImageUrlValid } from '@/data/artworkData';
import ArtworkCard from '@/components/ArtworkCard';
import ArtworkDetails from '@/components/ArtworkDetails';
import { Artwork } from '@/types/Artwork';
import { toast } from 'sonner';

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [artworkData, setArtworkData] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load artworks from the data file and validate images
  useEffect(() => {
    const loadArtworks = async () => {
      setIsLoading(true);
      
      try {
        // First load all artworks
        setArtworkData(artworks);
        
        // Validate artwork images in the background
        const validationPromises = artworks.map(artwork => 
          isImageUrlValid(artwork.imageSrc)
            .then(isValid => {
              if (!isValid) {
                console.warn(`Invalid image URL for artwork: ${artwork.title}`);
              }
              return {
                ...artwork,
                validImage: isValid
              };
            })
        );
        
        // Wait for all validations to complete
        const validatedArtworks = await Promise.all(validationPromises);
        const invalidCount = validatedArtworks.filter(art => !art.validImage).length;
        
        if (invalidCount > 0) {
          toast.warning(`${invalidCount} artwork images could not be loaded properly.`, {
            description: "Using placeholder images instead."
          });
        }
      } catch (error) {
        console.error('Error loading artworks:', error);
        toast.error('Error loading artwork gallery', {
          description: "Please refresh the page to try again."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadArtworks();
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
        <meta property="og:image" content="/lovable-uploads/adcd076a-9326-426d-a0fa-d3b5ec6bb70f.png" />
      </Helmet>
      
      <section className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16 animate-scale-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-gotu">Gallery</h1>
            <p className="mt-3 md:mt-4 text-muted-foreground">
              A collection of paintings and mixed media artworks by Kassia Marin.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
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
          )}
          
          {!isLoading && artworkData.length === 0 && (
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
