import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AddWatermark from '../../components/admin/AddWatermark';
import { useAddPhoto } from "../../components/admin/hooks/useAddPhoto";


export default function AddNewPhoto() {

    const {
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
        resetForm
    } = useAddPhoto();

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
                            <input className="block w-full rounded-md border-0 py-2.5 pl-3 bg-background text-text-primary placeholder:text-text-placeholder shadow-sm ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT sm:text-sm sm:leading-6"
                                id="title"
                                name="title"
                                placeholder="e.g. Vibrant abstract sticker"
                                type="text"
                                value={title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-text-secondary" htmlFor="description">Description</label>
                        <div className="mt-2">
                            <textarea className="block w-full rounded-md border-0 py-2.5 pl-3 bg-background text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder:text-text-placeholder focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT sm:text-sm sm:leading-6"
                                id="description" name="description"
                                placeholder="A short description of the media file."
                                rows={3}
                                value={description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-text-secondary" htmlFor="tags">Tags</label>
                        <select
                            multiple
                            className="w-full rounded-md bg-background border border-border p-2"
                            value={selectedTagIds.map(String)}
                            onChange={(e) => {
                                const values = Array.from(e.target.selectedOptions).map(opt =>
                                    Number(opt.value)
                                );
                                setSelectedTagIds(values);
                            }}
                        >
                            {availableTags.map(tag => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/*Окно добавления watermark*/}
                    <AddWatermark selectedFile={selectedFile} watermarkFile={watermarkFile} />

                    <div className="pt-4 flex justify-end gap-4">
                        <p>{message}</p>
                        {selectedFile && (
                            <button className="rounded-md bg-surface-accent px-4 py-2 text-sm font-semibold text-text-primary shadow-sm hover:bg-border transition-colors" type="button"
                                onClick={resetForm}>Reset</button>
                        )}
                        <button className="rounded-md bg-primary-DEFAULT px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-DEFAULT transition-colors" type="submit">Upload File</button>
                    </div>
                </form>
            </div>
        </>
    )
}