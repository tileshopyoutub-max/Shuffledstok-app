import AdminPageHeader from "../../components/admin/AdminPageHeader";

export default function AddNewPhoto() {
    return (
        <>
            <AdminPageHeader title="Add New File"/>
            <p className="text-text-secondary mt-1">Upload a new media file to the ShuffledStock library.</p>   
            
            <div className="bg-surface p-8 rounded-lg border border-border">
                <form className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="file-upload">Media File</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10 bg-background">
                            <div className="text-center">
                                <span className="material-symbols-outlined text-5xl text-text-placeholder">cloud_upload</span>
                                <div className="mt-4 flex text-sm leading-6 text-text-secondary">
                                    <label className="relative cursor-pointer rounded-md font-semibold text-primary-DEFAULT focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-DEFAULT focus-within:ring-offset-2 focus-within:ring-offset-background hover:text-primary-hover" htmlFor="file-upload">
                                        <span>Upload a file</span>
                                        <input className="sr-only" id="file-upload" name="file-upload" type="file" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-text-placeholder">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-text-secondary" htmlFor="title">Title</label>
                        <div className="mt-2">
                            <input className="block w-full rounded-md border-0 py-2.5 bg-background text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder:text-text-placeholder focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT sm:text-sm sm:leading-6" id="title" name="title" placeholder="e.g. Vibrant abstract sticker" type="text" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-text-secondary" htmlFor="description">Description</label>
                        <div className="mt-2">
                            <textarea className="block w-full rounded-md border-0 py-2.5 bg-background text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder:text-text-placeholder focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT sm:text-sm sm:leading-6" id="description" name="description" placeholder="A short description of the media file." rows={3}></textarea>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-text-secondary" htmlFor="tags">Tags</label>
                        <div className="mt-2">
                            <input className="block w-full rounded-md border-0 py-2.5 bg-background text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder:text-text-placeholder focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT sm:text-sm sm:leading-6" id="tags" name="tags" placeholder="abstract, colorful, modern, sticker" type="text" />
                            <p className="mt-2 text-sm text-text-placeholder">Separate tags with commas.</p>
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end gap-4">
                        <button className="rounded-md bg-surface-accent px-4 py-2 text-sm font-semibold text-text-primary shadow-sm hover:bg-border transition-colors" type="button">Cancel</button>
                        <button className="rounded-md bg-primary-DEFAULT px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-DEFAULT transition-colors" type="submit">Upload File</button>
                    </div>
                </form>
            </div>
        </>
    )
}