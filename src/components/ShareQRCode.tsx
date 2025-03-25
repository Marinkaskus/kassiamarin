
import React, { useState } from 'react';
import { Button } from './ui/button';
import { QrCode, Share2, X, Clipboard, Check } from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { toast } from 'sonner';

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
  const [copied, setCopied] = useState(false);

  const toggleQRCode = () => {
    setIsOpen(!isOpen);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
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
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-sm sm:max-w-md bg-background">
          <DialogHeader>
            <DialogTitle className="text-xl">Share This Page</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Scan the QR code or share the link
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center py-4">
            <QRCodeGenerator 
              value={url} 
              size={220}
              logoUrl="https://dl.dropboxusercontent.com/s/fi/mouik1soo1yaoflt186dp/Logo.png?rlkey=e1ua3zw7f1i9ikvj24b6fxswl&st=h4na5yc9&dl=0"
              showDownloadButton={true}
              className="bg-white p-4 rounded-md shadow-md"
            />
          </div>
          
          <p className="mt-2 text-sm text-center text-muted-foreground">
            {title}
          </p>
          
          <div className="mt-4 flex gap-2">
            <Button 
              className="flex-1 gap-2"
              onClick={copyToClipboard}
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied
                </>
              ) : (
                <>
                  <Clipboard size={16} />
                  Copy Link
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareQRCode;
