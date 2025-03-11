
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Artwork } from '@/types/Artwork';
import { useToast } from '@/hooks/use-toast';
import { X, Save, Upload, FileImage, Video, AlertTriangle, Link } from 'lucide-react';
import { compressImage } from '@/utils/imageUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  
  const [formData, setFormData] = useState<Artwork & { location?: string, videoUrl?: string, norwegianDescription?: string }>(initialArtwork);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageUploadMethod, setImageUploadMethod] = useState<'upload' | 'url'>('upload');
  const { toast } = useToast();

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFormData({
        ...initialArtwork,
        id: Date.now() // Ensure a fresh ID each time
      });
      setImagePreview(null);
      setError(null);
      setIsSubmitting(false);
      setImageUrlInput('');
      setImageUploadMethod('upload');
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null); // Clear errors when user makes changes
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setFormData({ ...formData, available: checked });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Check file size - limit to 5MB for initial check
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: "Image must be less than 5MB in size"
          });
          return;
        }
        
        const compressedImage = await compressImage(file, 1200, 0.7);
        setImagePreview(compressedImage);
        setFormData(prev => ({ ...prev, imageSrc: compressedImage }));
      } catch (error) {
        console.error("Image processing error:", error);
        toast({
          title: "Image error",
          description: "Failed to process the image. Please try another one."
        });
      }
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
    
    // Update the image preview and form data with the provided URL
    setImagePreview(imageUrlInput);
    setFormData(prev => ({ ...prev, imageSrc: imageUrlInput }));
    
    toast({
      title: "Image URL set",
      description: "The image has been set from the provided URL"
    });
  };

  const validateForm = () => {
    if (!formData.title) {
      setError("Title is required");
      return false;
    }
    if (!formData.year) {
      setError("Year is required");
      return false;
    }
    if (formData.imageSrc === initialArtwork.imageSrc) {
      setError("Please provide an image (upload or URL)");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      onSave(formData);
      toast({
        title: type === 'artwork' ? "Artwork added" : "Project added",
        description: "Your new item has been added successfully"
      });
      onOpenChange(false);
      // Reset form
      setFormData(initialArtwork);
      setImagePreview(null);
    } catch (error) {
      console.error("Save error:", error);
      
      if (error instanceof Error && error.name === "QuotaExceededError") {
        setError("Storage limit reached. Try removing some existing items first.");
        toast({
          title: "Storage limit reached",
          description: "Please remove some existing items before adding new ones.",
          variant: "destructive"
        });
      } else {
        setError("Failed to save. Please try again.");
        toast({
          title: "Error",
          description: "Failed to add new item. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{type === 'artwork' ? 'Add New Artwork' : 'Add New Project'}</DialogTitle>
        </DialogHeader>
        
        {error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-start gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="relative w-40 h-40 rounded-md overflow-hidden border mb-2">
              <img 
                src={imagePreview || formData.imageSrc} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
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
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => document.getElementById('image-upload')?.click()}
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
                  value={(formData as any).price || ""}
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
            <>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  placeholder="e.g. Oslo, Norway"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="videoUrl">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    <span>Video URL (Vimeo, YouTube, etc.)</span>
                  </div>
                </Label>
                <Input
                  id="videoUrl"
                  name="videoUrl"
                  value={formData.videoUrl || ""}
                  onChange={handleChange}
                  placeholder="e.g. https://player.vimeo.com/video/123456789"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Paste a video embed URL from Vimeo or YouTube
                </p>
              </div>
            </>
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
          
          {type === 'project' && (
            <div className="space-y-2">
              <Label htmlFor="norwegianDescription">Description (Norwegian)</Label>
              <Textarea
                id="norwegianDescription"
                name="norwegianDescription"
                value={formData.norwegianDescription || ""}
                onChange={handleChange}
                placeholder="Norwegian description (optional)"
                rows={3}
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-4">
          <DialogClose asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <X className="h-4 w-4" /> Cancel
            </Button>
          </DialogClose>
          <Button 
            onClick={handleSubmit} 
            className="flex items-center gap-2"
            disabled={isSubmitting}
          >
            <Save className="h-4 w-4" /> Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkCreator;
