import { useState, useRef } from 'react';
import { useTypedSelector, useTypedDispatch } from '../../../shared/hooks/redux';
import { resetWatermark } from '../../../store/slices/watermarkSlice';
import { useUploadImageMutation } from '../../../shared/api/imagesApi';
import { useAddWatermark } from './useAddWatermark';
import { useImageCompressor } from './useImageCompressor';
import { useGetTagsQuery } from '../../../shared/api/tagsApi';


export function useAddPhoto() {

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [message, setMessage] = useState<string>("");
    const [dragActive, setDragActive] = useState<boolean>(false);

    const settings = useTypedSelector(state => state.watermark);
    const dispatch = useTypedDispatch();

    const [uploadImage] = useUploadImageMutation();
    const { data: availableTags = [] } = useGetTagsQuery();

    const compressorFile = useImageCompressor(selectedFile);
    const watermarkFile = useAddWatermark(settings.enabled ? compressorFile : null, settings);

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
            if (!settings.fontSize || !settings.text.trim() || (!settings.loopWatermark && !settings.position)) {
                alert("Please fill all watermark fields before uploading.")
                return
            }
        }

        if (!title.trim() || !description.trim()){
            alert('Please fill in all fields: title, description, and tags.')
            return
        }

        //Собираемся прокидывать фото + настройки watermark
        const formData = new FormData();
        formData.append("file", selectedFile);
        console.log('Отправка оригинал файла, ', selectedFile)
        //Закидываем title, description и tags в formData
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tags", JSON.stringify(selectedTagIds));

        if (watermarkFile) {
            formData.append("watermarkFile", watermarkFile, 'watermark_' + selectedFile.name)
            // console.log('waterm, ', watermarkFile.type, watermarkFile, watermarkFile.size)
        } else {
            formData.append("compressorFile", compressorFile!, 'no_watermark_' + compressorFile!.name)
            // console.log('без ватермарки', compressorFile, compressorFile?.size, compressorFile?.size)
        }

        try {
            await uploadImage(formData).unwrap();
            setMessage('The file was uploaded successfully');
        } catch (err: any) {
            setMessage(`Download error: ${err.error || 'Unknown error'}`)
        } finally {
            resetForm()
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
        selectedTagIds,
        message,
        dragActive,
        availableTags,
        setTitle,
        setDescription,
        setSelectedTagIds,
        handleFileChange,
        handleDrop,
        handleDrag,
        handleLeave,
        handleSubmit,
        resetForm,
        
    }

}

