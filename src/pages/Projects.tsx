
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { previousProjects } from '@/data/projectsData';
import ProjectCard from '@/components/ProjectCard';
import VideoDialog from '@/components/VideoDialog';
import ProjectEditor from '@/components/ProjectEditor';
import { Project } from '@/types/Project';
import { useAuth } from '@/contexts/AuthContext';
import ArtworkCreator from '@/components/ArtworkCreator';
import { useToast } from '@/hooks/use-toast';

const Projects = () => {
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [projectsData, setProjectsData] = useState<Project[]>(previousProjects);
  const [editorOpen, setEditorOpen] = useState(false);
  const [creatorOpen, setCreatorOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    if (savedProjects) {
      try {
        setProjectsData(JSON.parse(savedProjects));
      } catch (e) {
        console.error('Error parsing saved projects:', e);
      }
    }
  }, []);
  
  const openVideoDialog = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setVideoDialogOpen(true);
  };

  const handleProjectUpdate = (updatedProject: Project) => {
    const updatedProjects = projectsData.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    
    setProjectsData(updatedProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
    
    toast({
      title: "Project updated",
      description: "Your changes have been saved",
    });
  };
  
  const handleCreateProject = (formData: any) => {
    const newProject: Project = {
      id: Date.now(),
      title: formData.title,
      year: formData.year,
      description: formData.description || '',
      location: formData.location || 'Unknown location',
      imageSrc: formData.imageSrc,
      videoUrl: formData.videoUrl,
      norwegianDescription: formData.norwegianDescription || ''
    };
    
    const updatedProjects = [...projectsData, newProject];
    setProjectsData(updatedProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
    
    toast({
      title: "Project added",
      description: "Your new project has been added successfully",
    });
  };
  
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-medium">Portfolio</h1>
            <p className="mt-4 text-muted-foreground">
              A curated selection of my past exhibitions, collaborations, and commissioned works 
              from throughout my artistic career.
            </p>
          </div>
          
          <div className="space-y-20">
            {projectsData.map((project, index) => (
              <div key={project.id} className="relative">
                <ProjectCard 
                  project={project}
                  index={index}
                  onVideoPlay={openVideoDialog}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <VideoDialog 
        open={videoDialogOpen}
        videoUrl={currentVideoUrl}
        onOpenChange={setVideoDialogOpen}
      />
      
      {selectedProject && (
        <ProjectEditor
          project={selectedProject}
          open={editorOpen}
          onOpenChange={setEditorOpen}
          onSave={handleProjectUpdate}
        />
      )}
      
      <ArtworkCreator
        open={creatorOpen}
        onOpenChange={setCreatorOpen}
        onSave={handleCreateProject}
        type="project"
      />
    </Layout>
  );
};

export default Projects;
