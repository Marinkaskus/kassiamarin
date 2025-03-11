
import React, { useState, useEffect } from 'react';
import { artworks } from '@/data/artworkData';
import { previousProjects } from '@/data/projectsData';
import { Artwork } from '@/types/Artwork';
import { Project } from '@/types/Project';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, ImageIcon, Video, Check, X } from 'lucide-react';
import ArtworkEditor from '@/components/ArtworkEditor';

const AdminGalleryManager = () => {
  const [artworkData, setArtworkData] = useState<Artwork[]>([]);
  const [projectsData, setProjectsData] = useState<Project[]>(previousProjects);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('gallery');

  // Load artwork data from localStorage or use default
  useEffect(() => {
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

    // Load projects data
    const savedProjects = localStorage.getItem('portfolio_projects');
    if (savedProjects) {
      try {
        setProjectsData(JSON.parse(savedProjects));
      } catch (e) {
        console.error('Error parsing saved projects:', e);
      }
    }
  }, []);

  const handleArtworkUpdate = (updatedArtwork: Artwork) => {
    const updatedArtworks = artworkData.map(artwork => 
      artwork.id === updatedArtwork.id ? updatedArtwork : artwork
    );
    
    setArtworkData(updatedArtworks);
    setSelectedArtwork(null);
    
    // Persist changes to localStorage
    localStorage.setItem('gallery_artworks', JSON.stringify(updatedArtworks));
    
    toast({
      title: "Changes saved",
      description: `"${updatedArtwork.title}" has been updated`,
    });
    
    setEditorOpen(false);
  };

  const handleEditArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setEditorOpen(true);
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
          <Input 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Button size="sm" variant="default">
            <Plus className="h-4 w-4 mr-2" /> Add New
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
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-destructive"
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
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-destructive"
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
    </div>
  );
};

export default AdminGalleryManager;
