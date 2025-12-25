import { useState, useEffect } from "react";
import type { WatermarkSettings } from '../../../../shared/types/watermark';

export function useArchiveImagesWatermark(files: File[] | null, settings: WatermarkSettings) {
    const [watermarkFiles, setWatermarkFiles] = useState<File[]>([]);

    useEffect(() => {
        if (!files || !files.length || !settings.enabled) {
            setWatermarkFiles([]);
            return;
        }

        let cancelled = false;

        async function addWatermarkAll() {
            const result: File[] = [];

            for (const file of files!) {
                const objectUrl = URL.createObjectURL(file);
                const img = new Image();
                img.src = objectUrl;

                await new Promise<void>(resolve => {
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                });

                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) continue;

                ctx.drawImage(img, 0, 0);

                ctx.font = `${settings.fontSize}px Arial`;
                ctx.fillStyle = `rgba(255, 255, 255, ${settings.opacity / 100})`;
                ctx.textBaseline = 'top';

                let x = 10, y = 10;
                const fontSize = Number(settings.fontSize) || 24;

                if (settings.loopWatermark) {
                    const textWidth = ctx.measureText(settings.text).width;
                    const textHeight = fontSize;
                    for (let y = 0; y < canvas.height; y += textHeight + settings.paddingY) {
                        for (let x = 0; x < canvas.width; x += textWidth + settings.paddingX) {
                            ctx.fillText(settings.text, x, y);
                        }
                    }
                } else {
                    switch (settings.position) {
                        case 'tl': x = 10; y = 10; break;
                        case 'tc': x = canvas.width / 2 - ctx.measureText(settings.text).width / 2; y = 10; break;
                        case 'tr': x = canvas.width - ctx.measureText(settings.text).width - 10; y = 10; break;
                        case 'ml': x = 10; y = canvas.height / 2 - fontSize / 2; break;
                        case 'mc': x = canvas.width / 2 - ctx.measureText(settings.text).width / 2; y = canvas.height / 2 - fontSize / 2; break;
                        case 'mr': x = canvas.width - ctx.measureText(settings.text).width - 10; y = canvas.height / 2 - fontSize / 2; break;
                        case 'bl': x = 10; y = canvas.height - fontSize - 10; break;
                        case 'bc': x = canvas.width / 2 - ctx.measureText(settings.text).width / 2; y = canvas.height - fontSize - 10; break;
                        case 'br': x = canvas.width - ctx.measureText(settings.text).width - 10; y = canvas.height - fontSize - 10; break;
                    }

                    ctx.fillText(settings.text, x, y);
                }

                const type = 'image/jpeg';
                const blob: Blob | null = await new Promise(resolve =>
                    canvas.toBlob(b => resolve(b), type, 0.92)
                );

                URL.revokeObjectURL(objectUrl);

                if (!blob) continue;

                const watermarkedFile = new File([blob], file.name, { type });
                result.push(watermarkedFile);
            }

            if (!cancelled) setWatermarkFiles(result);
        }

        addWatermarkAll();

        return () => { cancelled = true; };
    }, [files, settings]);

    return watermarkFiles;
}