
import React, { useState } from 'react';
import { Button } from './ui/button';
import { QrCode, Share2, X } from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator';

interface ShareQRCodeProps {
  url?: string;
  title?: string;
  className?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const ShareQRCode: React.FC<ShareQRCodeProps> = ({ 
  url = window.location.href,
  title = "Scan to visit this page",
  className = "",
  buttonVariant = "outline"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleQRCode = () => {
    setIsOpen(!isOpen);
  };

  const shareContent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kassia Marin Studio',
          text: 'Check out Kassia Marin\'s artwork',
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      toggleQRCode();
    }
  };

  return (
    <>
      <Button 
        variant={buttonVariant} 
        className={`flex items-center gap-2 ${className}`}
        onClick={shareContent}
        aria-label="Share this page"
      >
        <Share2 size={16} />
        Share
      </Button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={toggleQRCode}>
          <div 
            className="bg-background p-6 rounded-lg max-w-xs w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">Share This Page</h3>
              <Button variant="ghost" size="icon" onClick={toggleQRCode}>
                <X size={18} />
              </Button>
            </div>
            
            <QRCodeGenerator 
              value={url} 
              size={220}
              logoUrl="https://dl.dropboxusercontent.com/s/fi/mouik1soo1yaoflt186dp/Logo.png?rlkey=e1ua3zw7f1i9ikvj24b6fxswl&st=h4na5yc9&dl=0"
            />
            
            <p className="mt-4 text-sm text-muted-foreground">
              {title}
            </p>
            
            <div className="mt-4 flex gap-2">
              <Button 
                className="flex-1"
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  toggleQRCode();
                }}
              >
                Copy Link
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={toggleQRCode}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareQRCode;
