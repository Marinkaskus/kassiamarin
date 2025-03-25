
import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

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
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'kassia-marin-qrcode.png';
    
    // Convert the SVG to canvas and then to a data URL
    const svgElement = document.getElementById('qr-svg');
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
    
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, size, size);
      
      // If there's a logo, draw it in the center
      if (logoUrl) {
        const logoImg = new Image();
        logoImg.onload = () => {
          const logoSize = size * 0.2;
          const logoPosition = (size - logoSize) / 2;
          ctx.drawImage(logoImg, logoPosition, logoPosition, logoSize, logoSize);
          
          link.href = canvas.toDataURL('image/png');
          link.click();
        };
        logoImg.src = logoUrl;
      } else {
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };
    
    img.src = url;
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="bg-white p-4 rounded-md shadow-md">
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
      
      {/* Hidden canvas used for download functionality */}
      <canvas id="qr-code" style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default QRCodeGenerator;
