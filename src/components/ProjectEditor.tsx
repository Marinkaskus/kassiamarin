import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Project } from '@/types/Project';
import { useToast } from '@/hooks/use-toast';
import { X, Save, Upload, FileImage, Video, Link } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProjectEditorProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedProject: Project) => void;
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({ 
  project, 
  open, 
  onOpenChange,
  onSave
}) => {
  const [formData, setFormData] = useState<Project>({ ...project });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageUploadMethod, setImageUploadMethod] = useState<'upload' | 'url'>('upload');
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
  
  const handleImageUrlSubmit = () => {
    if (!imageUrlInput) {
      toast({
        title: "Error",
        description: "Please enter an image URL",
        variant: "destructive",
      });
      return;
    }
    
    setImagePreview(imageUrlInput);
    setFormData({ ...formData, imageSrc: imageUrlInput });
    toast({
      title: "Image updated",
      description: "The image preview has been updated from URL",
    });
  };

  const handleSubmit = () => {
    try {
      onSave(formData);
      toast({
        title: "Project updated",
        description: "The changes have been saved successfully",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>Make changes to your project here.</DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="relative w-full h-48 rounded-md overflow-hidden border mb-2">
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
                  id="project-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => document.getElementById('project-image-upload')?.click()}
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
              placeholder="Project title"
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
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Oslo, Norway"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (English)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project description in English"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="norwegianDescription">Description (Norwegian)</Label>
            <Textarea
              id="norwegianDescription"
              name="norwegianDescription"
              value={formData.norwegianDescription || ""}
              onChange={handleChange}
              placeholder="Project description in Norwegian"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="videoUrl" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>Video URL (Vimeo, YouTube, etc.)</span>
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

export default ProjectEditor;
