
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoDialogProps {
  open: boolean;
  videoUrl: string;
  onOpenChange: (open: boolean) => void;
}

const VideoDialog: React.FC<VideoDialogProps> = ({ open, videoUrl, onOpenChange }) => {
  // Video source information
  const getVideoSource = () => {
    // This is a simplified function - we could get more specific with video titles
    // based on projects in a more complex implementation
    const creatorName = "Kassia Marin";
    const platform = videoUrl?.includes('vimeo') ? 'Vimeo' : 'YouTube';
    const title = "Project Video"; // Generic title
    
    return `"${title}" from ${creatorName} on ${platform}`;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] p-0 overflow-hidden">
        <div className="flex flex-col">
          <div className="aspect-video w-full">
            <iframe
              src={videoUrl}
              title="Project Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
          <div className="text-xs text-muted-foreground p-2 italic text-center">
            {getVideoSource()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
