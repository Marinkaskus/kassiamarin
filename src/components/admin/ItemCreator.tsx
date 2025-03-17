
import React from 'react';
import { Artwork } from '@/types/Artwork';
import { Project } from '@/types/Project';
import { useToast } from '@/hooks/use-toast';
import ArtworkCreator from '@/components/ArtworkCreator';

interface ItemCreatorProps {
  creatorOpen: boolean;
  setCreatorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTab: string;
  artworkData: Artwork[];
  setArtworkData: React.Dispatch<React.SetStateAction<Artwork[]>>;
  projectsData: Project[];
  setProjectsData: React.Dispatch<React.SetStateAction<Project[]>>;
  setStorageError: React.Dispatch<React.SetStateAction<string | null>>;
}

const ItemCreator: React.FC<ItemCreatorProps> = ({
  creatorOpen,
  setCreatorOpen,
  selectedTab,
  artworkData,
  setArtworkData,
  projectsData,
  setProjectsData,
  setStorageError
}) => {
  const { toast } = useToast();

  const handleCreateArtwork = (newArtwork: Artwork) => {
    try {
      if (artworkData.length > 30) {
        const updatedArtworks = [...artworkData.slice(-29), newArtwork];
        setArtworkData(updatedArtworks);
        localStorage.setItem('gallery_artworks', JSON.stringify(updatedArtworks));
      } else {
        const updatedArtworks = [...artworkData, newArtwork];
        setArtworkData(updatedArtworks);
        localStorage.setItem('gallery_artworks', JSON.stringify(updatedArtworks));
      }
      
      toast({
        title: "Artwork added",
        description: `"${newArtwork.title}" has been added to the gallery`
      });
      
      setStorageError(null);
    } catch (error) {
      console.error("Error adding artwork:", error);
      
      if (error instanceof Error && error.name === "QuotaExceededError") {
        setStorageError("Storage limit reached. Try removing some items before adding new ones.");
        toast({
          title: "Storage limit reached",
          description: "Please remove some existing artworks before adding new ones.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add new artwork. Please try again.",
          variant: "destructive"
        });
      }
      
      throw error;
    }
  };

  const handleCreateProject = (newArtwork: Artwork) => {
    try {
      const project: Project = {
        id: newArtwork.id,
        title: newArtwork.title,
        description: newArtwork.description || '',
        year: newArtwork.year,
        location: (newArtwork as any).location || 'Unknown location',
        imageSrc: newArtwork.imageSrc,
        videoUrl: (newArtwork as any).videoUrl || undefined
      };
      
      if (projectsData.length > 30) {
        const updatedProjects = [...projectsData.slice(-29), project];
        setProjectsData(updatedProjects);
        localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
      } else {
        const updatedProjects = [...projectsData, project];
        setProjectsData(updatedProjects);
        localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
      }
      
      toast({
        title: "Project added",
        description: `"${project.title}" has been added to the portfolio`
      });
      
      setStorageError(null);
    } catch (error) {
      console.error("Error adding project:", error);
      
      if (error instanceof Error && error.name === "QuotaExceededError") {
        setStorageError("Storage limit reached. Try removing some items before adding new ones.");
        toast({
          title: "Storage limit reached",
          description: "Please remove some existing projects before adding new ones.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add new project. Please try again.",
          variant: "destructive"
        });
      }
      
      throw error;
    }
  };

  return (
    <ArtworkCreator
      open={creatorOpen}
      onOpenChange={setCreatorOpen}
      onSave={selectedTab === 'gallery' ? handleCreateArtwork : handleCreateProject}
      type={selectedTab === 'gallery' ? 'artwork' : 'project'}
    />
  );
};

export default ItemCreator;
