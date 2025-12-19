import { useState, useEffect } from "react";

export function useImageCompressor(file: File | null) {
    const [compressedFile, setCompressedFile] = useState<File | null>(null);

    useEffect(() => {
        if (!file) {
            setCompressedFile(null);
            return;
        }
        
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.src = objectUrl;

        img.onload = () => {
            const canvas = document.createElement("canvas");

            // Ограничение размера (макс ширина/высота)
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
            if (!ctx) return;

            ctx.drawImage(img, 0, 0, width, height);

            const type = "image/jpeg";
            const quality = 0.6;

            const fileName = file.name.replace(/\.\w+$/, '');

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        // Если сжатый файл больше исходного — используем исходный
                        if (blob.size >= file.size) {
                            setCompressedFile(file);
                        } else {
                            const compressed = new File([blob], `${fileName}.jpeg`, { type });
                            setCompressedFile(compressed);
                        }
                    }
                    URL.revokeObjectURL(objectUrl);
                }, type, quality
            );
        };

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [file]);

    return compressedFile;
}