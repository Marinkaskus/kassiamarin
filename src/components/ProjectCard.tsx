
import React, { useState } from 'react';
import { Footprints, ExternalLink, Play } from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import { Project } from '@/types/Project';
import ImageGallery from './ImageGallery';

interface ProjectCardProps {
  project: Project;
  index: number;
  onVideoPlay: (videoUrl: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onVideoPlay }) => {
  const [showVideo, setShowVideo] = useState(false);
  const carouselImages = project.additionalImages 
    ? [project.imageSrc, ...project.additionalImages]
    : [project.imageSrc];
  
  // Special handling for project with ID 8 (Children's children)
  const isChildrenProject = project.id === 8;
  
  const handleVideoThumbnailClick = () => {
    if (isChildrenProject && project.videoUrl) {
      setShowVideo(true);
    }
  };
  
  return (
    <div 
      className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center animate-fade-in`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="w-full lg:w-1/2">
        {isChildrenProject ? (
          showVideo && project.videoUrl ? (
            <div className="w-full aspect-video mb-4">
              <iframe
                src={project.videoUrl}
                title={`${project.title} Video`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            </div>
          ) : (
            <div className="w-full aspect-[4/3] overflow-hidden relative group cursor-pointer" onClick={handleVideoThumbnailClick}>
              <img 
                src={project.imageSrc}
                alt={project.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-background/80 rounded-full p-4">
                  <Play size={32} className="text-primary" />
                </div>
              </div>
            </div>
          )
        ) : (
          <ImageCarousel 
            images={carouselImages} 
            title={project.title} 
            autoPlay={true}
            interval={6000} // 6 seconds between slides for a user-friendly pace
          />
        )}
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
};

export default ProjectCard;
