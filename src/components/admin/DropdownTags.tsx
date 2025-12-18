import type { Tag } from "../../shared/types/tags";

interface DropdownTagsProps {
    data: Tag[];
    selectedTags: Tag[];
    setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

export default function DropdownTags({ data, selectedTags, setSelectedTags }: DropdownTagsProps) {

    function handleSelectedTag(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedId = Number(e.target.value);
        if (!selectedId) return;

        const tag = data.find(t => t.id === selectedId);
        if (!tag) return;

        if (!selectedTags.some(t => t.id === tag.id)) {
            setSelectedTags([...selectedTags, tag]);
        }
        e.target.value = ''
    }

    function removeTag(tagId: number) {
        setSelectedTags(prev => prev.filter(t => t.id !== tagId));
    }

    return (
        <div>
            <label className="block text-sm font-medium leading-6 text-text-secondary" htmlFor="tags-select">Tags</label>
            <div className="mt-2 relative">
                <select className="block w-full rounded-md border-0 py-2.5 pl-3 pr-10 bg-background text-text-primary shadow-sm ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT sm:text-sm sm:leading-6 appearance-none cursor-pointer"
                    id="tags-select"
                    name="tags"
                    onChange={handleSelectedTag}
                    value={''}>
                    <option disabled value="">Select a tag to add...</option>
                    {data.map(tag => (
                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-secondary">
                    <span className="material-symbols-outlined">expand_more</span>
                </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                {selectedTags.map(viewTag => (
                    <span key={viewTag.id} className="inline-flex items-center rounded-md bg-primary-DEFAULT/20 px-2 py-1 text-sm font-medium text-primary-DEFAULT ring-1 ring-inset ring-primary-DEFAULT/30">
                        {viewTag.name}
                        <button className="group relative ml-1.5 h-3.5 w-3.5 rounded-sm hover:bg-primary-DEFAULT/20 inline-flex items-center justify-center transition-colors"
                            type="button"
                            onClick={() => removeTag(viewTag.id)}>
                            <span className="sr-only">Remove</span>
                            <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                    </span>
                ))}
            </div>
            <p className="mt-2 text-sm text-text-placeholder">Click on the dropdown to add more tags.</p>
        </div>
    )
}