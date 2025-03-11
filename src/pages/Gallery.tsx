
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { artworks } from '@/data/artworkData';
import ArtworkCard from '@/components/ArtworkCard';
import ArtworkDetails from '@/components/ArtworkDetails';
import { Artwork } from '@/types/Artwork';
import { ImagePlus, Edit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [localArtworks, setLocalArtworks] = useState<Artwork[]>(artworks);
  const { toast } = useToast();
  
  const handleArtworkClick = (artwork: Artwork) => {
    const currentArtwork = localArtworks.find(a => a.id === artwork.id);
    setSelectedArtwork(currentArtwork || null);
    setDetailsOpen(true);
  };

  const handleEdit = (artwork: Artwork) => {
    const artworkToEdit = localArtworks.find(a => a.id === artwork.id);
    setEditingArtwork(artworkToEdit ? { ...artworkToEdit } : { ...artwork });
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (!editingArtwork) return;
    
    // Update the local artworks array
    const updatedArtworks = localArtworks.map(artwork => 
      artwork.id === editingArtwork.id ? editingArtwork : artwork
    );
    
    setLocalArtworks(updatedArtworks);
    
    // If the artwork being edited is also the selected artwork in the details view,
    // update that as well
    if (selectedArtwork && selectedArtwork.id === editingArtwork.id) {
      setSelectedArtwork(editingArtwork);
    }
    
    setEditDialogOpen(false);
    setEditingArtwork(null);
    
    // Show a success toast
    toast({
      title: "Changes saved",
      description: "Artwork information has been updated.",
    });
  };
  
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-medium">Gallery</h1>
            <p className="mt-4 text-muted-foreground">
              A collection of paintings and graphic prints exploring themes of nature, identity, and modern existence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {localArtworks.map((artwork, index) => (
              <div key={artwork.id} className="relative group">
                <ArtworkCard 
                  artwork={artwork}
                  onClick={handleArtworkClick}
                  className={`animate-fade-in-up [animation-delay:${index * 100}ms]`}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(artwork);
                  }}
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit2 className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}
            
            <div 
              className="aspect-[3/4] border-2 border-dashed border-muted rounded-md flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-secondary/50 transition-colors animate-fade-in-up [animation-delay:600ms]"
              onClick={() => alert("To add new artwork, edit the artworkData.ts file.")}
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Add New Artwork</h3>
              <p className="text-sm text-muted-foreground">Upload a new painting or print to your gallery</p>
            </div>
          </div>
        </div>
      </section>
      
      <ArtworkDetails 
        artwork={selectedArtwork}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Artwork Details</DialogTitle>
          </DialogHeader>
          {editingArtwork && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  value={editingArtwork.title}
                  onChange={(e) => setEditingArtwork({ ...editingArtwork, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="year">Year</label>
                <Input
                  id="year"
                  value={editingArtwork.year}
                  onChange={(e) => setEditingArtwork({ ...editingArtwork, year: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="medium">Medium</label>
                <Input
                  id="medium"
                  value={editingArtwork.medium}
                  onChange={(e) => setEditingArtwork({ ...editingArtwork, medium: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="size">Size</label>
                <Input
                  id="size"
                  value={editingArtwork.size}
                  onChange={(e) => setEditingArtwork({ ...editingArtwork, size: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="category">Category</label>
                <Input
                  id="category"
                  value={editingArtwork.category || ''}
                  onChange={(e) => setEditingArtwork({ ...editingArtwork, category: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  value={editingArtwork.description || ''}
                  onChange={(e) => setEditingArtwork({ ...editingArtwork, description: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="available">Available</label>
                <input
                  id="available"
                  type="checkbox"
                  checked={editingArtwork.available || false}
                  onChange={(e) => setEditingArtwork({ ...editingArtwork, available: e.target.checked })}
                  className="ml-2"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="price">Price (optional)</label>
                <Input
                  id="price"
                  value={editingArtwork.price || ''}
                  onChange={(e) => setEditingArtwork({ ...editingArtwork, price: e.target.value })}
                  placeholder="e.g. $1,200 or 'Price on request'"
                />
              </div>
              <Button onClick={handleEditSave}>Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Gallery;
