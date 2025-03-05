
import React from 'react';
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
  const carouselImages = project.additionalImages 
    ? [project.imageSrc, ...project.additionalImages]
    : [project.imageSrc];
  
  // Use ImageGallery instead of ImageCarousel for project with ID 8 (Children's children)
  const useGallery = project.id === 8;
  
  return (
    <div 
      className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center animate-fade-in`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="w-full lg:w-1/2">
        {useGallery ? (
          <ImageGallery 
            images={carouselImages.map((src, i) => ({
              id: i,
              src,
              alt: project.title,
              title: project.title,
              year: project.year
            }))} 
            columns={1}
            videoUrl={project.videoUrl}
          />
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
          
          {project.videoUrl && !useGallery && (
            <button 
              onClick={() => onVideoPlay(project.videoUrl!)}
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
};

export default ProjectCard;
