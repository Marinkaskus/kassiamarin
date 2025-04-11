
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { artworks } from '@/data/artworkData';
import ArtworkCard from '@/components/ArtworkCard';
import ArtworkDetails from '@/components/ArtworkDetails';
import { Artwork } from '@/types/Artwork';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { X, Search, Filter } from 'lucide-react';

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [artworkData, setArtworkData] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const artworksPerPage = 9;

  // Load artworks from the data file
  useEffect(() => {
    console.log("Loading artworks:", artworks.length);
    setArtworkData(artworks);
    setFilteredArtworks(artworks);
  }, []);
  
  // Filter artworks based on search and category
  useEffect(() => {
    let result = artworkData;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(artwork => 
        artwork.title.toLowerCase().includes(term) || 
        artwork.medium.toLowerCase().includes(term) ||
        artwork.year.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (currentCategory !== 'all') {
      result = result.filter(artwork => artwork.category === currentCategory);
    }
    
    setFilteredArtworks(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, currentCategory, artworkData]);
  
  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setDetailsOpen(true);
  };
  
  const handleDetailsOpenChange = (open: boolean) => {
    setDetailsOpen(open);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };
  
  // Get all unique categories
  const categories = ['all', ...new Set(artworkData.map(artwork => artwork.category || 'Uncategorized'))];
  
  // Calculate pagination
  const indexOfLastArtwork = currentPage * artworksPerPage;
  const indexOfFirstArtwork = indexOfLastArtwork - artworksPerPage;
  const currentArtworks = filteredArtworks.slice(indexOfFirstArtwork, indexOfLastArtwork);
  const totalPages = Math.ceil(filteredArtworks.length / artworksPerPage);
  
  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
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
              A collection of paintings and mixed media artworks by Kassia Marin.
            </p>
          </div>
          
          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search artworks..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchTerm && (
                  <button 
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
              
              {/* Category Tabs */}
              <div className="w-full md:w-auto overflow-x-auto">
                <Tabs 
                  value={currentCategory} 
                  onValueChange={setCurrentCategory}
                  className="w-full"
                >
                  <TabsList className="h-10">
                    {categories.map((category) => (
                      <TabsTrigger 
                        key={category} 
                        value={category}
                        className="capitalize"
                      >
                        {category === 'all' ? 'All Works' : category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
          
          {/* Artworks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {currentArtworks.map((artwork, index) => (
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
          
          {/* Empty State */}
          {filteredArtworks.length === 0 && (
            <div className="text-center py-12 border rounded-md bg-muted/10">
              <p className="text-muted-foreground mb-2">No artworks found.</p>
              <Button variant="outline" onClick={() => { setSearchTerm(''); setCurrentCategory('all'); }}>
                Clear filters
              </Button>
            </div>
          )}
          
          {/* Pagination */}
          {filteredArtworks.length > artworksPerPage && (
            <Pagination className="mt-10">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {pageNumbers.map(number => (
                  <PaginationItem key={number}>
                    <PaginationLink
                      onClick={() => setCurrentPage(number)}
                      isActive={currentPage === number}
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
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
