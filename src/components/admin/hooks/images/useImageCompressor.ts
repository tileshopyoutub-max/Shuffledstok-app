import { useState, useEffect, useRef } from "react";

export type ImageCompressorOptions = {
  /** Sticker uploads: PNG preview with alpha preserved */
  preserveAlpha?: boolean;
};

export function useImageCompressor(
  file: File | null,
  options?: ImageCompressorOptions
) {
  const preserveAlpha = options?.preserveAlpha ?? false;
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const generationRef = useRef(0);

  useEffect(() => {
    if (!file) {
      return;
    }

    const generation = ++generationRef.current;
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = objectUrl;

    const applyResult = (next: File | null) => {
      if (generation !== generationRef.current) return;
      setCompressedFile(next);
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");

      const maxWidth = 1920;
      const maxHeight = 1080;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = width * ratio;
        height = height * ratio;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        applyResult(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      const type = preserveAlpha ? "image/png" : "image/jpeg";
      const quality = preserveAlpha ? undefined : 0.6;
      const extension = preserveAlpha ? "png" : "jpeg";
      const fileName = file.name.replace(/\.\w+$/, "");

      canvas.toBlob(
        (blob) => {
          if (generation !== generationRef.current) {
            URL.revokeObjectURL(objectUrl);
            return;
          }

          if (blob) {
            if (blob.size >= file.size) {
              applyResult(file);
            } else {
              applyResult(
                new File([blob], `${fileName}.${extension}`, { type })
              );
            }
          } else {
            applyResult(file);
          }
          URL.revokeObjectURL(objectUrl);
        },
        type,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      applyResult(file);
    };

    return () => {
      generationRef.current += 1;
      URL.revokeObjectURL(objectUrl);
    };
  }, [file, preserveAlpha]);

  if (!file) {
    return null;
  }

  return compressedFile;
}
