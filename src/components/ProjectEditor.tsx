
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Project } from '@/types/Project';
import { useToast } from '@/hooks/use-toast';
import { X, Save } from 'lucide-react';

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
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
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
            <Label htmlFor="videoUrl">Video URL (Vimeo, YouTube, etc.)</Label>
            <Input
              id="videoUrl"
              name="videoUrl"
              value={formData.videoUrl || ""}
              onChange={handleChange}
              placeholder="e.g. https://player.vimeo.com/video/123456789"
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

export default ProjectEditor;
