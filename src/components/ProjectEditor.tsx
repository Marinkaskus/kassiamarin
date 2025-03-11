import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Project } from '@/types/Project';
import { useToast } from '@/hooks/use-toast';
import { X, Save, Upload, FileImage, Video, Sun } from 'lucide-react';
import { adjustWhiteBalance } from '../utils/imageProcessing';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const adjustedImageBase64 = await adjustWhiteBalance(file);
        
        setImagePreview(adjustedImageBase64);
        setFormData({ ...formData, imageSrc: adjustedImageBase64 });
        
        toast({
          title: "Image processed",
          description: "White balance has been automatically adjusted",
        });
      } catch (error) {
        console.error('Error processing image:', error);
        toast({
          title: "Error",
          description: "Failed to process image",
          variant: "destructive",
        });
      }
    }
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

  const handleAdjustWhiteBalance = async () => {
    if (!formData.imageSrc) return;
    
    setIsProcessing(true);
    toast({
      title: "Processing",
      description: "Adjusting white balance, please wait...",
    });
    
    try {
      const response = await fetch(formData.imageSrc);
      const blob = await response.blob();
      const file = new File([blob], `project-${formData.id}.jpg`, { type: 'image/jpeg' });
      
      const adjustedImageBase64 = await adjustWhiteBalance(file);
      
      setImagePreview(adjustedImageBase64);
      setFormData({ ...formData, imageSrc: adjustedImageBase64 });
      
      toast({
        title: "Success",
        description: "White balance adjusted successfully",
      });
    } catch (error) {
      console.error('Error adjusting white balance:', error);
      toast({
        title: "Error",
        description: "Failed to adjust white balance",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="relative w-full h-48 rounded-md overflow-hidden border mb-2">
              <img 
                src={imagePreview || formData.imageSrc} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
              <Label 
                htmlFor="project-image-upload" 
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white"
              >
                <FileImage className="h-8 w-8 mb-2" />
                <span className="text-xs">Upload Image</span>
              </Label>
            </div>
            <Input
              id="project-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => document.getElementById('project-image-upload')?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" /> 
                Change Image
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAdjustWhiteBalance}
                disabled={isProcessing || !formData.imageSrc}
                className="flex items-center gap-2"
              >
                <Sun className="h-4 w-4" /> 
                {isProcessing ? 'Adjusting...' : 'Adjust White Balance'}
              </Button>
            </div>
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
