import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ExternalLink } from 'lucide-react';
import { previousProjects } from '@/data/projectsData';
import ProjectTeaser from '@/components/ProjectTeaser';
import { artworks } from '@/data/artworkData';
import ArtworkCard from '@/components/ArtworkCard';
import ArtworkDetails from '@/components/ArtworkDetails';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  // Get up to 3 projects for the teaser section
  const featuredProjects = previousProjects.slice(0, 3);

  // Get up to 4 artworks for the gallery teaser
  const featuredArtworks = artworks.slice(0, 4);
  console.log("Featured artworks:", featuredArtworks.length);

  // State for artwork preview
  const [selectedArtwork, setSelectedArtwork] = React.useState(null);
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  const handleArtworkClick = artwork => {
    setSelectedArtwork(artwork);
    setDetailsOpen(true);
  };

  // News and upcoming projects data
  const newsItems = [
    {
      id: 1,
      title: "🎉 WORKSHOP PÅMELDING ÅPEN!",
      description: "Meld deg på flisekunst workshop nå! 5.-27. juli 2025",
      date: "Juli 2025",
      type: "PÅMELDING ÅPEN",
      link: "/workshop",
      image: "https://dl.dropboxusercontent.com/s/fi/v7898buwxsnii80zcov39/FLYER_A6_kunstworkshop-001-Website-2.png?rlkey=a4abjraqyrlbmeqov72utlh86&st=pa06yrir&dl=0",
      urgent: true
    },
    {
      id: 2,
      title: "Åpning: Bærebjelke | Kassia Marin",
      description: "4. Juli 2025 kl18:00-kl20:00",
      date: "Juli 2025",
      type: "Solo utstilling",
      link: "https://fb.me/e/6fWiLUCkx",
      image: "https://dl.dropboxusercontent.com/s/fi/90h5p4s805f0nz3vn2vm8/Plakat_Ferdig_A3_B-rebjelke-Facebook-Ad.png?rlkey=64f3quxd84oqr83lu69ng4cns&st=u6puotvv&dl=0"
    },
    {
      id: 3,
      title: "Bærebjelke | Kassia Marin",
      description: "5. juli - 27. juli 2025 kl.12:00-15:00",
      date: "Juli 2025",
      type: "Solo utstilling",
      link: "https://fb.me/e/6h1vhJtIm",
      image: "https://dl.dropboxusercontent.com/s/fi/90h5p4s805f0nz3vn2vm8/Plakat_Ferdig_A3_B-rebjelke-Facebook-Ad.png?rlkey=64f3quxd84oqr83lu69ng4cns&st=u6puotvv&dl=0"
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Kassia Marin - Contemporary Visual Artist Based in Oslo</title>
        <meta name="description" content="Kassia Marin is a Norwegian contemporary visual artist working with painting, text, and video to explore memory and identity. Browse her portfolio and gallery." />
        <meta name="keywords" content="Kassia Marin, Norwegian artist, contemporary art, Oslo artist, painting, visual art, mixed media artist" />
        <link rel="canonical" href="https://kassiamarin.studio/" />
        <meta property="og:title" content="Kassia Marin - Contemporary Visual Artist Based in Oslo" />
        <meta property="og:description" content="Explore the contemporary artwork of Kassia Marin, Norwegian visual artist working with painting, text, and video." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kassiamarin.studio/" />
        <meta property="og:image" content="/lovable-uploads/824ccf0a-639d-4a60-a427-5e5c4686f385.png" />
      </Helmet>
      
      <HeroSection />
      
      {/* Workshop Registration Banner */}
      <section className="py-8 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-bounce mb-2">
              <span className="text-2xl">🎉</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Workshop påmelding er åpen!</h2>
            <p className="text-lg mb-4">Flisekunst workshop for barn og unge - Juli 2025</p>
            <Link 
              to="/workshop" 
              className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Meld deg på nå!
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="py-20 bg-beige-50/50 paper-texture">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div className="text-left">
              <span className="text-sm uppercase tracking-widest text-muted-foreground">Featured Artworks</span>
              <h2 className="text-3xl md:text-4xl font-medium mt-2 text-left">Gallery</h2>
            </div>
            <Link to="/gallery" className="group flex items-center text-sm font-medium mt-4 md:mt-0 hover:opacity-70 transition-opacity">
              Explore Gallery 
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredArtworks.slice(0, 3).map((artwork, index) => (
              <div 
                key={artwork.id} 
                className="relative transition-all duration-300 hover:-translate-y-1 bg-beige-100/60 rounded-lg p-4" 
                style={{
                  opacity: 0,
                  animation: `scaleIn 0.6s ease-out forwards`,
                  animationDelay: `${index * 100}ms`
                }}
              >
                <ArtworkCard 
                  artwork={artwork} 
                  onClick={handleArtworkClick} 
                  className="transition-transform duration-300 h-full bg-transparent shadow-none" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News and Upcoming Projects Section */}
      <section className="py-20 bg-beige-100/40 paper-texture">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div className="text-left">
              <span className="text-sm uppercase tracking-widest text-muted-foreground">Oppdateringer</span>
              <h2 className="text-3xl md:text-4xl font-medium mt-2 text-left">Nyheter eller kommende prosjekter</h2>
            </div>
          </div>
          
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-6 pb-4">
              {newsItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`w-80 flex-shrink-0 group relative transition-all duration-300 hover:-translate-y-1 rounded-lg p-4 ${
                    item.urgent ? 'bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-300' : 'bg-beige-100/60'
                  }`}
                  style={{
                    opacity: 0,
                    animation: `scaleIn 0.6s ease-out forwards`,
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  {item.urgent && (
                    <div className="absolute -top-2 -right-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      ÅPEN NÅ!
                    </div>
                  )}
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden border-none shadow-none bg-transparent">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 w-full p-4">
                          {item.link && (
                            item.link.startsWith('http') ? (
                              <a 
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white text-xs hover:underline flex items-center"
                              >
                                Les mer <ExternalLink size={12} className="ml-1" />
                              </a>
                            ) : (
                              <Link 
                                to={item.link}
                                className="text-white text-xs hover:underline flex items-center"
                              >
                                {item.urgent ? 'MELD PÅ NÅ!' : 'Les mer'} <ExternalLink size={12} className="ml-1" />
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-2 bg-transparent text-left">
                      <div className="flex items-center mb-2">
                        <span className={`text-xs uppercase tracking-wider ${item.urgent ? 'text-green-600 font-bold' : 'text-muted-foreground'}`}>
                          {item.type}
                        </span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className={`text-sm font-medium mb-2 text-left ${item.urgent ? 'text-green-700' : ''}`}>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="bg-transparent text-left">
                      <CardDescription className="text-xs text-muted-foreground line-clamp-2 text-left">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="py-20 bg-beige-50/50 paper-texture">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div className="text-left">
              <span className="text-sm uppercase tracking-widest text-muted-foreground">Featured Works</span>
              <h2 className="text-3xl md:text-4xl font-medium mt-2 text-left">Recent Projects</h2>
            </div>
            <Link to="/portfolio" className="group flex items-center text-sm font-medium mt-4 md:mt-0 hover:opacity-70 transition-opacity">
              View Portfolio 
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="bg-beige-100/60 rounded-lg p-4 transition-all duration-300 hover:-translate-y-1"
                style={{
                  opacity: 0,
                  animation: `scaleIn 0.6s ease-out forwards`,
                  animationDelay: `${index * 100}ms`
                }}
              >
                <ProjectTeaser project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Artwork details dialog */}
      <ArtworkDetails 
        artwork={selectedArtwork} 
        allArtworks={featuredArtworks} 
        open={detailsOpen} 
        onOpenChange={setDetailsOpen} 
      />
    </Layout>
  );
};

export default Index;
