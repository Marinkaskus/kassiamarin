
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Artwork } from '@/types/Artwork';
import { useToast } from '@/hooks/use-toast';
import { X, Save, Upload, FileImage } from 'lucide-react';

interface ArtworkCreatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (newArtwork: Artwork) => void;
  type: 'artwork' | 'project';
}

const ArtworkCreator: React.FC<ArtworkCreatorProps> = ({ 
  open, 
  onOpenChange,
  onSave,
  type
}) => {
  const initialArtwork: Artwork = {
    id: Date.now(),
    title: '',
    year: new Date().getFullYear().toString(),
    size: '',
    medium: '',
    description: '',
    imageSrc: 'https://placehold.co/600x600/e6e6e6/a6a6a6?text=Upload+Image',
    category: '',
    available: true
  };
  
  const [formData, setFormData] = useState<Artwork>(initialArtwork);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setFormData({ ...formData, available: checked });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData({ ...formData, imageSrc: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.year || !formData.imageSrc) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields: title, year, and image",
        variant: "destructive",
      });
      return;
    }

    try {
      onSave(formData);
      toast({
        title: type === 'artwork' ? "Artwork added" : "Project added",
        description: "Your new item has been added successfully",
      });
      onOpenChange(false);
      // Reset form
      setFormData(initialArtwork);
      setImagePreview(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add new item",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{type === 'artwork' ? 'Add New Artwork' : 'Add New Project'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="relative w-40 h-40 rounded-md overflow-hidden border mb-2">
              <img 
                src={imagePreview || formData.imageSrc} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
              <Label 
                htmlFor="image-upload" 
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white"
              >
                <FileImage className="h-8 w-8 mb-2" />
                <span className="text-xs">Upload Image</span>
              </Label>
            </div>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <Upload className="h-4 w-4 mr-2" /> 
              Choose Image
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Artwork title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="year">Year *</Label>
            <Input
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Year created"
              required
            />
          </div>
          
          {type === 'artwork' && (
            <>
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
            </>
          )}
          
          {type === 'project' && (
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={(formData as any).location || ""}
                onChange={handleChange}
                placeholder="e.g. Oslo, Norway"
              />
            </div>
          )}
          
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
        </div>
        
        <div className="flex justify-end space-x-4">
          <DialogClose asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <X className="h-4 w-4" /> Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            <Save className="h-4 w-4" /> Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkCreator;
