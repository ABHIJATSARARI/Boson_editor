// @ts-ignore - Pica doesn't have types
import Pica from 'pica';

const pica = new Pica();

export interface ResizedImage {
  src: string;
  width: number;
  height: number;
}

/**
 * Resize an image to a specific width while maintaining aspect ratio
 */
export async function resizeImage(
  file: File,
  maxWidth: number
): Promise<ResizedImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = async () => {
      const aspectRatio = img.height / img.width;
      const newWidth = Math.min(img.width, maxWidth);
      const newHeight = Math.round(newWidth * aspectRatio);

      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;

      const sourceCanvas = document.createElement('canvas');
      sourceCanvas.width = img.width;
      sourceCanvas.height = img.height;
      const ctx = sourceCanvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      try {
        await pica.resize(sourceCanvas, canvas);
        const blob = await pica.toBlob(canvas, 'image/jpeg', 0.9);
        const url = URL.createObjectURL(blob);

        resolve({
          src: url,
          width: newWidth,
          height: newHeight,
        });
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Create multiple image variants (srcset)
 */
export async function createImageVariants(
  file: File,
  widths: number[] = [320, 640, 1200]
): Promise<ResizedImage[]> {
  const variants = await Promise.all(
    widths.map((width) => resizeImage(file, width))
  );
  return variants;
}

/**
 * Crop an image using canvas
 */
export function cropImage(
  imageSrc: string,
  cropArea: { x: number; y: number; width: number; height: number }
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(
        img,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Could not create blob'));
          return;
        }
        const url = URL.createObjectURL(blob);
        resolve(url);
      }, 'image/jpeg', 0.9);
    };

    img.onerror = reject;
    img.src = imageSrc;
  });
}

/**
 * Handle paste event for images
 */
export function handleImagePaste(
  event: ClipboardEvent,
  callback: (file: File) => void
): void {
  const items = event.clipboardData?.items;
  if (!items) return;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.indexOf('image') !== -1) {
      const file = item.getAsFile();
      if (file) {
        callback(file);
      }
    }
  }
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload JPEG, PNG, GIF, or WebP.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 10MB limit.' };
  }

  return { valid: true };
}
