
import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  className?: string;
  includeMargin?: boolean;
  showDownloadButton?: boolean;
  logoUrl?: string;
  bgColor?: string;
  fgColor?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  value,
  size = 200,
  className = '',
  includeMargin = true,
  showDownloadButton = true,
  logoUrl,
  bgColor = "#ffffff",
  fgColor = "#000000"
}) => {
  const [url, setUrl] = useState(value);

  useEffect(() => {
    // Use the current site URL if no value is provided
    if (!value) {
      setUrl(window.location.href);
    } else {
      setUrl(value);
    }
  }, [value]);

  const downloadQRCode = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      
      // Convert the SVG to canvas and then to a data URL
      const svgElement = document.getElementById('qr-svg');
      if (!svgElement) {
        console.error('QR SVG element not found');
        return;
      }

      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgElement);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
      
      const imgUrl = URL.createObjectURL(svgBlob);
      const img = new Image();
      
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Canvas context not available');
          return;
        }
        
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, size, size);
        
        // If there's a logo, draw it in the center
        if (logoUrl) {
          const logoImg = new Image();
          logoImg.crossOrigin = "anonymous";
          
          logoImg.onload = () => {
            const logoSize = size * 0.2;
            const logoPosition = (size - logoSize) / 2;
            ctx.drawImage(logoImg, logoPosition, logoPosition, logoSize, logoSize);
            
            const link = document.createElement('a');
            link.download = 'kassia-marin-qrcode.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            URL.revokeObjectURL(imgUrl);
            toast.success('QR code downloaded successfully');
          };
          
          logoImg.onerror = (e) => {
            console.error('Error loading logo image:', e);
            // Still allow download without the logo
            const link = document.createElement('a');
            link.download = 'kassia-marin-qrcode.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            URL.revokeObjectURL(imgUrl);
            toast.success('QR code downloaded (without logo)');
          };
          
          logoImg.src = logoUrl;
        } else {
          const link = document.createElement('a');
          link.download = 'kassia-marin-qrcode.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
          URL.revokeObjectURL(imgUrl);
          toast.success('QR code downloaded successfully');
        }
      };
      
      img.onerror = (e) => {
        console.error('Error loading QR code image:', e);
        URL.revokeObjectURL(imgUrl);
        toast.error('Failed to download QR code');
      };
      
      img.src = imgUrl;
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast.error('Failed to download QR code');
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="p-2 rounded-md" style={{ backgroundColor: bgColor }}>
        <QRCodeSVG 
          id="qr-svg"
          value={url}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level="H"
          includeMargin={includeMargin}
          imageSettings={logoUrl ? {
            src: logoUrl,
            height: Math.floor(size * 0.2),
            width: Math.floor(size * 0.2),
            excavate: true,
          } : undefined}
        />
      </div>
      
      {showDownloadButton && (
        <Button 
          onClick={downloadQRCode} 
          className="mt-3 flex items-center gap-2"
          variant="outline"
        >
          <Download size={16} />
          Download QR Code
        </Button>
      )}
    </div>
  );
};

export default QRCodeGenerator;
