import React, { useState } from 'react';
import { Footprints, ExternalLink, Play, VideoOff, Moon, ZoomIn, ArrowLeft, ArrowRight, X } from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import { Project } from '@/types/Project';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProjectCardProps {
  project: Project;
  index: number;
  onVideoPlay: (videoUrl: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onVideoPlay }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const isChildrenProject = project.id === 8;
  const isInsomniaProject = project.id === 9;
  const isTidskapselProject = project.id === 7;
  const isLivetsTreeProject = project.id === 6;
  const isDagdromProject = project.id === 10;
  const isArachneProject = project.id === 5;
  const isPlayDateProject = project.id === 11;
  const isJegTenkerProject = project.id === 4;
  
  const hasVideoFeature = (isChildrenProject || isInsomniaProject || isTidskapselProject || 
                          isLivetsTreeProject || isDagdromProject) && !isPlayDateProject;
  
  let carouselImages = [project.imageSrc];
  
  if (project.additionalImages && project.additionalImages.length > 0 && !isPlayDateProject) {
    carouselImages = project.additionalImages;
  }
  
  const handleVideoThumbnailClick = () => {
    if (hasVideoFeature && project.videoUrl) {
      setShowVideo(true);
      setVideoError(false);
    }
  };

  const handlePlayInDialog = () => {
    if (project.videoUrl) {
      onVideoPlay(project.videoUrl);
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    toast({
      title: "Video playback issue",
      description: "The video couldn't be loaded. Please try again later.",
      variant: "destructive"
    });
  };

  const handleImageClick = (imageSrc: string, idx: number) => {
    if (imageSrc.startsWith('video:')) return;
    
    setEnlargedImage(imageSrc);
    setCurrentImageIndex(idx);
  };
  
  const handlePreviousImage = () => {
    if (!project.additionalImages) return;
    
    const newIndex = (currentImageIndex - 1 + project.additionalImages.length) % project.additionalImages.length;
    if (project.additionalImages[newIndex].startsWith('video:')) {
      const prevIndex = (newIndex - 1 + project.additionalImages.length) % project.additionalImages.length;
      setCurrentImageIndex(prevIndex);
      setEnlargedImage(project.additionalImages[prevIndex]);
    } else {
      setCurrentImageIndex(newIndex);
      setEnlargedImage(project.additionalImages[newIndex]);
    }
  };
  
  const handleNextImage = () => {
    if (!project.additionalImages) return;
    
    const newIndex = (currentImageIndex + 1) % project.additionalImages.length;
    if (project.additionalImages[newIndex].startsWith('video:')) {
      const nextIndex = (newIndex + 1) % project.additionalImages.length;
      setCurrentImageIndex(nextIndex);
      setEnlargedImage(project.additionalImages[nextIndex]);
    } else {
      setCurrentImageIndex(newIndex);
      setEnlargedImage(project.additionalImages[newIndex]);
    }
  };
  
  return (
    <div 
      className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center animate-fade-in`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="w-full lg:w-1/2">
        {hasVideoFeature ? (
          showVideo && project.videoUrl ? (
            <div className="w-full aspect-video mb-4 relative">
              {videoError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-muted p-8 text-center">
                  <VideoOff size={48} className="text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">Video playback error</p>
                  <button 
                    className="text-sm underline text-primary hover:text-primary/80"
                    onClick={() => {
                      setVideoError(false);
                      setShowVideo(false);
                    }}
                  >
                    Return to thumbnail
                  </button>
                </div>
              ) : (
                <iframe
                  src={project.videoUrl}
                  title={`${project.title} Video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                  onError={handleVideoError}
                ></iframe>
              )}
            </div>
          ) : (
            <div 
              className="w-full aspect-[4/3] overflow-hidden relative group cursor-pointer" 
              onClick={handleVideoThumbnailClick}
            >
              <img 
                src={project.imageSrc}
                alt={project.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-background/80 rounded-full p-4">
                  <img 
                    src="https://dl.dropboxusercontent.com/s/fi/mouik1soo1yaoflt186dp/Logo.png?rlkey=e1ua3zw7f1i9ikvj24b6fxswl&st=h4na5yc9&dl=0" 
                    alt="Kassia Marin Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
            </div>
          )
        ) : (
          <ImageCarousel 
            images={carouselImages} 
            title={project.title} 
            autoPlay={true}
            interval={6000}
          />
        )}
      </div>
      
      <div className="w-full lg:w-1/2">
        <div className="flex items-center">
          <span className="text-sm uppercase tracking-widest text-muted-foreground">{project.year}</span>
          {project.location && (
            <>
              <span className="mx-3 text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{project.location}</span>
            </>
          )}
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
          {project.url && project.id !== 4 && (
            <a 
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium hover:opacity-70 transition-opacity"
            >
              View Project <ExternalLink size={16} className="ml-2" />
            </a>
          )}
          
          {(hasVideoFeature || isPlayDateProject) && project.videoUrl && (
            <button
              onClick={handlePlayInDialog}
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
        
        {isInsomniaProject && (
          <div className="mt-4 flex items-center text-muted-foreground">
            <Moon size={16} className="mr-2" />
            <span className="text-sm italic">A diary of sleepless nights presented through video and sound</span>
          </div>
        )}
        
        {isChildrenProject && project.additionalImages && project.additionalImages.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3">Project Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {project.additionalImages.map((image, idx) => (
                <div 
                  key={idx} 
                  className="aspect-square overflow-hidden rounded-md cursor-pointer relative group"
                  onClick={() => handleImageClick(image, idx)}
                >
                  <img 
                    src={image} 
                    alt={`${project.title} - additional image ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {isPlayDateProject && project.additionalImages && project.additionalImages.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3">Project Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {project.additionalImages.map((image, idx) => {
                if (image.startsWith('video:')) return null;
                
                return (
                  <div 
                    key={idx} 
                    className="aspect-square overflow-hidden rounded-md cursor-pointer relative group"
                    onClick={() => handleImageClick(image, idx)}
                  >
                    <img 
                      src={image} 
                      alt={`${project.title} - additional image ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn size={20} className="text-white" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <Dialog open={!!enlargedImage} onOpenChange={() => setEnlargedImage(null)}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-0 overflow-hidden bg-transparent shadow-none">
            {enlargedImage && (
              <div className="relative flex items-center justify-center w-full h-full">
                <img 
                  src={enlargedImage} 
                  alt="Enlarged project image" 
                  className="max-w-full max-h-[90vh] object-contain"
                />
                
                <button 
                  onClick={() => setEnlargedImage(null)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors z-50"
                  aria-label="Close image"
                >
                  <X size={24} />
                </button>
                
                {project.additionalImages && project.additionalImages.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreviousImage();
                      }}
                      className="absolute left-2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
                      aria-label="Previous image"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      className="absolute right-2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
                      aria-label="Next image"
                    >
                      <ArrowRight size={24} />
                    </button>
                    
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                      <div className="bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm">
                        {currentImageIndex + 1} / {project.additionalImages.filter(img => !img.startsWith('video:')).length}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProjectCard;
