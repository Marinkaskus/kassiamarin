
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
        <h3 className="font-medium">Add Your Images to Projects</h3>
        <p className="text-sm mt-1">
          Follow these steps to add your images:
        </p>
      </div>
      
      <ol className="text-sm text-left list-decimal pl-5 mt-2 text-muted-foreground">
        <li>Type "upload image" in the chat</li>
        <li>Click on the "+" or paperclip icon in the chat input</li>
        <li>Select your image file from your device</li>
        <li>Once uploaded, the image will automatically be added as a new project</li>
        <li>You can then customize the project details by asking for changes</li>
      </ol>
      
      <div className="text-sm bg-muted p-3 rounded mt-2 text-center">
        <p className="font-medium">Important:</p>
        <p>Make sure your image has been properly uploaded before proceeding</p>
      </div>
      
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
