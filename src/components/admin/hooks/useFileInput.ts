import { useState, useRef } from 'react'

const ARCHIVE_EXTENSION = /\.(zip|rar|7z)$/i;

export type FileType = 'image' | 'archive' | 'unknown';

export function useFileInput(options?: { maxSizeMB?: number }) {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState<FileType>('unknown');
    const [message, setMessage] = useState('');
    const [dragActive, setDragActive] = useState(false);

    const archiveImagesInputRef = useRef<HTMLInputElement | null>(null);
    const [archiveImages, setArchiveImages] = useState<File[]>([]);
    const [archiveDragActive, setArchiveDragActive] = useState(false);

    function detectFileType(file: File): FileType {
        if (file.type.startsWith('image/')) return 'image';
        if (ARCHIVE_EXTENSION.test(file.name)) return 'archive';

        return 'unknown'
    }

    function validateFile(file: File) {
        const maxSize = (options?.maxSizeMB ?? 10) * 1024 * 1024;
        if (file.size > maxSize) {
            return `File is too large. Max ${options?.maxSizeMB ?? 10} MB`;
        }
        return null
    }

    function handleFiles(files: FileList) {
        const file = files[0];

        if (!file) return;

        const error = validateFile(file);

        if (error) {
            setMessage(error);
            reset()
            return;
        }

        const type = detectFileType(file);
        if (type === 'unknown') {
            setMessage('Unsupported file type');
            reset();
            return;
        }

        setFile(file);
        setFileType(type)
        setMessage(`${type === 'image' ? 'Image' : 'Archive'} selected`);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;

        setFile(null);
        setFileType('unknown');

        handleFiles(e.target.files);
        e.target.value = '';
    }

    function handleDrop(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
    }

    function handleDrag(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        setDragActive(true);
    }

    function handleLeave(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDragActive(false);
        }
    }

    function handleArchiveDrop(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        setArchiveDragActive(false);
        if (e.dataTransfer.files) {
            const filesArray = Array.from(e.dataTransfer.files);
            setArchiveImages(prev => [...prev, ...filesArray]);
        }
    }

    function handleArchiveDrag(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        setArchiveDragActive(true);
    }

    function handleArchiveLeave(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setArchiveDragActive(false);
        }
    }

    function removeArchiveImage(index: number) {
        setArchiveImages(prev => {
            const newArr = prev.filter((_, i) => i !== index);
            if (archiveImagesInputRef.current) archiveImagesInputRef.current.value = '';
            return newArr;
        });
    }

    function reset() {
        setFile(null);
        setFileType('unknown');
        setDragActive(false);
        setArchiveImages([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (archiveImagesInputRef.current) archiveImagesInputRef.current.value = '';
    }

    return {
        fileInputRef,
        file,
        fileType,
        message,
        dragActive,
        handleFileChange,
        handleDrop,
        handleDrag,
        handleLeave,
        reset,
        setMessage,
        archiveImages,
        archiveImagesInputRef,
        archiveDragActive,
        handleArchiveDrop,
        handleArchiveDrag,
        handleArchiveLeave,
        setArchiveImages,
        removeArchiveImage
    };
}