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
  const newsItems = [{
    id: 1,
    title: "Åpning: Bærebjelke | Kassia Marin",
    description: "4. Juli 2025 kl18:00-kl20:00",
    date: "Juli 2025",
    type: "Solo utstilling",
    link: "https://fb.me/e/6fWiLUCkx",
    image: "https://dl.dropboxusercontent.com/s/fi/90h5p4s805f0nz3vn2vm8/Plakat_Ferdig_A3_B-rebjelke-Facebook-Ad.png?rlkey=64f3quxd84oqr83lu69ng4cns&st=u6puotvv&dl=0"
  }, {
    id: 2,
    title: "Bærebjelke | Kassia Marin",
    description: "5. juli - 27. juli 2025 kl.12:00-15:00",
    date: "Juli 2025",
    type: "Solo utstilling",
    link: "https://fb.me/e/6h1vhJtIm",
    image: "https://dl.dropboxusercontent.com/s/fi/90h5p4s805f0nz3vn2vm8/Plakat_Ferdig_A3_B-rebjelke-Facebook-Ad.png?rlkey=64f3quxd84oqr83lu69ng4cns&st=u6puotvv&dl=0"
  }];
  return <Layout>
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
      

      {/* News and Upcoming Projects Section */}
      
      
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
            {featuredProjects.map((project, index) => <div key={project.id} className="bg-beige-100/60 rounded-lg p-4 transition-all duration-300 hover:-translate-y-1" style={{
            opacity: 0,
            animation: `scaleIn 0.6s ease-out forwards`,
            animationDelay: `${index * 100}ms`
          }}>
                <ProjectTeaser project={project} />
              </div>)}
          </div>
        </div>
      </section>
      
      {/* Artwork details dialog */}
      <ArtworkDetails artwork={selectedArtwork} allArtworks={featuredArtworks} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </Layout>;
};
export default Index;