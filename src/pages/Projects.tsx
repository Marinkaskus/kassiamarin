
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { previousProjects } from '@/data/projectsData';
import ProjectCard from '@/components/ProjectCard';
import VideoDialog from '@/components/VideoDialog';
import { Project } from '@/types/Project';
import { useAuth } from '@/contexts/AuthContext';

const Projects = () => {
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [projectsData, setProjectsData] = useState<Project[]>(previousProjects);
  
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
    </Layout>
  );
};

export default Projects;
