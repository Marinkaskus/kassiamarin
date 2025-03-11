
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Artwork } from '@/types/Artwork';
import { useToast } from '@/hooks/use-toast';
import { X, Save, Upload, FileImage, Link, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageUploadMethod, setImageUploadMethod] = useState<'upload' | 'url'>('upload');
  const [imageError, setImageError] = useState(false);
  const { toast } = useToast();

  // Reset state when artwork changes or dialog opens
  useEffect(() => {
    if (open) {
      setFormData({ ...artwork });
      setImagePreview(null);
      setImageUrlInput('');
      setImageError(false);
    }
  }, [artwork, open]);

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
        setImageError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlSubmit = () => {
    if (!imageUrlInput) {
      toast({
        title: "Error",
        description: "Please enter an image URL",
        variant: "destructive",
      });
      return;
    }
    
    // Preview the image from URL
    setImagePreview(imageUrlInput);
    setFormData({ ...formData, imageSrc: imageUrlInput });
    setImageError(false);
    toast({
      title: "Image updated",
      description: "The image preview has been updated from URL",
    });
  };

  const handleImageError = () => {
    setImageError(true);
    toast({
      title: "Image Error",
      description: "Failed to load image. Please check the URL or try a different image.",
      variant: "destructive",
    });
  };

  const handleSubmit = () => {
    try {
      // Ensure imageSrc is valid and not empty
      if (!formData.imageSrc || formData.imageSrc.trim() === '') {
        toast({
          title: "Error",
          description: "Image source cannot be empty",
          variant: "destructive",
        });
        return;
      }
      
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
          <DialogDescription>Update artwork details or change the image.</DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="relative w-40 h-40 rounded-md overflow-hidden border mb-2">
              {!imageError ? (
                <img 
                  src={imagePreview || formData.imageSrc} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-muted p-2 text-center">
                  <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                  <p className="text-xs text-destructive">Image could not be loaded</p>
                </div>
              )}
            </div>
            
            <Tabs 
              defaultValue="upload" 
              value={imageUploadMethod}
              onValueChange={(value) => setImageUploadMethod(value as 'upload' | 'url')}
              className="w-full mt-2"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center gap-1">
                  <FileImage className="h-3 w-3" />
                  <span>Upload</span>
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center gap-1">
                  <Link className="h-3 w-3" />
                  <span>Image URL</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-2">
                <Input
                  id="artwork-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => document.getElementById('artwork-image-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" /> 
                  Choose Image File
                </Button>
              </TabsContent>
              
              <TabsContent value="url" className="space-y-2 mt-2">
                <div className="flex space-x-2">
                  <Input
                    type="url"
                    placeholder="Paste image URL here"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                  />
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleImageUrlSubmit}
                  >
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter a direct link to an image (must end with .jpg, .png, etc.)
                </p>
              </TabsContent>
            </Tabs>
          </div>
          
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
