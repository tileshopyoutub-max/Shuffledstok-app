import { store } from '../../store/store';
import { imagesApi } from '../../shared/api/imagesApi';
import { useState, useRef, useEffect } from 'react'
import { useTypedSelector, useTypedDispatch } from '../../shared/hooks/redux';
import { resetWatermark } from '../../store/slices/watermarkSlice';
// import { useUploadImageMutation } from '../../shared/api/imagesApi';
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AddWatermark from '../../components/admin/AddWatermark';



export default function AddNewPhoto() {

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [watermarkFile, setWatermarkFile] = useState<Blob | null>(null);

    const [message, setMessage] = useState<string>("");
    const [dragActive, setDragActive] = useState<boolean>(false);

    const settings = useTypedSelector(state => state.watermark);
    const dispatch = useTypedDispatch();
    // const [uploadImage] = useUploadImageMutation();

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

    useEffect(() => {
        if (selectedFile && settings.enabled) {
            applyWatermark()
        } else {
            setWatermarkFile(null)
        }
    }, [selectedFile, settings])

    //Функция добавления вотермарки на фото 
    async function applyWatermark() {
        if (!selectedFile || !settings.enabled) return;

        const img = new Image();
        img.src = URL.createObjectURL(selectedFile);

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
    }


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

        //Собираемся прокидывать фото + настройки watermark
        const formData = new FormData();
        formData.append("file", selectedFile);

        if (watermarkFile) {
            formData.append("watermarkFile", watermarkFile, selectedFile.name + '_watermark.png')
        }

        try {
            const result = await store.dispatch(imagesApi.endpoints.uploadImage.initiate(formData)).unwrap();
            // const result = await uploadImage(selectedFile).unwrap();
            console.log('Загрузка успешна', result)
            setMessage('The file was uploaded successfully');
            setSelectedFile(null)
            dispatch(resetWatermark())
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (err: any) {
            console.log('Ошибка загрузки: ', err)
            setMessage(`Download error: ${err.error || 'Unknown error'}`)
            setSelectedFile(null)
            dispatch(resetWatermark())
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


    return (
        <>
            <AdminPageHeader title="Add New File" />
            <p className="text-text-secondary mt-1">Upload a new media file to the ShuffledStock library.</p>
            <div className="bg-surface p-8 rounded-lg border border-border">
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleLeave} onDrop={handleDrop}>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Media File</label>
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <div className={`mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10 ${dragActive ? 'bg-blue-700' : 'bg-background'}`}>
                                <div className="text-center">
                                    <span className="material-symbols-outlined text-5xl text-text-placeholder">{selectedFile ? 'check_circle' : 'cloud_upload'}</span>

                                    <div className="mt-4 flex text-sm leading-6 text-text-secondary">
                                        <label className="relative cursor-pointer rounded-md font-semibold text-primary-DEFAULT focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-DEFAULT focus-within:ring-offset-2 focus-within:ring-offset-background hover:text-primary-hover" htmlFor="file-upload">
                                            <span>{selectedFile ? selectedFile.name : 'Upload a file or drag and drop'}</span>
                                            <input ref={fileInputRef} className="sr-only" id="file-upload" name="file-upload" type="file" onChange={handleFileChange} />
                                        </label>
                                    </div>
                                    <p className="text-xs leading-5 text-text-placeholder">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-text-secondary" htmlFor="title">Title</label>
                        <div className="mt-2">
                            <input className="block w-full rounded-md border-0 py-2.5 pl-3 bg-background text-text-primary placeholder:text-text-placeholder shadow-sm ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT sm:text-sm sm:leading-6" id="title" name="title" placeholder="e.g. Vibrant abstract sticker" type="text" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-text-secondary" htmlFor="description">Description</label>
                        <div className="mt-2">
                            <textarea className="block w-full rounded-md border-0 py-2.5 pl-3 bg-background text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder:text-text-placeholder focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT sm:text-sm sm:leading-6" id="description" name="description" placeholder="A short description of the media file." rows={3}></textarea>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-text-secondary" htmlFor="tags">Tags</label>
                        <div className="mt-2">
                            <input className="block w-full rounded-md border-0 py-2.5 pl-3 bg-background text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder:text-text-placeholder focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT sm:text-sm sm:leading-6" id="tags" name="tags" placeholder="abstract, colorful, modern, sticker" type="text" />
                            <p className="mt-2 text-sm text-text-placeholder">Separate tags with commas.</p>
                        </div>
                    </div>

                    {/* Ватермарк часть */}
                    <AddWatermark selectedFile={selectedFile} watermarkFile={watermarkFile} />


                    <div className="pt-4 flex justify-end gap-4">
                        <p>{message}</p>
                        {selectedFile && (
                            <button className="rounded-md bg-surface-accent px-4 py-2 text-sm font-semibold text-text-primary shadow-sm hover:bg-border transition-colors" type="button"
                                onClick={() => {
                                    setSelectedFile(null)
                                    setDragActive(false)
                                    setMessage("")
                                    dispatch(resetWatermark())
                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                }}>Reset</button>
                        )}

                        <button className="rounded-md bg-primary-DEFAULT px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-DEFAULT transition-colors" type="submit">Upload File</button>

                    </div>
                </form>
            </div>
        </>
    )
}
