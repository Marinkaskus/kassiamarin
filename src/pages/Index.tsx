
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { previousProjects } from '@/data/projectsData';
import ProjectTeaser from '@/components/ProjectTeaser';
import { artworks } from '@/data/artworkData';
import ArtworkCard from '@/components/ArtworkCard';
import ArtworkDetails from '@/components/ArtworkDetails';
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
            {featuredArtworks.slice(0, 3).map((artwork, index) => <div key={artwork.id} className="relative transition-all duration-300 hover:-translate-y-1" style={{
            opacity: 0,
            animation: `scaleIn 0.6s ease-out forwards`,
            animationDelay: `${index * 100}ms`
          }}>
                <ArtworkCard artwork={artwork} onClick={handleArtworkClick} className="transition-transform duration-300 h-full" />
              </div>)}
          </div>
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
            {featuredProjects.map(project => <ProjectTeaser key={project.id} project={project} />)}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-muted-foreground">About Me</span>
              <h2 className="text-3xl md:text-4xl font-medium mt-2">Kassia Marin</h2>
              <div className="mt-4 space-y-2 text-muted-foreground">
                <p>
                <strong>Kassia Marin</strong> is a contemporary visual artist based in Oslo. 
                She is a multidisciplinary artist. Her practice involves painting, video, and mixed media, often incorporating text.
                Her work explores themes of memory, transformation, and the fragility of experience, focusing on how personal narratives and emotions are expressed through tangible forms. 
                Kassia examines the passage of time and the tension between presence and absence, reflecting on how memories shape identity. In a world increasingly dominated by digital media, she believes in the enduring power of material art to foster introspection and genuine connection.</p>
              </div>
              <Link to="/about" className="inline-block mt-8 px-6 py-2 border border-foreground rounded-full hover:bg-foreground/5 transition-colors">CV</Link>
            </div>
            <div className="relative">
              <div className="absolute -bottom-6 -left-6 w-3/4 h-3/4 bg-accent -z-10"></div>
              <img src="https://dl.dropboxusercontent.com/s/fi/88f2ddqseerh4h98t12i8/20230919_113701.jpg?rlkey=usum14gsmbbwz057jrd83zz90&st=559y6b5o&dl=0" alt="Kassia Marin in her studio" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 text-background bg-red-950">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-medium">Interested in collaborating?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-background/80">
            I'm open to exhibitions, commissions, and creative partnerships. 
            Let's create something meaningful together.
          </p>
          <Link to="/contact" className="mt-8 inline-block px-8 py-3 rounded-full bg-background text-foreground font-medium hover:bg-background/90 transition-colors">
            Get in Touch
          </Link>
        </div>
      </section>
      
      {/* Artwork details dialog */}
      <ArtworkDetails artwork={selectedArtwork} allArtworks={featuredArtworks} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </Layout>;
};
export default Index;
