interface FileDropzoneProps {
    file: File | null;
    dragActive: boolean;
    fileInputRef?: React.RefObject<HTMLInputElement | null>;
    accept?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDragEnter: (e: React.DragEvent<HTMLElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLElement>) => void;
    onDragLeave: (e: React.DragEvent<HTMLElement>) => void;
    onDrop: (e: React.DragEvent<HTMLElement>) => void;
    label?: string;
    description?: string;
    inputId?: string;
}

export default function FileDropzone({
    file,
    dragActive,
    fileInputRef,
    accept,
    onChange,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    label = 'Media File',
    description = 'PNG, JPG, GIF, ZIP, RAR, 7Z up to 10MB',
    inputId
}: FileDropzoneProps) {

    return (
        <div onDragEnter={onDragEnter} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
            <label className="block text-sm font-medium text-text-secondary mb-2">{label}</label>
            <label htmlFor="file-upload" className="cursor-pointer">
                <div
                    className={`mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10 ${dragActive ? 'bg-blue-700' : 'bg-background'
                        }`}>
                    <div className="text-center">
                        <span className="material-symbols-outlined text-5xl text-text-placeholder">
                            {file ? 'check_circle' : 'cloud_upload'}
                        </span>

                        <div className="mt-4 flex text-sm leading-6 text-text-secondary">
                            <label
                                className="relative cursor-pointer rounded-md font-semibold text-primary-DEFAULT focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-DEFAULT focus-within:ring-offset-2 focus-within:ring-offset-background hover:text-primary-hover"
                                htmlFor={inputId || 'file-upload'}>
                                <span>{file ? file.name : 'Upload a file or drag and drop'}</span>
                                <input
                                    ref={fileInputRef}
                                    className="sr-only"
                                    id={inputId || 'file-upload'}
                                    name="file-upload"
                                    type="file"
                                    accept={accept}
                                    onChange={onChange}
                                />
                            </label>
                        </div>
                        <p className="text-xs leading-5 text-text-placeholder">{description}</p>
                    </div>
                </div>
            </label>
        </div>
    )

}