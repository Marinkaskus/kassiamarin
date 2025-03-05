
import React from 'react';
import Layout from '@/components/Layout';
import { ExternalLink, Footprints, Eye, Heart } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  norwegianDescription?: string;
  year: string;
  location: string;
  imageSrc: string | string[];
  url?: string;
  icons?: React.ReactNode[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Jeg tenker ikke på dere lenger',
    description: 'An area covered with tiles. The floor you walk on is decorated with immersive, varied, and fragile paintings that flow in and out of each other. The paintings tell stories of memories, dreams, and nightmares – everything that occurs in the world of thoughts, the sleepless nights when the only company you have is your own past and imagination. Through the act of walking on the tiles, the spectator changes the work and becomes part of it.',
    norwegianDescription: 'Et område dekket av fliser. Gulvet du går på er utsmykket med oppslukende, varierte og skjøre malerier, som flyter inn og ut av hverandre. Maleriene forteller om minner, drømmer og mareritt – alt som foregår i tankenes verden, de søvnløse nettene når det eneste selskapet man har er sin egen fortid og fantasi. Gjennom handlingen av å gå på flisene, forandrer tilskueren verket og blir en del av det.',
    year: '2023',
    location: 'Oslo Kunstforening',
    imageSrc: [
      'public/lovable-uploads/ddc9c4f8-9e66-43c5-960f-bb3ef6654f0e.png',
      'public/lovable-uploads/72a1caef-db2e-4c24-9441-916009cc5796.png'
    ],
    icons: [<Footprints key="footprints" size={18} />, <Eye key="eye" size={18} />, <Heart key="heart" size={18} />]
  },
  {
    id: 2,
    title: 'Nature Reimagined',
    description: 'A solo exhibition exploring the relationship between humans and the natural world through mixed media installations and paintings.',
    year: '2023',
    location: 'Contemporary Art Gallery, Oslo',
    imageSrc: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
  {
    id: 3,
    title: 'Urban Fragments',
    description: 'A collaborative exhibition examining the textures and patterns of urban environments through photography and abstract painting.',
    year: '2022',
    location: 'City Arts Center, Bergen',
    imageSrc: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
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
                  {Array.isArray(project.imageSrc) ? (
                    <div className="grid grid-cols-1 gap-4">
                      {project.imageSrc.map((src, i) => (
                        <img 
                          key={i}
                          src={src} 
                          alt={`${project.title} - Image ${i+1}`} 
                          className="w-full object-cover rounded-md"
                        />
                      ))}
                    </div>
                  ) : (
                    <img 
                      src={project.imageSrc} 
                      alt={project.title} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  )}
                </div>
                
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-sm uppercase tracking-widest text-muted-foreground">{project.year}</span>
                    <span className="mx-3 text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{project.location}</span>
                    
                    {project.icons && (
                      <div className="flex ml-auto gap-3">
                        {project.icons.map((icon, i) => (
                          <span key={i} className="text-muted-foreground">{icon}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-medium mt-2">{project.title}</h2>
                  
                  <p className="mt-4 text-muted-foreground">
                    {project.description}
                  </p>
                  
                  {project.norwegianDescription && (
                    <p className="mt-4 text-muted-foreground italic">
                      "{project.norwegianDescription}"
                    </p>
                  )}
                  
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
