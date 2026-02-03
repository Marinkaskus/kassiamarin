import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { artworks } from '@/data/artworkData';
import MasonryGallery from '@/components/MasonryGallery';
import ArtworkDetails from '@/components/ArtworkDetails';
import { Artwork } from '@/types/Artwork';
import { Input } from '@/components/ui/input';
import { X, Search } from 'lucide-react';

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [artworkData, setArtworkData] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setArtworkData(artworks);
    setFilteredArtworks(artworks);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const result = artworkData.filter(artwork =>
        artwork.title.toLowerCase().includes(term) ||
        artwork.medium.toLowerCase().includes(term) ||
        artwork.year.toLowerCase().includes(term)
      );
      setFilteredArtworks(result);
    } else {
      setFilteredArtworks(artworkData);
    }
  }, [searchTerm, artworkData]);

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setDetailsOpen(true);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
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
          <div className="max-w-2xl mx-auto text-center mb-8 md:mb-12 animate-scale-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-gotu">Gallery</h1>
            <p className="mt-3 md:mt-4 text-muted-foreground">
              A collection of paintings and mixed media artworks.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8 md:mb-12 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search artworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchTerm && (
                <button onClick={handleClearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              )}
            </div>
          </div>

          {/* Masonry Gallery */}
          {filteredArtworks.length > 0 ? (
            <MasonryGallery
              artworks={filteredArtworks}
              onArtworkClick={handleArtworkClick}
            />
          ) : (
            <div className="text-center py-12 border rounded-md bg-muted/10">
              <p className="text-muted-foreground mb-2">No artworks found.</p>
              <button
                onClick={handleClearSearch}
                className="text-sm text-primary underline underline-offset-4 hover:text-primary/80"
              >
                Clear search
              </button>
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
