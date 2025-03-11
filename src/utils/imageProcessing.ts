/**
 * Adjusts white balance of an image using a simple gray world assumption algorithm
 * Can accept either a File object or a base64/data URL string
 */
export const adjustWhiteBalance = async (imageInput: File | string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Add crossOrigin attribute to avoid tainted canvas issues
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      try {
        // Validate image dimensions
        if (img.width === 0 || img.height === 0) {
          reject(new Error('Invalid image dimensions'));
          return;
        }

        // Create canvas and get context
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Clear canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0);
        
        try {
          // Get image data - this can fail with CORS
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Calculate average RGB values
          let totalR = 0, totalG = 0, totalB = 0;
          let pixelCount = 0;
          
          for (let i = 0; i < data.length; i += 4) {
            // Only count non-transparent pixels
            if (data[i + 3] > 0) {
              totalR += data[i];
              totalG += data[i + 1];
              totalB += data[i + 2];
              pixelCount++;
            }
          }
          
          // Check if we have valid pixels
          if (pixelCount === 0) {
            console.warn('No valid pixels found in image');
            resolve(img.src); // Return original image if no valid pixels
            return;
          }
          
          const avgR = totalR / pixelCount;
          const avgG = totalG / pixelCount;
          const avgB = totalB / pixelCount;
          
          // Calculate scaling factors with bounds checking
          const avgGray = (avgR + avgG + avgB) / 3;
          const scaleR = avgGray / (avgR || 1); // Prevent division by zero
          const scaleG = avgGray / (avgG || 1);
          const scaleB = avgGray / (avgB || 1);
          
          // Apply white balance correction
          for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 0) { // Only process non-transparent pixels
              // Red
              data[i] = Math.min(255, Math.max(0, Math.round(data[i] * scaleR)));
              // Green
              data[i + 1] = Math.min(255, Math.max(0, Math.round(data[i + 1] * scaleG)));
              // Blue
              data[i + 2] = Math.min(255, Math.max(0, Math.round(data[i + 2] * scaleB)));
              // Alpha remains unchanged
            }
          }
          
          // Put adjusted image data back on canvas
          ctx.putImageData(imageData, 0, 0);
          
          // Convert to base64 with error handling
          try {
            const adjustedImageBase64 = canvas.toDataURL('image/jpeg', 0.9);
            resolve(adjustedImageBase64);
          } catch (e) {
            console.error('Error converting to base64:', e);
            resolve(img.src); // Fallback to original image
          }
          
        } catch (e) {
          console.error('Error processing image data:', e);
          resolve(img.src); // Fallback to original image
        }
        
      } catch (error) {
        console.error('Error processing image:', error);
        resolve(img.src); // Fallback to original image on error
      }
    };
    
    img.onerror = (e) => {
      console.error('Failed to load image:', e);
      resolve(imageInput); // Return original input on error
    };
    
    // Handle different input types with improved error handling
    try {
      if (typeof imageInput === 'string') {
        if (!imageInput) {
          reject(new Error('Empty image input'));
          return;
        }
        
        // Handle different URL types
        if (imageInput.startsWith('http')) {
          // For external URLs, use a CORS proxy
          img.src = `https://images.weserv.nl/?url=${encodeURIComponent(imageInput)}&n=-1`;
        } else if (imageInput.startsWith('data:image/')) {
          // It's a valid data URL
          img.src = imageInput;
        } else {
          console.warn('Invalid image URL format:', imageInput);
          resolve(imageInput); // Return original on invalid format
          return;
        }
      } else if (imageInput instanceof File) {
        // Create object URL for File objects
        const fileURL = URL.createObjectURL(imageInput);
        img.src = fileURL;
      } else {
        reject(new Error('Invalid image input type'));
      }
    } catch (error) {
      console.error('Error setting image source:', error);
      resolve(imageInput); // Return original input on error
    }
  });
};

/**
 * Process all images in a gallery collection for uniform appearance
 * @param artworks Array of artwork objects
 * @returns Promise with array of processed artworks
 */
export const processGalleryImages = async (artworks: any[]): Promise<any[]> => {
  const processedArtworks = [...artworks];
  const failedImages: number[] = [];
  
  for (let i = 0; i < processedArtworks.length; i++) {
    try {
      // Only process if it's a valid image URL
      if (processedArtworks[i].imageSrc) {
        processedArtworks[i].imageSrc = await adjustWhiteBalance(processedArtworks[i].imageSrc);
        
        // Process additional images if they exist
        if (processedArtworks[i].additionalImages && Array.isArray(processedArtworks[i].additionalImages)) {
          const processedAdditionalImages = [];
          
          for (const additionalImg of processedArtworks[i].additionalImages) {
            try {
              const processedImg = await adjustWhiteBalance(additionalImg);
              processedAdditionalImages.push(processedImg);
            } catch (error) {
              console.error(`Failed to process additional image for artwork ${processedArtworks[i].id}:`, error);
              processedAdditionalImages.push(additionalImg); // Keep original if processing fails
            }
          }
          
          processedArtworks[i].additionalImages = processedAdditionalImages;
        }
      }
    } catch (error) {
      console.error(`Failed to process image for artwork ${processedArtworks[i].id}:`, error);
      failedImages.push(i);
    }
  }
  
  if (failedImages.length > 0) {
    console.warn(`Failed to process ${failedImages.length} images.`);
  }
  
  return processedArtworks;
};

/**
 * Extracts average RGB values from an image
 */
const extractRGBValues = (imageData: ImageData) => {
  const data = imageData.data;
  let totalR = 0, totalG = 0, totalB = 0;
  
  for (let i = 0; i < data.length; i += 4) {
    totalR += data[i];
    totalG += data[i + 1];
    totalB += data[i + 2];
  }
  
  const pixelCount = data.length / 4;
  return {
    avgR: totalR / pixelCount,
    avgG: totalG / pixelCount,
    avgB: totalB / pixelCount
  };
};

/**
 * Creates a canvas with the image and returns its context
 */
const createImageCanvas = (img: HTMLImageElement): [HTMLCanvasElement, CanvasRenderingContext2D] => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  ctx.drawImage(img, 0, 0);
  return [canvas, ctx];
};

/**
 * Loads an image and returns it as a Promise
 */
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    
    if (src.startsWith('http') && !src.includes('data:image')) {
      img.src = `https://images.weserv.nl/?url=${encodeURIComponent(src)}`;
    } else {
      img.src = src;
    }
  });
};

/**
 * Matches white balance and lighting of target image to reference image
 */
export const matchWhiteBalance = async (targetImageSrc: string, referenceImageSrc: string): Promise<string> => {
  try {
    // Load both images
    const [targetImg, referenceImg] = await Promise.all([
      loadImage(targetImageSrc),
      loadImage(referenceImageSrc)
    ]);
    
    // Create canvases for both images
    const [targetCanvas, targetCtx] = createImageCanvas(targetImg);
    const [referenceCanvas, referenceCtx] = createImageCanvas(referenceImg);
    
    // Get image data
    const targetImageData = targetCtx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
    const referenceImageData = referenceCtx.getImageData(0, 0, referenceCanvas.width, referenceCanvas.height);
    
    // Extract RGB values
    const targetRGB = extractRGBValues(targetImageData);
    const referenceRGB = extractRGBValues(referenceImageData);
    
    // Calculate scaling factors
    const scaleR = referenceRGB.avgR / targetRGB.avgR;
    const scaleG = referenceRGB.avgG / targetRGB.avgG;
    const scaleB = referenceRGB.avgB / targetRGB.avgB;
    
    // Apply adjustments
    const data = targetImageData.data;
    for (let i = 0; i < data.length; i += 4) {
      // Red
      data[i] = Math.min(255, Math.max(0, Math.round(data[i] * scaleR)));
      // Green
      data[i + 1] = Math.min(255, Math.max(0, Math.round(data[i + 1] * scaleG)));
      // Blue
      data[i + 2] = Math.min(255, Math.max(0, Math.round(data[i + 2] * scaleB)));
      // Alpha remains unchanged
    }
    
    // Put adjusted image data back on canvas
    targetCtx.putImageData(targetImageData, 0, 0);
    
    // Convert to base64
    return targetCanvas.toDataURL('image/jpeg', 0.9);
  } catch (error) {
    console.error('Error matching white balance:', error);
    throw error;
  }
};

/**
 * Process all images in a gallery to match a reference image
 */
export const matchGalleryImages = async (images: { id: number, imageSrc: string }[], referenceImageSrc: string): Promise<{ id: number, imageSrc: string }[]> => {
  const processedImages = [...images];
  const failedImages: number[] = [];
  
  for (let i = 0; i < processedImages.length; i++) {
    try {
      if (processedImages[i].imageSrc !== referenceImageSrc) {
        processedImages[i].imageSrc = await matchWhiteBalance(
          processedImages[i].imageSrc,
          referenceImageSrc
        );
      }
    } catch (error) {
      console.error(`Failed to process image ${processedImages[i].id}:`, error);
      failedImages.push(i);
    }
  }
  
  if (failedImages.length > 0) {
    console.warn(`Failed to process ${failedImages.length} images`);
  }
  
  return processedImages;
};
