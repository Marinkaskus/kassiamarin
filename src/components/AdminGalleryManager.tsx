import React, { useState, useEffect } from 'react';
import { Artwork } from '@/types/Artwork';
import { Project } from '@/types/Project';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, ImageIcon, Video, Check, X, AlertTriangle, Loader2 } from 'lucide-react';
import ArtworkEditor from '@/components/ArtworkEditor';
import ProjectEditor from '@/components/ProjectEditor';
import ArtworkCreator from '@/components/ArtworkCreator';
import { supabase } from '@/integrations/supabase/client';

const AdminGalleryManager = () => {
  const [artworkData, setArtworkData] = useState<Artwork[]>([]);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch artworks and projects from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Fetch artworks
      const { data: artworksData, error: artworksError } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: true });

      if (artworksError) {
        console.error('Error fetching artworks:', artworksError);
        toast({
          title: "Error",
          description: "Failed to load artworks from database",
          variant: "destructive"
        });
      } else {
        const mappedArtworks: Artwork[] = (artworksData || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          year: item.year || '',
          size: item.size || '',
          medium: item.medium || '',
          description: item.description || undefined,
          imageSrc: item.image_src || '',
          category: item.category || undefined,
          available: item.available ?? true,
          price: item.price || undefined,
          alignment: item.alignment || null,
          showInfo: item.show_info ?? true,
          scale: item.scale ?? 1.0,
          overlapPrevious: item.overlap_previous ?? false,
        }));
        setArtworkData(mappedArtworks);
      }

      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: true });

      if (projectsError) {
        console.error('Error fetching projects:', projectsError);
        toast({
          title: "Error",
          description: "Failed to load projects from database",
          variant: "destructive"
        });
      } else {
        const mappedProjects: Project[] = (projectsData || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description || '',
          year: item.year || '',
          location: item.location || '',
          imageSrc: item.image_src || '',
          videoUrl: item.video_url || undefined,
          images: item.images || undefined,
        }));
        setProjectsData(mappedProjects);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [toast]);

  const handleArtworkUpdate = async (updatedArtwork: Artwork) => {
    setIsSaving(true);
    
    const { error } = await supabase
      .from('artworks')
      .update({
        title: updatedArtwork.title,
        year: updatedArtwork.year,
        size: updatedArtwork.size,
        medium: updatedArtwork.medium,
        description: updatedArtwork.description,
        image_src: updatedArtwork.imageSrc,
        category: updatedArtwork.category,
        available: updatedArtwork.available,
        price: updatedArtwork.price,
      })
      .eq('id', updatedArtwork.id);

    if (error) {
      console.error('Error updating artwork:', error);
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive"
      });
    } else {
      const updatedArtworks = artworkData.map(artwork => 
        artwork.id === updatedArtwork.id ? updatedArtwork : artwork
      );
      setArtworkData(updatedArtworks);
      setSelectedArtwork(null);
      
      toast({
        title: "Changes saved",
        description: `"${updatedArtwork.title}" has been updated`,
      });
    }
    
    setIsSaving(false);
    setEditorOpen(false);
  };

  const handleProjectUpdate = async (updatedProject: Project) => {
    setIsSaving(true);
    
    const { error } = await supabase
      .from('projects')
      .update({
        title: updatedProject.title,
        description: updatedProject.description,
        year: updatedProject.year,
        location: updatedProject.location,
        image_src: updatedProject.imageSrc,
        video_url: updatedProject.videoUrl,
      })
      .eq('id', updatedProject.id);

    if (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive"
      });
    } else {
      const updatedProjects = projectsData.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      );
      setProjectsData(updatedProjects);
      setSelectedProject(null);
      
      toast({
        title: "Changes saved",
        description: `"${updatedProject.title}" has been updated`,
      });
    }
    
    setIsSaving(false);
    setProjectEditorOpen(false);
  };

  const handleAddNewItem = () => {
    setCreatorOpen(true);
  };

  const handleCreateArtwork = async (newArtwork: Artwork) => {
    setIsSaving(true);
    
    const { data, error } = await supabase
      .from('artworks')
      .insert({
        title: newArtwork.title,
        year: newArtwork.year,
        size: newArtwork.size,
        medium: newArtwork.medium,
        description: newArtwork.description,
        image_src: newArtwork.imageSrc,
        category: newArtwork.category,
        available: newArtwork.available ?? true,
        price: newArtwork.price,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating artwork:', error);
      toast({
        title: "Error",
        description: "Failed to add new artwork",
        variant: "destructive"
      });
      setIsSaving(false);
      throw error;
    }

    const createdArtwork: Artwork = {
      id: data.id,
      title: data.title,
      year: data.year || '',
      size: data.size || '',
      medium: data.medium || '',
      description: data.description || undefined,
      imageSrc: data.image_src || '',
      category: data.category || undefined,
      available: data.available ?? true,
      price: data.price || undefined,
    };

    setArtworkData([...artworkData, createdArtwork]);
    
    toast({
      title: "Artwork added",
      description: `"${newArtwork.title}" has been added to the gallery`
    });
    
    setIsSaving(false);
  };

  const handleCreateProject = async (newArtwork: Artwork) => {
    setIsSaving(true);
    
    const { data, error } = await supabase
      .from('projects')
      .insert({
        title: newArtwork.title,
        description: newArtwork.description,
        year: newArtwork.year,
        location: (newArtwork as any).location || 'Unknown location',
        image_src: newArtwork.imageSrc,
        video_url: (newArtwork as any).videoUrl || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to add new project",
        variant: "destructive"
      });
      setIsSaving(false);
      throw error;
    }

    const createdProject: Project = {
      id: data.id,
      title: data.title,
      description: data.description || '',
      year: data.year || '',
      location: data.location || '',
      imageSrc: data.image_src || '',
      videoUrl: data.video_url || undefined,
    };

    setProjectsData([...projectsData, createdProject]);
    
    toast({
      title: "Project added",
      description: `"${createdProject.title}" has been added to the portfolio`
    });
    
    setIsSaving(false);
  };

  const handleEditArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setEditorOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setProjectEditorOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    
    setIsSaving(true);
    
    if (itemToDelete.type === 'artwork') {
      const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', itemToDelete.id);

      if (error) {
        console.error('Error deleting artwork:', error);
        toast({
          title: "Error",
          description: "Failed to delete artwork",
          variant: "destructive"
        });
      } else {
        const updatedArtworks = artworkData.filter(item => item.id !== itemToDelete.id);
        setArtworkData(updatedArtworks);
        
        toast({
          title: "Artwork deleted",
          description: "The artwork has been permanently removed",
        });
      }
    } else {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', itemToDelete.id);

      if (error) {
        console.error('Error deleting project:', error);
        toast({
          title: "Error",
          description: "Failed to delete project",
          variant: "destructive"
        });
      } else {
        const updatedProjects = projectsData.filter(item => item.id !== itemToDelete.id);
        setProjectsData(updatedProjects);
        
        toast({
          title: "Project deleted",
          description: "The project has been permanently removed",
        });
      }
    }
    
    setIsSaving(false);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Content Management</h2>
        <div className="flex gap-2">
          <Input 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Button size="sm" variant="default" onClick={handleAddNewItem} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
            Add New
          </Button>
        </div>
      </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArtworks.map(artwork => (
              <div key={artwork.id} className="group relative border rounded-md overflow-hidden bg-card">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={artwork.imageSrc} 
                    alt={artwork.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium truncate">{artwork.title}</h3>
                  <p className="text-sm text-muted-foreground">{artwork.year} • {artwork.medium}</p>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="flex items-center">
                      {artwork.available ? (
                        <span className="text-xs flex items-center text-green-600">
                          <Check className="h-3 w-3 mr-1" /> Available
                        </span>
                      ) : (
                        <span className="text-xs flex items-center text-red-600">
                          <X className="h-3 w-3 mr-1" /> Not Available
                        </span>
                      )}
                    </span>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditArtwork(artwork)}
                        disabled={isSaving}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-destructive"
                        onClick={() => handleDeleteClick(artwork.id, 'artwork')}
                        disabled={isSaving}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredArtworks.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
              <h3 className="mt-4 text-lg font-medium">No artworks found</h3>
              <p className="text-muted-foreground">Try a different search term or add a new artwork.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="projects">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredProjects.map(project => (
              <div key={project.id} className="group relative border rounded-md overflow-hidden bg-card">
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
                        onClick={() => handleEditProject(project)}
                        disabled={isSaving}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-destructive"
                        onClick={() => handleDeleteClick(project.id, 'project')}
                        disabled={isSaving}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
              <h3 className="mt-4 text-lg font-medium">No projects found</h3>
              <p className="text-muted-foreground">Try a different search term or add a new project.</p>
            </div>
          )}
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this {itemToDelete?.type} from your website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm} 
              className="bg-red-600 hover:bg-red-700"
              disabled={isSaving}
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminGalleryManager;
