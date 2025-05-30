
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
      title: "Flisekunst Workshop",
      description: "Kreativ workshop med fliser, fortellinger og fellesskapsarbeid. Påmelding åpner 10. juni 2025.",
      date: "Juli 2025",
      type: "Kommende workshop",
      link: "/workshop",
      image: "https://dl.dropboxusercontent.com/s/fi/hgvxx3mc37xsnftysfrrm/FLYER_A6_kunstworkshop-001-Website-1.png?rlkey=kd5sn5sum2duuwujtif2cwydt&st=eivwdr5h&dl=0"
    },
    {
      id: 2,
      title: "Bærebjelke",
      description: "Utstilling som åpner 4. juli 2025. Åpent alle dager frem til 27. juli, stengt på mandager.",
      date: "Juli 2025",
      type: "Kommende prosjekt",
      link: "https://fb.me/e/6fWiLUCkx",
      image: "https://dl.dropboxusercontent.com/s/fi/y7brrog0cnu85r57ljdq0/Plakat_Ferdig_A3_B-rebjelke-Website.png?rlkey=re6k6e8voivpbxlew4rxbca93&st=57szrrzo&dl=0"
    },
    {
      id: 3,
      title: "Kunstnerstipend mottatt",
      description: "Kassia har mottatt støtte til videre utvikling av sitt kunstneriske arbeid gjennom 2025.",
      date: "Januar 2025",
      type: "Nyheter",
      image: "https://dl.dropboxusercontent.com/s/fi/mouik1soo1yaoflt186dp/Logo.png?rlkey=e1ua3zw7f1i9ikvj24b6fxswl&st=h4na5yc9&dl=0"
    },
    {
      id: 4,
      title: "Samarbeidsprosjekt",
      description: "Planlegging av et tverrfaglig samarbeidsprosjekt med andre kunstnere og kulturaktører i Oslo.",
      date: "Høst 2025",
      type: "Kommende prosjekt",
      image: "https://dl.dropboxusercontent.com/s/fi/exqofds6tq0pkqsp2uf0p/2L5A5990.JPG?rlkey=2ujtknbudpg8hsod15zevcipd&st=tjnh5vvh&dl=0"
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
      
      {/* Gallery Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-sm uppercase tracking-widest text-muted-foreground">Featured Artworks</span>
              <h2 className="text-3xl md:text-4xl font-medium mt-2">Gallery</h2>
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
        </div>
      </section>

      {/* News and Upcoming Projects Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="mb-12">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">Oppdateringer</span>
            <h2 className="text-3xl md:text-4xl font-medium mt-2">Nyheter eller kommende prosjekter</h2>
          </div>
          
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-6 pb-4">
              {newsItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="w-80 flex-shrink-0 group relative transition-all duration-300 hover:-translate-y-1"
                  style={{
                    opacity: 0,
                    animation: `scaleIn 0.6s ease-out forwards`,
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
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
                                className="text-white text-sm hover:underline flex items-center"
                              >
                                Les mer <ExternalLink size={14} className="ml-1" />
                              </a>
                            ) : (
                              <Link 
                                to={item.link}
                                className="text-white text-sm hover:underline flex items-center"
                              >
                                Les mer <ExternalLink size={14} className="ml-1" />
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-1 rounded">
                          {item.type}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
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
      <section className="py-20 bg-secondary">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-sm uppercase tracking-widest text-muted-foreground">Featured Works</span>
              <h2 className="text-3xl md:text-4xl font-medium mt-2">Recent Projects</h2>
            </div>
            <Link to="/portfolio" className="group flex items-center text-sm font-medium mt-4 md:mt-0 hover:opacity-70 transition-opacity">
              View Portfolio 
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <ProjectTeaser key={project.id} project={project} />
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
