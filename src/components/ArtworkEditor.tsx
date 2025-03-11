
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Artwork } from '@/types/Artwork';
import { useToast } from '@/components/ui/use-toast';
import { X, Save } from 'lucide-react';

interface ArtworkEditorProps {
  artwork: Artwork;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedArtwork: Artwork) => void;
}

const ArtworkEditor: React.FC<ArtworkEditorProps> = ({ 
  artwork, 
  open, 
  onOpenChange,
  onSave
}) => {
  const [formData, setFormData] = useState<Artwork>({ ...artwork });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setFormData({ ...formData, available: checked });
  };

  const handleSubmit = () => {
    try {
      onSave(formData);
      toast({
        title: "Artwork updated",
        description: "The changes have been saved successfully",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update artwork",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Artwork</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Artwork title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Year created"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Input
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="e.g. 30 × 60 cm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="medium">Medium</Label>
            <Input
              id="medium"
              name="medium"
              value={formData.medium}
              onChange={handleChange}
              placeholder="e.g. Mixed media on tile"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              placeholder="e.g. Mixed Media"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Artwork description"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price (optional)</Label>
            <Input
              id="price"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              placeholder="e.g. $1,200"
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="available">Available for purchase</Label>
            <Switch
              id="available"
              checked={!!formData.available}
              onCheckedChange={handleAvailabilityChange}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <DialogClose asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <X className="h-4 w-4" /> Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            <Save className="h-4 w-4" /> Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkEditor;
