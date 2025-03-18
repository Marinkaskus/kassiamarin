
import React from 'react';
import { ImageIcon } from 'lucide-react';
import { Project } from '@/types/Project';
import ProjectItem from './ProjectItem';

interface ProjectsTabContentProps {
  projects: Project[];
  onEditProject: (project: Project) => void;
  onDeleteItem: (id: number, type: 'artwork' | 'project') => void;
}

const ProjectsTabContent: React.FC<ProjectsTabContentProps> = ({ 
  projects, 
  onEditProject, 
  onDeleteItem 
}) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map(project => (
          <ProjectItem 
            key={project.id} 
            project={project} 
            onEdit={onEditProject} 
            onDelete={onDeleteItem} 
          />
        ))}
      </div>
      
      {projects.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
          <h3 className="mt-4 text-lg font-medium">No projects found</h3>
          <p className="text-muted-foreground">Try a different search term or add a new project.</p>
        </div>
      )}
    </>
  );
};

export default ProjectsTabContent;
