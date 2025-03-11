
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
        // Create canvas and get context
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Calculate average RGB values
        let totalR = 0, totalG = 0, totalB = 0;
        for (let i = 0; i < data.length; i += 4) {
          totalR += data[i];
          totalG += data[i + 1];
          totalB += data[i + 2];
        }
        
        const pixelCount = data.length / 4;
        const avgR = totalR / pixelCount;
        const avgG = totalG / pixelCount;
        const avgB = totalB / pixelCount;
        
        // Calculate scaling factors
        const avgGray = (avgR + avgG + avgB) / 3;
        const scaleR = avgGray / avgR;
        const scaleG = avgGray / avgG;
        const scaleB = avgGray / avgB;
        
        // Apply white balance correction
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
        ctx.putImageData(imageData, 0, 0);
        
        // Convert to base64
        const adjustedImageBase64 = canvas.toDataURL('image/jpeg', 0.9);
        resolve(adjustedImageBase64);
      } catch (error) {
        console.error('Error processing image:', error);
        reject(error);
      }
    };
    
    img.onerror = (e) => {
      console.error('Failed to load image:', e);
      reject(new Error('Failed to load image'));
    };
    
    // Handle different input types with improved error handling
    try {
      if (typeof imageInput === 'string') {
        // For external URLs, we need to create a proxy or use a CORS-enabled image service
        if (imageInput.startsWith('http') && !imageInput.includes('data:image')) {
          // Convert external URLs to a CORS-friendly format or use a proxy if possible
          img.src = `https://images.weserv.nl/?url=${encodeURIComponent(imageInput)}`;
        } else {
          // It's a base64 or data URL string, use directly
          img.src = imageInput;
        }
      } else if (imageInput instanceof File) {
        // It's a File object, create an object URL
        const fileURL = URL.createObjectURL(imageInput);
        img.src = fileURL;
      } else {
        reject(new Error('Invalid image input type'));
      }
    } catch (error) {
      console.error('Error setting image source:', error);
      reject(new Error('Failed to process image input'));
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
