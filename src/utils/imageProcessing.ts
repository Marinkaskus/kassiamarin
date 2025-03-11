/**
 * Adjusts white balance of an image using a simple gray world assumption algorithm
 */
export const adjustWhiteBalance = async (imageFile: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
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
        reject(error);
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(imageFile);
  });
};
