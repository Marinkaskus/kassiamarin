import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import GalleryFlow from '@/components/GalleryFlow';
import ArtworkDetails from '@/components/ArtworkDetails';
import { Artwork } from '@/types/Artwork';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [artworkData, setArtworkData] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching artworks:', error);
        setIsLoading(false);
        return;
      }

      const mappedArtworks: Artwork[] = (data || []).map((item) => ({
        id: item.id,
        title: item.title,
        year: item.year || '',
        size: item.size || '',
        medium: item.medium || '',
        description: item.description || undefined,
        imageSrc: item.image_src || '',
        category: item.category || undefined,
        available: item.available ?? true,
        price: item.price || undefined,
      }));

      setArtworkData(mappedArtworks);
      setIsLoading(false);
    };

    fetchArtworks();
  }, []);

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setDetailsOpen(true);
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

      <section className="pt-20 sm:pt-24 md:pt-28 pb-16 md:pb-24 bg-background">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-4 md:mb-6 animate-scale-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-gotu">Gallery</h1>
            <p className="mt-3 md:mt-4 text-muted-foreground">
              A collection of paintings and mixed media artworks.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : artworkData.length > 0 ? (
            <GalleryFlow
              artworks={artworkData}
              onArtworkClick={handleArtworkClick}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No artworks yet.</p>
            </div>
          )}
        </div>
      </section>

      <ArtworkDetails
        artwork={selectedArtwork}
        allArtworks={artworkData}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </Layout>
  );
};

export default Gallery;
