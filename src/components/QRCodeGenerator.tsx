
import React, { useState, useEffect, useRef } from 'react';
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
  const [logoLoaded, setLogoLoaded] = useState(false);
  const qrContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use the current site URL if no value is provided
    if (!value) {
      setUrl(window.location.href);
    } else {
      setUrl(value);
    }

    // Preload logo image if provided
    if (logoUrl) {
      const img = new Image();
      img.onload = () => setLogoLoaded(true);
      img.onerror = () => {
        console.error('Failed to load logo image');
        toast.error('Failed to load logo image');
      };
      img.src = logoUrl;
    }
  }, [value, logoUrl]);

  const downloadQRCode = () => {
    try {
      if (!qrContainerRef.current) {
        toast.error('Could not find QR code element');
        return;
      }

      // Get the SVG element
      const svgElement = qrContainerRef.current.querySelector('svg');
      if (!svgElement) {
        toast.error('QR SVG element not found');
        return;
      }

      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        toast.error('Canvas context not available');
        return;
      }

      // Set canvas size
      const padding = includeMargin ? size * 0.1 : 0;
      const totalSize = size + (padding * 2);
      canvas.width = totalSize;
      canvas.height = totalSize;
      
      // Fill with background color
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, totalSize, totalSize);

      // Convert SVG to a data URL
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const DOMURL = window.URL || window.webkitURL || window;
      const url = DOMURL.createObjectURL(svgBlob);
      
      // Create image from SVG
      const img = new Image();
      img.onload = () => {
        // Draw the QR code
        ctx.drawImage(img, padding, padding, size, size);
        
        // Only draw logo if there's no existing logo in the QR code (to avoid duplicates)
        if (logoUrl && !svgElement.querySelector('image')) {
          const logoImg = new Image();
          logoImg.crossOrigin = "anonymous";
          
          logoImg.onload = () => {
            const logoSize = size * 0.22;
            const logoX = (totalSize - logoSize) / 2;
            const logoY = (totalSize - logoSize) / 2;
            
            // Add white background for logo
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(logoX + (logoSize/2), logoY + (logoSize/2), logoSize/2 + 4, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw the logo
            ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
            
            // Create the download link
            const dataUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = dataUrl;
            downloadLink.download = 'kassia-marin-qrcode.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            toast.success('QR code downloaded successfully');
            DOMURL.revokeObjectURL(url);
          };
          
          logoImg.onerror = () => {
            // Still download without logo if logo fails
            const dataUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = dataUrl;
            downloadLink.download = 'kassia-marin-qrcode.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            toast.success('QR code downloaded (without logo)');
            DOMURL.revokeObjectURL(url);
          };
          
          logoImg.src = logoUrl;
        } else {
          // No logo, just download
          const dataUrl = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = dataUrl;
          downloadLink.download = 'kassia-marin-qrcode.png';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          
          toast.success('QR code downloaded successfully');
          DOMURL.revokeObjectURL(url);
        }
      };
      
      img.onerror = () => {
        toast.error('Error loading QR code image');
        DOMURL.revokeObjectURL(url);
      };
      
      img.src = url;
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast.error('Failed to download QR code');
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`} ref={qrContainerRef}>
      <div className="p-2 rounded-md relative" style={{ backgroundColor: bgColor }}>
        <QRCodeSVG 
          value={url}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level="H" // Higher error correction for logo
          includeMargin={includeMargin}
          imageSettings={logoUrl && logoLoaded ? {
            src: logoUrl,
            height: Math.floor(size * 0.2),
            width: Math.floor(size * 0.2),
            excavate: true,
            x: undefined,
            y: undefined,
          } : undefined}
        />
      </div>
      
      {showDownloadButton && (
        <Button 
          onClick={downloadQRCode} 
          className="mt-4 flex items-center gap-2"
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
