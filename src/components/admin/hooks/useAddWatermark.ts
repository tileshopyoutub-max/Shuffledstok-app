import { useState, useEffect } from 'react'
import type { WatermarkSettings } from '../../../shared/types/watermark';

export function useAddWatermark(file: File | null, settings: WatermarkSettings) {

    const [watermarkFile, setWatermarkFile] = useState<Blob | null>(null);

    useEffect(() => {
        if (!file || !settings.enabled) {
            setWatermarkFile(null)
            return
        }

        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.src = objectUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return

            ctx.drawImage(img, 0, 0);

            ctx.font = `${settings.fontSize}px Arial`;

            const opacity = Number(settings.opacity) / 100;
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.textBaseline = `top`;

            let x = 10, y = 10;

            const fontSize = Number(settings.fontSize);
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

            canvas.toBlob((blob) => {
                if (blob) setWatermarkFile(blob)
            }, 'image/png')
        }

        return () => {
            URL.revokeObjectURL(objectUrl)
        }
    }, [file, settings.text, settings.opacity, settings.fontSize, settings.position, settings.enabled])
    

    return {
        watermarkFile
    }

}