import AdminPageHeader from '../../components/admin/layout/AdminPageHeader'
import AddWatermark from '../../components/admin/AddWatermark'
import { useAddFile } from '../../components/admin/hooks/useAddFile'
import DropdownSelect from '../../components/admin/DropdownSelect'
import FileDropzone from '../../components/admin/FileDropzone';
import AddDownloadFree from '../../components/admin/AddDownloadFree'


export default function AddNewFile() {
  const {
    fileInputRef,
    file,
    fileType,
    message,
    dragActive,

    title,
    description,
    selectedCategories,
    selectedTags,
    availableCategories,
    availableTags,

    setTitle,
    setDescription,
    setSelectedCategories,
    setSelectedTags,

    watermarkFile,
    handleFileChange,
    handleDrop,
    handleDrag,
    handleLeave,
    handleSubmit,
    resetForm,

    archiveImages,
    archiveImagesInputRef,
    archiveDragActive,
    setArchiveImages,
    handleArchiveDrop,
    handleArchiveDrag,
    handleArchiveLeave,
    removeArchiveImage,
    downloadFree, 
    setDownloadFree,
  } = useAddFile();


  return (
    <>
      <AdminPageHeader title="Add New File" />
      <p className="text-text-secondary mt-1">Upload a new media file to the ShuffledStock library.</p>
      <div className="bg-surface p-8 rounded-lg border border-border">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <FileDropzone
            file={file}
            dragActive={dragActive}
            fileInputRef={fileInputRef}
            accept="image/*,.zip,.rar,.7z"
            onChange={handleFileChange}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleLeave}
            onDrop={handleDrop} />

          {fileType === 'archive' && (
            <>
              <FileDropzone
                file={archiveImages[0]}
                dragActive={archiveDragActive}
                fileInputRef={archiveImagesInputRef}
                inputId="archive-images-upload"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!e.target.files) return;
                  const filesArray = Array.from(e.target.files);
                  setArchiveImages(prev => [...prev, ...filesArray]);
                }}
                onDragEnter={handleArchiveDrag}
                onDragOver={handleArchiveDrag}
                onDragLeave={handleArchiveLeave}
                onDrop={handleArchiveDrop}
                label="Upload images for the current archive"
                description="Upload images for the current archive"
              />


              <div className="mt-2 text-sm text-text-secondary flex flex-wrap gap-2">
                {archiveImages.map((file, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-md bg-primary-DEFAULT/20 px-2 py-1 text-sm font-medium text-primary-DEFAULT ring-1 ring-inset ring-primary-DEFAULT/30"
                  >
                    {file.name}
                    <button
                      type="button"
                      className="ml-1.5 h-3.5 w-3.5 rounded-sm hover:bg-primary-DEFAULT/20 inline-flex items-center justify-center transition-colors"
                      onClick={() => removeArchiveImage(index)}
                    >
                      <span className="sr-only">Remove</span>
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium leading-6 text-text-secondary" htmlFor="title">
              Title
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-2.5 pl-3 bg-background text-text-primary placeholder:text-text-placeholder shadow-sm ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT sm:text-sm sm:leading-6"
                id="title"
                name="title"
                placeholder="e.g. Vibrant abstract sticker"
                type="text"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-text-secondary" htmlFor="description">
              Description
            </label>
            <div className="mt-2">
              <textarea
                className="block w-full rounded-md border-0 py-2.5 pl-3 bg-background text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder:text-text-placeholder focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT sm:text-sm sm:leading-6"
                id="description"
                name="description"
                placeholder="A short description of the media file."
                rows={3}
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}></textarea>
            </div>
          </div>

          <DropdownSelect
            data={availableTags}
            selectedItems={selectedTags}
            setSelectedItems={setSelectedTags}
            getId={t => t.id}
            getLabel={t => t.name}
            label="Tags"
            placeholder="Select a tag..."
            multiple
          />
          <DropdownSelect
            data={availableCategories}
            selectedItems={selectedCategories}
            setSelectedItems={setSelectedCategories}
            getId={c => c.id}
            getLabel={c => c.name}
            label="Categories"
            placeholder="Select a category..."
          />

          <AddDownloadFree selectedFile={file} checked={downloadFree} onChange={setDownloadFree}/>
          {/*Окно добавления watermark*/}
          {fileType === 'image' && file && (
            <AddWatermark selectedFile={file} watermarkFile={watermarkFile} />
          )}

          <div className="pt-4 flex justify-end gap-4">
            <p>{message}</p>
            {file && (
              <button
                className="rounded-md bg-surface-accent px-4 py-2 text-sm font-semibold text-text-primary shadow-sm hover:bg-border transition-colors"
                type="button"
                onClick={resetForm}>
                Reset
              </button>
            )}
            <button
              className="rounded-md bg-primary-DEFAULT px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-DEFAULT transition-colors"
              type="submit">
              Upload File
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
