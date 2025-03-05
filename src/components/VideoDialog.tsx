
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoDialogProps {
  open: boolean;
  videoUrl: string;
  onOpenChange: (open: boolean) => void;
}

const VideoDialog: React.FC<VideoDialogProps> = ({ open, videoUrl, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] p-0 overflow-hidden">
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
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
