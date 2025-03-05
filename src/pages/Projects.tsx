
import React from 'react';
import Layout from '@/components/Layout';
import { ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  year: string;
  location: string;
  imageSrc: string;
  url?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Nature Reimagined',
    description: 'A solo exhibition exploring the relationship between humans and the natural world through mixed media installations and paintings.',
    year: '2023',
    location: 'Contemporary Art Gallery, Oslo',
    imageSrc: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
  {
    id: 2,
    title: 'Urban Fragments',
    description: 'A collaborative exhibition examining the textures and patterns of urban environments through photography and abstract painting.',
    year: '2022',
    location: 'City Arts Center, Bergen',
    imageSrc: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Ephemeral Moments',
    description: 'A multimedia installation capturing fleeting moments of beauty in everyday life, featuring video projections and sound design.',
    year: '2021',
    location: 'International Arts Festival, Stockholm',
    imageSrc: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
];

const Projects = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16 animate-fade-in">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">Exhibitions & Collaborations</span>
            <h1 className="text-4xl md:text-5xl font-medium mt-2">Projects</h1>
            <p className="mt-4 text-muted-foreground">
              A curated selection of exhibitions, collaborations, and commissioned works 
              from throughout my artistic career.
            </p>
          </div>
          
          <div className="space-y-20">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center animate-fade-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-full lg:w-1/2 aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.imageSrc} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center">
                    <span className="text-sm uppercase tracking-widest text-muted-foreground">{project.year}</span>
                    <span className="mx-3 text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{project.location}</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-medium mt-2">{project.title}</h2>
                  
                  <p className="mt-4 text-muted-foreground">
                    {project.description}
                  </p>
                  
                  {project.url && (
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-6 text-sm font-medium hover:opacity-70 transition-opacity"
                    >
                      View Project <ExternalLink size={16} className="ml-2" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
