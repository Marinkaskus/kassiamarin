
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>Portfolio - Kassia Marin | Exhibitions and Art Projects</title>
        <meta name="description" content="Explore Kassia Marin's portfolio of exhibitions, installations, and art projects from her career as a contemporary visual artist based in Oslo, Norway." />
        <meta name="keywords" content="Kassia Marin portfolio, Kassia Marin projects, art exhibitions, contemporary art projects, Norwegian artist exhibitions" />
        <link rel="canonical" href="https://kassiamarin.studio/portfolio" />
        <meta property="og:title" content="Portfolio - Kassia Marin | Exhibitions and Art Projects" />
        <meta property="og:description" content="Explore Kassia Marin's portfolio of exhibitions, installations and art projects from Oslo, Norway." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kassiamarin.studio/portfolio" />
      </Helmet>
      
      <section className="pt-28 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-14 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-medium">Portfolio</h1>
            <p className="mt-4 text-muted-foreground">
              A visual journey through exhibitions, collaborations, and commissioned works
            </p>
          </div>
          
          <div className="space-y-24">
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
