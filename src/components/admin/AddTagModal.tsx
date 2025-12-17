import { useState } from 'react'
import { useCreateTagMutation } from '../../shared/api/tagsApi';


interface AddTagModalProps {
    onClose: () => void;
}

export default function AddTagModal({ onClose }: AddTagModalProps) {

    const [tagName, setTagName] = useState('');
    const [createTag] = useCreateTagMutation();

    const handleAdd = async () => {
        if (!tagName.trim()) return;

        try {
            await createTag({ name: tagName.trim() }).unwrap();
            setTagName('');
            onClose();
        } catch (err: any) {
            alert(err?.data?.error || 'Failed to add tag');
        }
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                <div className="bg-component-dark p-6 rounded-xl w-80">
                    <h2 className="text-lg font-semibold mb-4 text-white">Add New Tag</h2>
                    <input
                        type="text"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        placeholder="Tag name"
                        className="w-full p-2 rounded border border-border-dark bg-component-dark text-white mb-4"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 text-white"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-primary rounded hover:bg-primary/80 text-white"
                            onClick={handleAdd}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}