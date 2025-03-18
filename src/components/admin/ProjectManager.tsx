
import React, { useState } from 'react';
import { Project } from '@/types/Project';
import { useToast } from '@/hooks/use-toast';
import ProjectEditor from '@/components/ProjectEditor';

interface ProjectManagerProps {
  projectsData: Project[];
  setProjectsData: React.Dispatch<React.SetStateAction<Project[]>>;
  setStorageError: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ 
  projectsData, 
  setProjectsData,
  setStorageError
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectEditorOpen, setProjectEditorOpen] = useState(false);
  const { toast } = useToast();

  const handleProjectUpdate = (updatedProject: Project) => {
    const updatedProjects = projectsData.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    
    setProjectsData(updatedProjects);
    setSelectedProject(null);
    
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
    
    toast({
      title: "Changes saved",
      description: `"${updatedProject.title}" has been updated`,
    });
    
    setProjectEditorOpen(false);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setProjectEditorOpen(true);
  };

  return (
    <>
      {selectedProject && (
        <ProjectEditor
          project={selectedProject}
          open={projectEditorOpen}
          onOpenChange={setProjectEditorOpen}
          onSave={handleProjectUpdate}
        />
      )}
    </>
  );
};

export default ProjectManager;
