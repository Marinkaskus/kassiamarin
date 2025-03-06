
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { artworks, artworkCategories, getArtworksByCategory } from '@/data/artworkData';
import ArtworkCard from '@/components/ArtworkCard';
import ArtworkDetails from '@/components/ArtworkDetails';
import { Artwork } from '@/types/Artwork';
import { ImagePlus } from 'lucide-react';

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredArtworks = getArtworksByCategory(activeCategory);
  
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
            
            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {artworkCategories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                    activeCategory === category 
                      ? 'bg-foreground text-background' 
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArtworks.map((artwork, index) => (
              <ArtworkCard 
                key={artwork.id}
                artwork={artwork}
                onClick={handleArtworkClick}
                className={`animate-fade-in-up [animation-delay:${index * 100}ms]`}
              />
            ))}
            
            {/* Placeholder for uploading new artwork */}
            <div 
              className="aspect-[3/4] border-2 border-dashed border-muted rounded-md flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-secondary/50 transition-colors animate-fade-in-up [animation-delay:600ms]"
              onClick={() => alert("To add new artwork, edit the artworkData.ts file.")}
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Add New Artwork</h3>
              <p className="text-sm text-muted-foreground">Upload a new painting or print to your gallery</p>
            </div>
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
