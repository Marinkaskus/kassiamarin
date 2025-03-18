
/**
 * Compresses an image file to reduce its size while maintaining quality
 * @param file The image file to compress
 * @param maxWidth Maximum width in pixels
 * @param quality Compression quality (0.0 to 1.0)
 * @returns A compressed image as a base64 data URL
 */
export const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = height * ratio;
        }
        
        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with compression
        const compressedImage = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedImage);
      };
      
      img.onerror = () => {
        reject(new Error('Error loading image'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
  });
};

/**
 * Check if an image URL is valid and can be loaded
 * @param url The image URL to check
 * @returns A promise that resolves to a boolean indicating if the image can be loaded
 */
export const checkImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!url) {
      console.error('Empty image URL provided');
      resolve(false);
      return;
    }
    
    // For data URLs, assume they're valid since they're already loaded
    if (url.startsWith('data:')) {
      resolve(true);
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => {
      console.error(`Failed to load image from URL: ${url}`);
      resolve(false);
    };
    img.src = url;
    
    // Set a timeout in case the image never loads or errors
    setTimeout(() => {
      if (!img.complete) {
        console.warn(`Image load timeout for URL: ${url}`);
        resolve(false);
      }
    }, 10000); // 10 seconds timeout
  });
};

/**
 * Detect browser and device information to help with debugging
 * @returns An object with browser and device information
 */
export const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
  const isIPad = /iPad/.test(ua) || (isIOS && window.innerWidth > 767);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  
  return {
    userAgent: ua,
    isIOS,
    isIPad,
    isSafari,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    pixelRatio: window.devicePixelRatio || 1
  };
};

/**
 * Log detailed information about image loading failures
 * @param imageSrc The source URL of the image
 * @param artworkTitle Optional title for better error identification
 * @param error Optional error object
 */
export const logImageError = (imageSrc: string, artworkTitle?: string, error?: any) => {
  const deviceInfo = getDeviceInfo();
  console.error(`Image load error${artworkTitle ? ` for artwork: ${artworkTitle}` : ''}`, {
    url: imageSrc,
    deviceInfo,
    timestamp: new Date().toISOString(),
    error: error || 'No specific error details'
  });
};
