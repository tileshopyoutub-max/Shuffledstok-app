import { useState, useRef } from 'react';
import { useTypedSelector, useTypedDispatch } from '../../../shared/hooks/redux';
import { resetWatermark } from '../../../store/slices/watermarkSlice';
import { useUploadImageMutation } from '../../../shared/api/imagesApi';
import { useAddWatermark } from './useAddWatermark';

export function useAddPhoto() {

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [message, setMessage] = useState<string>("");
    const [dragActive, setDragActive] = useState<boolean>(false);

    const settings = useTypedSelector(state => state.watermark);
    const dispatch = useTypedDispatch();
    const [uploadImage] = useUploadImageMutation();

    const { watermarkFile } = useAddWatermark(selectedFile, settings);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) handleFiles(e.target.files);
    }

    //Для дроп фото
    function handleDrop(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    }

    //Проверка на фото + размер
    function handleFiles(files: FileList) {
        if (!files || files.length === 0) return;

        const file = files[0];

        if (!file.type.startsWith('image/')) {
            setMessage('Error: Only images are supported')
            setSelectedFile(null)
            return
        }

        if (file.size > 10 * 1024 * 1024) {
            setMessage("Error: File is too large. Max size is 10 MB.");
            setSelectedFile(null);
            return
        }

        setSelectedFile(file);
        setMessage('Photo selected')
    }

    //Кнопка отправки
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!selectedFile) {
            alert('Please select a file to upload.')
            return
        }

        if (settings.enabled) {
            if (!settings.fontSize || !settings.text.trim() || !settings.position) {
                alert("Please fill all watermark fields before uploading.")
                return
            }
        }

        if (!title.trim() || !description.trim() || !tags.trim()) {
            alert('Please fill in all fields: title, description, and tags.')
            return
        }

        //Собираемся прокидывать фото + настройки watermark
        const formData = new FormData();
        formData.append("file", selectedFile);

        //Закидываем title, description и tags в formData
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tags", tags);

        if (watermarkFile) {
            formData.append("watermarkFile", watermarkFile, selectedFile.name + '_watermark.png')
        }

        try {
            const result = await uploadImage(formData).unwrap();
            setMessage('The file was uploaded successfully');
            setSelectedFile(null)
            dispatch(resetWatermark())
            setTitle("")
            setDescription("")
            setTags("")
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (err: any) {
            setMessage(`Download error: ${err.error || 'Unknown error'}`)
            setSelectedFile(null)
            dispatch(resetWatermark())
            setTitle("")
            setDescription("")
            setTags("")
        }
    }

    function handleDrag(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        setDragActive(true)
    }

    function handleLeave(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();

        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDragActive(false);
        }
    }

    function resetForm() {
    setSelectedFile(null);
    setTitle('');
    setDescription('');
    setTags('');
    setMessage('');
    setDragActive(false);
    dispatch(resetWatermark());
    if (fileInputRef.current) fileInputRef.current.value = '';
}


    return {
        fileInputRef,
        selectedFile,
        watermarkFile,
        title,
        description,
        tags,
        message,
        dragActive,
        setTitle,
        setDescription,
        setTags,
        handleFileChange,
        handleDrop,
        handleDrag,
        handleLeave,
        handleSubmit,
        resetForm,
    }

}

