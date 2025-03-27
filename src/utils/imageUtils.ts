
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

/**
 * Preload images to improve loading speed
 * @param urls Array of image URLs to preload
 * @param priority 'high' for critical images, 'low' for less important ones
 * @returns A promise that resolves when all images are preloaded or rejected
 */
export const preloadImages = (urls: string[], priority: 'high' | 'low' = 'low'): Promise<void> => {
  return new Promise((resolve) => {
    if (!urls.length) {
      resolve();
      return;
    }
    
    let loadedCount = 0;
    const totalImages = urls.length;
    
    // Create an array to track whether each image has been processed
    const processed = new Array(totalImages).fill(false);
    
    // Check if all images have been processed
    const checkAllProcessed = () => {
      if (processed.every(status => status)) {
        resolve();
      }
    };
    
    urls.forEach((url, index) => {
      // Skip empty or invalid URLs
      if (!url || url === 'undefined' || url === 'null') {
        processed[index] = true;
        checkAllProcessed();
        return;
      }
      
      const img = new Image();
      
      // Set the loading priority
      if ('loading' in HTMLImageElement.prototype) {
        img.loading = priority === 'high' ? 'eager' : 'lazy';
      }
      
      // Set fetch priority if supported (Chrome 73+)
      if ('fetchPriority' in HTMLImageElement.prototype) {
        (img as any).fetchPriority = priority === 'high' ? 'high' : 'low';
      }
      
      // Add event listeners
      img.onload = () => {
        loadedCount++;
        processed[index] = true;
        checkAllProcessed();
      };
      
      img.onerror = () => {
        console.warn(`Failed to preload image: ${url}`);
        processed[index] = true;
        checkAllProcessed();
      };
      
      // Start loading the image
      img.src = url;
    });
    
    // Set a maximum time to wait for all images
    setTimeout(() => {
      const remaining = processed.filter(status => !status).length;
      if (remaining > 0) {
        console.warn(`Preload timeout: ${remaining}/${totalImages} images didn't load in time`);
        processed.fill(true);
        resolve();
      }
    }, 15000);
  });
};

/**
 * Load an image with optimized settings
 * @param src Image source URL
 * @param options Additional loading options
 * @returns A promise that resolves with the loaded image element
 */
export const loadOptimizedImage = (
  src: string, 
  options: {
    decoding?: 'auto' | 'sync' | 'async';
    fetchPriority?: 'high' | 'low' | 'auto';
    sizes?: string;
    loading?: 'eager' | 'lazy';
    crossOrigin?: 'anonymous' | 'use-credentials';
    maxWidth?: number;
  } = {}
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Set optional attributes if provided
    if (options.decoding) img.decoding = options.decoding;
    if (options.fetchPriority && 'fetchPriority' in HTMLImageElement.prototype) {
      (img as any).fetchPriority = options.fetchPriority;
    }
    if (options.sizes) img.sizes = options.sizes;
    if (options.loading) img.loading = options.loading;
    if (options.crossOrigin) img.crossOrigin = options.crossOrigin;
    
    // Add event listeners
    img.onload = () => resolve(img);
    img.onerror = (e) => {
      logImageError(src, undefined, e);
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    // Start loading the image
    img.src = src;
  });
};

/**
 * Optimizes image loading by using appropriate techniques based on the browser and connection
 * @param imgElement The image element to optimize
 */
export const optimizeImageElement = (imgElement: HTMLImageElement): void => {
  if (!imgElement) return;
  
  // Use native lazy loading if supported
  if ('loading' in HTMLImageElement.prototype) {
    imgElement.loading = 'lazy';
  }
  
  // Use async decoding if supported
  if ('decoding' in HTMLImageElement.prototype) {
    imgElement.decoding = 'async';
  }
  
  // Add CORS settings if needed for external images
  const isCrossOrigin = imgElement.src.startsWith('http') && 
                       !imgElement.src.includes(window.location.hostname);
  if (isCrossOrigin) {
    imgElement.crossOrigin = 'anonymous';
  }
  
  // Use the browser's image optimizations where available
  const connection = (navigator as any).connection;
  const isSaveData = connection?.saveData;
  
  if (isSaveData) {
    // If user has data-saving mode on, use lower quality images
    imgElement.setAttribute('loading', 'lazy');
    
    // Disable any animations or effects on the image
    imgElement.style.animation = 'none';
    imgElement.style.transition = 'none';
  }
};

/**
 * Add a blur-up loading effect to an image
 * @param imgElement The image element to enhance
 * @param lowQualityPlaceholder Optional low-quality image placeholder URL
 */
export const addBlurUpEffect = (
  imgElement: HTMLImageElement, 
  lowQualityPlaceholder?: string
): void => {
  if (!imgElement) return;
  
  // Save the original source
  const originalSrc = imgElement.src;
  
  // Create a placeholder if not provided
  if (!lowQualityPlaceholder) {
    // Create a tiny placeholder (e.g., 10px wide version of the image)
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, 10, 10);
      lowQualityPlaceholder = canvas.toDataURL('image/jpeg', 0.1);
    }
  }
  
  // Apply styles for the blur-up effect
  imgElement.style.filter = 'blur(20px)';
  imgElement.style.transition = 'filter 0.3s ease-out';
  
  // Load the low-quality placeholder first
  if (lowQualityPlaceholder) {
    imgElement.src = lowQualityPlaceholder;
  }
  
  // Then load the full quality image
  const fullQualityImage = new Image();
  fullQualityImage.onload = () => {
    imgElement.src = originalSrc;
    imgElement.style.filter = 'blur(0)';
  };
  
  // Start loading the full quality image
  fullQualityImage.src = originalSrc;
};

/**
 * Determine if an image should be loaded based on network conditions
 * @returns A boolean indicating if high-quality images should be loaded
 */
export const shouldLoadHighQualityImages = (): boolean => {
  const connection = (navigator as any).connection;
  
  if (!connection) {
    return true; // Default to high quality if Connection API not available
  }
  
  // Check for save-data mode
  if (connection.saveData) {
    return false;
  }
  
  // Check connection type
  const slowConnections = ['slow-2g', '2g', '3g'];
  if (connection.effectiveType && slowConnections.includes(connection.effectiveType)) {
    return false;
  }
  
  return true;
};
