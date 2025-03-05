
import React from 'react';
import { Project } from '@/types/Project';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface ProjectTeaserProps {
  project: Project;
}

const ProjectTeaser: React.FC<ProjectTeaserProps> = ({ project }) => {
  return (
    <div className="group animate-fade-in overflow-hidden">
      <div className="relative overflow-hidden aspect-[4/3] mb-4">
        <img 
          src={project.imageSrc} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 w-full p-4">
            <Link 
              to="/projects" 
              className="text-white text-sm hover:underline flex items-center"
            >
              View Project <ExternalLink size={14} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center mb-2">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">{project.year}</span>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{project.location}</span>
        </div>
        
        <h3 className="text-lg font-medium mb-2">{project.title}</h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default ProjectTeaser;
