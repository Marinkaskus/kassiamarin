import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { ExternalLink, Footprints, ChevronLeft, ChevronRight, Play, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from '@/components/ui/use-toast';
import ImageUploadHelper from '@/components/ImageUploadHelper';

interface Project {
  id: number;
  title: string;
  description: string;
  year: string;
  location: string;
  imageSrc: string;
  additionalImages?: string[];
  videoUrl?: string;
  url?: string;
  norwegianDescription?: string;
}

const previousProjects = [
  {
    id: 4,
    title: 'Jeg tenker ikke på dere lenger',
    description: 'An area covered with tiles. The floor you walk on is decorated with immersive, varied, and fragile paintings that flow in and out of each other. The paintings tell stories of memories, dreams, and nightmares – everything that takes place in the world of thoughts, the sleepless nights when the only company one has is their own past and imagination. Through the act of walking on the tiles, the viewer changes the work and becomes a part of it.',
    norwegianDescription: 'Et område dekket av fliser. Gulvet du går på er utsmykket med oppslukende, varierte og skjøre malerier, som flyter inn og ut av hverandre. Maleriene forteller om minner, drømmer og mareritt – alt som foregår i tankenes verden, de søvnløse nettene når det eneste selskapet man har er sin egen fortid og fantasi. Gjennom handlingen av å gå på flisene, forandrer tilskueren verket og blir en del av det.',
    year: '2024',
    location: 'Oslo kunstforening',
    imageSrc: 'https://storage.googleapis.com/gpt-engineer-file-uploads/XDmtjvK23Va49uZSa12BUDRhgQn1/594a040b-2ac9-46c2-832f-ce65c7bcff84?Expires=1741193746&GoogleAccessId=admin-2%40gpt-engineer-390607.iam.gserviceaccount.com&Signature=HwUcR6RPk%2FTLVxhvE0m60%2B%2FLtYb7874Ph7qKg3%2FqApExfaJzjNofHZvld66YgZsTsZuMkgOY1SknHr1SqDhwrWIxQMe9ws0vBISL3Eq0GAkPqxNMtM1jM%2F6VZNBa6oKutLVKO3edTYTf%2FMGCsvTe%2FjrUY9C%2B2HwhilqCLvyW5iZJ39n%2Fz9eHK8Pq9V3qI6Z%2FsA016t1gL4MaWQH6JAKULSJ3LbmY7qho18CNP8ft7AWvJ8XdBmwvw7%2FezBh8xzJP7hqyryAcDdJh5SlwNQGfWCCmJ1Eb8YLi8zu4KVY0AudDEgnBlkQfrThWzFSin3BJ7wo2wsEYkH6Bsh3iHbIhPg%3D%3D',
    additionalImages: [
      'https://storage.googleapis.com/gpt-engineer-file-uploads/XDmtjvK23Va49uZSa12BUDRhgQn1/f2efb2f2-ce9b-48ab-8be5-a9d35626f1bc?Expires=1741193746&GoogleAccessId=admin-2%40gpt-engineer-390607.iam.gserviceaccount.com&Signature=qt6fNYOSS31IcmF3RTwZ4b97YqI0yF3MvCJ0nD9yPNyv%2BlrC650Nl0Gd4wHVTR%2Fw4FFvz4FegBZCpmlbyZ5duERH3xV%2BOp5j%2Fj9cMLIpYSf4UIFUuQ%2FaahS5ljfOj0aZarxSsTmJsXHcjF7rB0GeHzOu1Bp5TisJ15hWP4YHNoLwqCduCAkhFe%2BX1jun%2FPZ0J5VfEsRU5KlBoNQ3i6bPM1M%2FJG%2FnjbWsZbAXEMby7wtR6ZI6lovfFHsJ0LGyZB7CtbywrNQPEy8OE%2BucnwHuETLzWk%2BpF6m%2FeiwxkxBpigKLF8AQuWFm9y91AYN9zbYc4oMGZDhAG0V5lXybSFap5w%3D%3D', 
      'https://storage.googleapis.com/gpt-engineer-file-uploads/XDmtjvK23Va49uZSa12BUDRhgQn1/13dd4769-1557-4729-999f-639f146f9e82?Expires=1741193746&GoogleAccessId=admin-2%40gpt-engineer-390607.iam.gserviceaccount.com&Signature=e3aivECa4KMqf96mCCIgrct4%2BABeEtLGsgX%2Bi9tj0lf%2FMZbMizh7y0k23d7l%2FJO9y36NRTvm6iH0ER1WYNPZLmFixZzIHqI0gpEYJWOV9y0RfBo%2BeLxfMlgkfogRT7YJAf%2FtYIbbjRcCGl2wJ3oTx96POw0P0MUcyznuj16%2F1cW0wmbgUtFd%2BJKnYcQxnic9Yb9s%2BEmp%2FQFrM3XV1WwVMfcQ1%2Bk9jwzpcrKr40K0TyJHYBegRlhAdpaV2fxRj2jYQ%2FvqDc6lYkUQO4T%2FuSePI5W3zBVrucc7Ex93rq9L28WVAYauyT6o6%2BCvqifWI5BhUAFJ4e6BfWimJwFXkr77AQ%3D%3D'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    url: '#',
  },
  {
    id: 1,
    title: 'Nature Reimagined',
    description: 'A solo exhibition exploring the relationship between humans and the natural world through mixed media installations and paintings.',
    year: '2023',
    location: 'Contemporary Art Gallery, Oslo',
    imageSrc: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
    ],
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

const ImageCarousel = ({ images, title }: { images: string[], title: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleImageError = (imageSrc: string) => {
    console.error(`Failed to load image: ${imageSrc}`);
    setImageErrors(prev => ({...prev, [imageSrc]: true}));
  };

  // Filter out images that failed to load
  const validImages = images.filter(img => !imageErrors[img]);
  
  if (validImages.length === 0) {
    return (
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center">
        <div className="flex flex-col items-center text-muted-foreground gap-2">
          <AlertCircle size={24} />
          <p>Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden group">
      <img 
        src={validImages[currentImageIndex % validImages.length]} 
        alt={`${title} - image ${currentImageIndex + 1}`} 
        className="w-full h-full object-cover transition-opacity duration-300"
        onError={() => handleImageError(validImages[currentImageIndex % validImages.length])}
      />
      
      {validImages.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              className="bg-background/70 text-foreground p-2 rounded-full hover:bg-background/90 transition-colors"
              onClick={goToPrevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="bg-background/70 text-foreground p-2 rounded-full hover:bg-background/90 transition-colors"
              onClick={goToNextImage}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {validImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === (currentImageIndex % validImages.length) ? 'bg-primary' : 'bg-background/70'
                }`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Projects = () => {
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [showUploadHelper, setShowUploadHelper] = useState(true);
  const [customProjects, setCustomProjects] = useState<Project[]>([]);
  
  const openVideoDialog = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setVideoDialogOpen(true);
  };

  const handleImageUpload = (imagePath: string) => {
    // Create a test project with the uploaded image
    const newProject = {
      id: Date.now(), // Use timestamp as unique ID
      title: "Your New Project",
      description: "Description of your new project. Click to edit your projects.",
      year: new Date().getFullYear().toString(),
      location: "Your Location",
      imageSrc: imagePath,
    };
    
    setCustomProjects(prev => [...prev, newProject]);
    toast({
      title: "Image added successfully!",
      description: "Your image has been added as a new project.",
    });
    
    // Hide the upload helper after successful upload
    setShowUploadHelper(false);
  };
  
  // Combine custom and previous projects
  const allProjects = [...customProjects, ...previousProjects];
  
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

          {showUploadHelper && (
            <div className="mb-16 animate-fade-in">
              <ImageUploadHelper onImageUpload={handleImageUpload} />
              <div className="flex justify-center mt-4">
                <button 
                  onClick={() => setShowUploadHelper(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Hide this guide
                </button>
              </div>
            </div>
          )}
          
          <div className="space-y-20">
            {allProjects.map((project, index) => {
              const carouselImages = project.additionalImages 
                ? [project.imageSrc, ...project.additionalImages]
                : [project.imageSrc];
                
              return (
                <div 
                  key={project.id}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center animate-fade-in`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-full lg:w-1/2">
                    <ImageCarousel images={carouselImages} title={project.title} />
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
                    
                    <div className="mt-6 flex flex-wrap gap-4">
                      {project.url && (
                        <a 
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium hover:opacity-70 transition-opacity"
                        >
                          View Project <ExternalLink size={16} className="ml-2" />
                        </a>
                      )}
                      
                      {project.videoUrl && (
                        <button 
                          onClick={() => openVideoDialog(project.videoUrl!)}
                          className="inline-flex items-center text-sm font-medium hover:opacity-70 transition-opacity"
                        >
                          Watch Video <Play size={16} className="ml-2" />
                        </button>
                      )}
                    </div>
                    
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
      
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] p-0 overflow-hidden">
          <div className="aspect-video w-full">
            <iframe
              src={currentVideoUrl}
              title="Project Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Projects;
