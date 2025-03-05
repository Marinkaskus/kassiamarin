
import React from 'react';
import Layout from '@/components/Layout';
import { ExternalLink, Footprints } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  year: string;
  location: string;
  imageSrc: string;
  additionalImages?: string[];
  url?: string;
  norwegianDescription?: string;
}

// Combined list of all previous projects
const previousProjects = [
  {
    id: 4,
    title: 'Jeg tenker ikke på dere lenger',
    description: 'An area covered with tiles. The floor you walk on is decorated with immersive, varied, and fragile paintings that flow in and out of each other. The paintings tell stories of memories, dreams, and nightmares – everything that takes place in the world of thoughts, the sleepless nights when the only company one has is their own past and imagination. Through the act of walking on the tiles, the viewer changes the work and becomes a part of it.',
    norwegianDescription: 'Et område dekket av fliser. Gulvet du går på er utsmykket med oppslukende, varierte og skjøre malerier, som flyter inn og ut av hverandre. Maleriene forteller om minner, drømmer og mareritt – alt som foregår i tankenes verden, de søvnløse nettene når det eneste selskapet man har er sin egen fortid og fantasi. Gjennom handlingen av å gå på flisene, forandrer tilskueren verket og blir en del av det.',
    year: '2020',
    location: 'Oslo Kunsthall',
    imageSrc: '/lovable-uploads/e9b9ccf2-3848-4e6c-b3b8-355ecc19d86a.png',
    additionalImages: [
      '/lovable-uploads/07247a31-eeb0-4255-8104-4f83cceefd72.png', 
      '/lovable-uploads/c3d9c883-d45d-4f54-a15e-048158033c3d.png'
    ],
    url: '#',
  },
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
  {
    id: 5,
    title: 'Fragments of Memory',
    description: 'An exploration of the fragility of memory through a series of fragmented photographs and text-based installations.',
    year: '2019',
    location: 'Nordic Arts Festival, Copenhagen',
    imageSrc: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Echoes of Light',
    description: 'A light-based installation exploring the interplay between natural and artificial light sources in enclosed spaces.',
    year: '2018',
    location: 'Modern Art Museum, Gothenburg',
    imageSrc: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
  {
    id: 7,
    title: 'Beneath the Surface',
    description: 'A mixed media exhibition examining the hidden layers of urban landscapes and architectural structures.',
    year: '2017',
    location: 'Contemporary Arts Space, Oslo',
    imageSrc: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80',
  },
];

const Projects = () => {
  // Log for debugging
  console.log("Project images:", previousProjects.length > 0 ? previousProjects[0].imageSrc : "No projects");
  
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16 animate-fade-in">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">Previous Works</span>
            <h1 className="text-4xl md:text-5xl font-medium mt-2">Previous Projects</h1>
            <p className="mt-4 text-muted-foreground">
              A curated selection of my past exhibitions, collaborations, and commissioned works 
              from throughout my artistic career.
            </p>
          </div>
          
          <div className="space-y-20">
            {previousProjects.map((project, index) => {
              console.log(`Rendering project ${project.id} with image: ${project.imageSrc}`);
              return (
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
                      onError={(e) => {
                        console.error(`Failed to load image: ${project.imageSrc}`);
                        e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                      }}
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
                    
                    {project.norwegianDescription && (
                      <p className="mt-3 text-muted-foreground italic">
                        {project.norwegianDescription}
                      </p>
                    )}
                    
                    {project.additionalImages && project.additionalImages.length > 0 && (
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        {project.additionalImages.map((img, i) => (
                          <img 
                            key={i} 
                            src={img} 
                            alt={`${project.title} - additional view ${i+1}`}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              console.error(`Failed to load additional image: ${img}`);
                              e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                            }}
                          />
                        ))}
                      </div>
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
                    
                    {project.id === 4 && (
                      <div className="mt-4 flex items-center text-muted-foreground">
                        <Footprints size={16} className="mr-2" />
                        <span className="text-sm italic">Interactive installation where viewers become part of the artwork</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
