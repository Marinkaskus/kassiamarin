
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Image as ImageIcon, Check } from 'lucide-react';
import { compressImage } from '@/utils/imageUtils';
import { Artwork } from '@/types/Artwork';

interface ArtworkUploaderProps {
  onUploadComplete: (newArtwork: Artwork) => void;
}

const ArtworkUploader: React.FC<ArtworkUploaderProps> = ({ onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    try {
      setIsUploading(true);
      setUploadProgress(25);
      
      // Check file size
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB"
        });
        setIsUploading(false);
        return;
      }
      
      setUploadProgress(50);
      
      // Process image
      const compressedImage = await compressImage(file, 1200, 0.8);
      setUploadProgress(75);
      
      setUploadedImage(compressedImage);
      
      // Create a new artwork entry
      const newArtwork: Artwork = {
        id: Date.now(),
        title: file.name.replace(/\.[^/.]+$/, "") || "Untitled Artwork",
        year: new Date().getFullYear().toString(),
        size: "30 × 60 cm",
        medium: "Mixed media on tile",
        imageSrc: compressedImage,
        category: "Mixed Media",
        available: true,
        additionalImages: [],
        alt: `Artwork by Kassia Marin - ${file.name.replace(/\.[^/.]+$/, "")}`
      };
      
      setUploadProgress(100);
      
      // Notify parent component
      onUploadComplete(newArtwork);
      
      toast({
        title: "Upload complete",
        description: "Your artwork has been added to the gallery"
      });
      
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg gap-4">
      {!uploadedImage ? (
        <>
          <div className="text-center">
            <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
            <h3 className="font-medium text-lg">Upload Artwork Image</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Supported formats: JPG, PNG, WEBP
            </p>
          </div>
          
          <input
            id="image-upload-field"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <Button 
            variant="outline"
            className="mt-2"
            onClick={() => document.getElementById('image-upload-field')?.click()}
            disabled={isUploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Select Image'}
          </Button>
          
          {isUploading && (
            <div className="w-full max-w-xs bg-secondary h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-primary h-2 transition-all duration-300"
                style={{width: `${uploadProgress}%`}}
              ></div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <div className="mb-3 relative w-32 h-32 mx-auto">
            <img 
              src={uploadedImage} 
              alt="Uploaded artwork" 
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-primary/70 rounded-md">
              <Check className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-green-600 font-medium">Upload Complete!</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your artwork has been added to the gallery
          </p>
        </div>
      )}
    </div>
  );
};

export default ArtworkUploader;
