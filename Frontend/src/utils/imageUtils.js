/**
 * Image utility functions for client-side processing, cropping, and compression.
 */

/**
 * Center-crops and compresses an image file to a square avatar of optimal dimensions.
 * Compresses raw multi-megabyte photos down to ~25-50KB for instantaneous uploads.
 *
 * @param {File|Blob} file - The image file to compress
 * @param {Object} options - Configuration options
 * @param {number} [options.maxSize=384] - Maximum width and height in pixels
 * @param {number} [options.quality=0.85] - JPEG quality (0.0 to 1.0)
 * @returns {Promise<{ base64: string, sizeKB: number, originalSizeKB: number }>}
 */
export const compressAndCropAvatar = (
  file,
  { maxSize = 384, quality = 0.85 } = {}
) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file provided"));
    }

    const originalSizeKB = Math.round(file.size / 1024);
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Failed to read image file"));

    reader.onload = (e) => {
      const img = new Image();

      img.onerror = () => reject(new Error("Failed to load image"));

      img.onload = () => {
        try {
          const { width, height } = img;

          // Determine square crop bounds (center crop)
          const cropSize = Math.min(width, height);
          const cropX = (width - cropSize) / 2;
          const cropY = (height - cropSize) / 2;

          // Output dimensions (capped to maxSize)
          const outputSize = Math.min(maxSize, cropSize);

          const canvas = document.createElement("canvas");
          canvas.width = outputSize;
          canvas.height = outputSize;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            return reject(new Error("Canvas context is not available"));
          }

          // Use high quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          // Draw square center-crop onto the canvas
          ctx.drawImage(
            img,
            cropX,
            cropY,
            cropSize,
            cropSize,
            0,
            0,
            outputSize,
            outputSize
          );

          // Export as JPEG with given quality
          const base64 = canvas.toDataURL("image/jpeg", quality);

          // Calculate approximate base64 payload size in KB
          const stringLength = base64.length - "data:image/jpeg;base64,".length;
          const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.562489; // accurate base64 decoded estimate
          const sizeKB = Math.round(sizeInBytes / 1024);

          resolve({
            base64,
            sizeKB,
            originalSizeKB,
          });
        } catch (err) {
          reject(err);
        }
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Format bytes into human readable string (KB, MB).
 * @param {number} bytes
 * @returns {string}
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 KB";
  const k = 1024;
  if (bytes < k) return `${bytes} B`;
  const kb = bytes / k;
  if (kb < k) return `${kb.toFixed(1)} KB`;
  const mb = kb / k;
  return `${mb.toFixed(2)} MB`;
};
