
import React, { useState } from 'react';
import { AlertCircle, Upload } from 'lucide-react';

interface ImageUploadHelperProps {
  onImageUpload: (imagePath: string) => void;
}

const ImageUploadHelper: React.FC<ImageUploadHelperProps> = ({ onImageUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="p-6 border border-dashed rounded-lg flex flex-col items-center justify-center gap-3 text-center">
      <div className="text-muted-foreground">
        <Upload size={24} className="mx-auto mb-2" />
        <h3 className="font-medium">Add Your Images</h3>
        <p className="text-sm mt-1">
          To add your images to projects, upload them using the chat interface:
        </p>
      </div>
      
      <ol className="text-sm text-left list-decimal pl-5 mt-2 text-muted-foreground">
        <li>Click the "+" or paperclip icon in the chat</li>
        <li>Select "Upload Image" option</li>
        <li>Choose your image file</li>
        <li>Copy the path that looks like: <code className="text-xs bg-muted p-1 rounded">/lovable-uploads/image-id.png</code></li>
        <li>Use this path in the project data to display your image</li>
      </ol>
      
      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-destructive text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploadHelper;
