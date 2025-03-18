
import React, { useState, useEffect } from 'react';
import { artworks } from '@/data/artworkData';
import { previousProjects } from '@/data/projectsData';
import { Artwork } from '@/types/Artwork';
import { Project } from '@/types/Project';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import GalleryTabContent from '@/components/admin/GalleryTabContent';
import ProjectsTabContent from '@/components/admin/ProjectsTabContent';
import StorageErrorMessage from '@/components/admin/StorageErrorMessage';
import DeleteConfirmationDialog from '@/components/admin/DeleteConfirmationDialog';
import GallerySearchBar from '@/components/admin/GallerySearchBar';
import ArtworkManager from '@/components/admin/ArtworkManager';
import ProjectManager from '@/components/admin/ProjectManager';
import ItemCreator from '@/components/admin/ItemCreator';

const AdminGalleryManager = () => {
  const [artworkData, setArtworkData] = useState<Artwork[]>([]);
  const [projectsData, setProjectsData] = useState<Project[]>(previousProjects);
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

  const handleAddNewItem = () => {
    setStorageError(null);
    setCreatorOpen(true);
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

  const handleEditArtwork = (artwork: Artwork) => {
    // This is now handled in the ArtworkManager component
  };

  const handleEditProject = (project: Project) => {
    // This is now handled in the ProjectManager component
  };

  return (
    <div>
      <GallerySearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onRefresh={loadGalleryData}
        onAddNew={handleAddNewItem}
      />

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

      <ArtworkManager 
        artworkData={artworkData}
        setArtworkData={setArtworkData}
        setStorageError={setStorageError}
      />

      <ProjectManager
        projectsData={projectsData}
        setProjectsData={setProjectsData}
        setStorageError={setStorageError}
      />

      <ItemCreator 
        creatorOpen={creatorOpen}
        setCreatorOpen={setCreatorOpen}
        selectedTab={selectedTab}
        artworkData={artworkData}
        setArtworkData={setArtworkData}
        projectsData={projectsData}
        setProjectsData={setProjectsData}
        setStorageError={setStorageError}
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
