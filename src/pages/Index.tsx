
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import ImageGallery from '@/components/ImageGallery';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const featuredImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80',
    alt: 'Vibrant orange flowers in close-up',
    title: 'Nature\'s Palette',
    year: '2023',
    medium: 'Oil on canvas',
    dimensions: '80 × 100 cm',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80',
    alt: 'Serene river landscape with mountains',
    title: 'Mountain Stream',
    year: '2022',
    medium: 'Acrylic on canvas',
    dimensions: '60 × 90 cm',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    alt: 'Pine trees in a forest',
    title: 'Forest Whispers',
    year: '2021',
    medium: 'Mixed media',
    dimensions: '70 × 100 cm',
  },
];

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      
      <section className="py-20 bg-secondary">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-sm uppercase tracking-widest text-muted-foreground">Featured Works</span>
              <h2 className="text-3xl md:text-4xl font-medium mt-2">Recent Creations</h2>
            </div>
            <Link 
              to="/gallery" 
              className="group flex items-center text-sm font-medium mt-4 md:mt-0 hover:opacity-70 transition-opacity"
            >
              View all works 
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <ImageGallery images={featuredImages} />
        </div>
      </section>
      
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-muted-foreground">About Me</span>
              <h2 className="text-3xl md:text-4xl font-medium mt-2">Kassia Marin</h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  As a contemporary visual artist, I explore themes of memory, transformation, and the fragility of experience.
                  My work blends personal narratives with abstract expression, translating fleeting memories and emotions into tangible forms.Through painting, text, and mixed media, I examine how time shapes our recollections and the tension between presence and absence. By layering materials and incorporating text, I invite viewers to reflect on their own connections to memory and identity.
                  
                </p>
                In a world dominated by digital experiences, I believe in the enduring power of material art to foster introspection and authentic connection.
                <p>
               
                </p>
              </div>
              <Link 
                to="/about" 
                className="inline-block mt-8 px-6 py-2 border border-foreground rounded-full hover:bg-foreground/5 transition-colors"
              >
                Read More
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -bottom-6 -left-6 w-3/4 h-3/4 bg-accent -z-10"></div>
              <img 
                src="https://dl.dropboxusercontent.com/s/fi/e9m3o8jrdfqu2f7npi4u4/IMG_20210428_194746.jpg?rlkey=um38ypc42lecml4t5bghlqffp&st=7kcl5mdy&dl=0" 
                alt="Kassia Marin in her studio" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-foreground text-background">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-medium">Interested in collaborating?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-background/80">
            I'm open to exhibitions, commissions, and creative partnerships. 
            Let's create something meaningful together.
          </p>
          <Link 
            to="/contact" 
            className="mt-8 inline-block px-8 py-3 rounded-full bg-background text-foreground font-medium hover:bg-background/90 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
