
import React, { useState, useEffect } from 'react';
import { artworks } from '@/data/artworkData';
import { previousProjects } from '@/data/projectsData';
import { Artwork } from '@/types/Artwork';
import { Project } from '@/types/Project';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, RefreshCw } from 'lucide-react';
import ArtworkEditor from '@/components/ArtworkEditor';
import ProjectEditor from '@/components/ProjectEditor';
import ArtworkCreator from '@/components/ArtworkCreator';
import GalleryTabContent from '@/components/admin/GalleryTabContent';
import ProjectsTabContent from '@/components/admin/ProjectsTabContent';
import StorageErrorMessage from '@/components/admin/StorageErrorMessage';
import DeleteConfirmationDialog from '@/components/admin/DeleteConfirmationDialog';

const AdminGalleryManager = () => {
  const [artworkData, setArtworkData] = useState<Artwork[]>([]);
  const [projectsData, setProjectsData] = useState<Project[]>(previousProjects);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [projectEditorOpen, setProjectEditorOpen] = useState(false);
  const [creatorOpen, setCreatorOpen] = useState(false);
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('gallery');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: number, type: 'artwork' | 'project' } | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    loadGalleryData();
  }, []);

  const loadGalleryData = () => {
    const savedArtworks = localStorage.getItem('gallery_artworks');
    if (savedArtworks) {
      try {
        setArtworkData(JSON.parse(savedArtworks));
      } catch (e) {
        console.error('Error parsing saved artworks:', e);
        setArtworkData(artworks);
      }
    } else {
      setArtworkData(artworks);
    }

    const savedProjects = localStorage.getItem('portfolio_projects');
    if (savedProjects) {
      try {
        setProjectsData(JSON.parse(savedProjects));
      } catch (e) {
        console.error('Error parsing saved projects:', e);
      }
    }
  };

  const handleArtworkUpdate = (updatedArtwork: Artwork) => {
    const updatedArtworks = artworkData.map(artwork => 
      artwork.id === updatedArtwork.id ? updatedArtwork : artwork
    );
    
    setArtworkData(updatedArtworks);
    setSelectedArtwork(null);
    
    localStorage.setItem('gallery_artworks', JSON.stringify(updatedArtworks));
    
    toast({
      title: "Changes saved",
      description: `"${updatedArtwork.title}" has been updated`,
    });
    
    setEditorOpen(false);
  };

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

  const handleAddNewItem = () => {
    setStorageError(null);
    setCreatorOpen(true);
  };

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

  const handleEditArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setEditorOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setProjectEditorOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    
    if (itemToDelete.type === 'artwork') {
      const updatedArtworks = artworkData.filter(item => item.id !== itemToDelete.id);
      setArtworkData(updatedArtworks);
      localStorage.setItem('gallery_artworks', JSON.stringify(updatedArtworks));
      
      toast({
        title: "Artwork deleted",
        description: "The artwork has been permanently removed",
      });
    } else {
      const updatedProjects = projectsData.filter(item => item.id !== itemToDelete.id);
      setProjectsData(updatedProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
      
      toast({
        title: "Project deleted",
        description: "The project has been permanently removed",
      });
    }
    
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteClick = (id: number, type: 'artwork' | 'project') => {
    setItemToDelete({ id, type });
    setDeleteDialogOpen(true);
  };

  const filteredArtworks = artworkData.filter(artwork => 
    artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artwork.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artwork.medium.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjects = projectsData.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Content Management</h2>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={loadGalleryData}
            className="h-10"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Input 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Button size="sm" variant="default" onClick={handleAddNewItem}>
            <Plus className="h-4 w-4 mr-2" /> Add New
          </Button>
        </div>
      </div>

      <StorageErrorMessage message={storageError} />

      <Tabs 
        defaultValue="gallery" 
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="projects">Portfolio</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gallery">
          <GalleryTabContent 
            artworks={filteredArtworks} 
            onEditArtwork={handleEditArtwork} 
            onDeleteItem={handleDeleteClick} 
          />
        </TabsContent>
        
        <TabsContent value="projects">
          <ProjectsTabContent 
            projects={filteredProjects} 
            onEditProject={handleEditProject} 
            onDeleteItem={handleDeleteClick} 
          />
        </TabsContent>
      </Tabs>

      {selectedArtwork && (
        <ArtworkEditor
          artwork={selectedArtwork}
          open={editorOpen}
          onOpenChange={setEditorOpen}
          onSave={handleArtworkUpdate}
        />
      )}

      {selectedProject && (
        <ProjectEditor
          project={selectedProject}
          open={projectEditorOpen}
          onOpenChange={setProjectEditorOpen}
          onSave={handleProjectUpdate}
        />
      )}

      <ArtworkCreator
        open={creatorOpen}
        onOpenChange={setCreatorOpen}
        onSave={selectedTab === 'gallery' ? handleCreateArtwork : handleCreateProject}
        type={selectedTab === 'gallery' ? 'artwork' : 'project'}
      />

      <DeleteConfirmationDialog 
        open={deleteDialogOpen} 
        onOpenChange={setDeleteDialogOpen} 
        itemType={itemToDelete?.type || null}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default AdminGalleryManager;
