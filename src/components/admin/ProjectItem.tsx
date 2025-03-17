
import React from 'react';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/Project';
import { Edit, Trash2, Video } from 'lucide-react';

interface ProjectItemProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number, type: 'artwork' | 'project') => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, onEdit, onDelete }) => {
  return (
    <div className="group relative border rounded-md overflow-hidden bg-card">
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={project.imageSrc} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        {project.videoUrl && (
          <div className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-md">
            <Video className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.year} • {project.location}</p>
        
        <div className="flex justify-end items-center mt-2">
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => onEdit(project)}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-destructive"
              onClick={() => onDelete(project.id, 'project')}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
