import { useState, useEffect } from "react";


export function useArchiveImagesCompressor(files: File[] | null) {
    const [compressorFile, setCompressorFile] = useState<File[]>([]);

    useEffect(() => {
        if (!files || !files.length) {
            setCompressorFile([]);
            return
        }

        let cancelled = false;

        async function compressorAll() {
            const result: File[] = [];

            for (const file of files!) {
                const objectUrl = URL.createObjectURL(file);
                const img = new Image();
                img.src = objectUrl;

                await new Promise<void>(resolve => {
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                })

                const canvas = document.createElement('canvas');

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

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    URL.revokeObjectURL(objectUrl);
                    continue;
                }

                ctx.drawImage(img, 0, 0, width, height);

                const type = "image/jpeg";
                const quality = 0.6;

                const fileName = file.name.replace(/\.\w+$/, '');

                const blob: Blob | null = await new Promise(resolve =>
                    canvas.toBlob(b => resolve(b), type, quality)
                );

                URL.revokeObjectURL(objectUrl);

                if (!blob) continue;

                if (blob.size >= file.size) {
                    result.push(file)
                } else {
                    const compressed = new File([blob], `${fileName}.jpeg`, { type });
                    result.push(compressed)
                }
            }
            if (!cancelled) {
                setCompressorFile(result);
            }

        }

        compressorAll();

        return () => {
            cancelled = true;
        }
    }, [files])

    return compressorFile
}