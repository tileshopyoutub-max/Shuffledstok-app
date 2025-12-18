import { useTags } from '../../components/admin/hooks/useTags';
import AdminPageHeader from "../../components/admin/layout/AdminPageHeader";
import EntityTable from "../../components/admin/EntityTable";
import Button from "../../components/admin/ui/Button";
import SearchInput from "../../components/admin/ui/SearchInput";
import Modal from '../../components/admin/ui/Modal';


export default function Tags() {
    const {
        isOpenAddTag,
        setIsOpenAddTag,
        isLoading,
        tagName,
        setTagName,
        editTag,
        setEditTag,
        deleteTagModal,
        setDeleteTagModal,
        visibleTags,
        startIndex,
        endIndex,
        tagsFilter,
        page,
        setPage,
        pages,
        tagsQuery,
        setSearchParams,
        handleAddTag,
        handleEditTag,
        handleDeleteTag
    } = useTags();

    if (isLoading) {
        return <div className="p-8 text-center">Loading tags...</div>;
    }

    return (
        <>
            <AdminPageHeader title="Manage Tags" action={<Button name="add" text="New Tag" onClick={() => setIsOpenAddTag(true)} />} />
            <SearchInput
                value={tagsQuery}
                placeholder="Search tags..."
                onChange={(e) => {
                    setPage(1)
                    const value = e.target.value;
                    value ? setSearchParams({ tags: value }) : setSearchParams({})
                }} />

            <EntityTable
                tableName="Tag"
                data={visibleTags}
                renderRow={({ id, name, usage_count, created_at }) => (
                    <tr key={id} className="border-b border-border-dark hover:bg-border-dark/50">
                        <td className="px-6 py-4 text-white">{name}</td>
                        <td className="px-6 py-4">{usage_count}</td>
                        <td className="px-6 py-4">{new Date(created_at).toISOString().split('T')[0]}</td>
                        <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-4">
                                <button
                                    className="text-slate-400 hover:text-white"
                                    onClick={() => setEditTag({ id, name })}
                                >
                                    <span className="material-symbols-outlined text-xl">edit</span>
                                </button>
                                <button
                                    className="text-slate-400 hover:text-red-500"
                                    onClick={() => setDeleteTagModal({ id, name })}
                                >
                                    <span className="material-symbols-outlined text-xl">delete</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                )}
                startingCurrentPosition={startIndex + 1}
                lastCurrentPosition={endIndex}
                maxCountPosition={tagsFilter.length}
                name="tags"
                pages={pages}
                currentPage={page}
                onPageChange={setPage}
            />

            {isOpenAddTag && (
                <Modal
                    title="Add new tag"
                    handleName="Add"
                    handleAction={handleAddTag}
                    onClose={() => {
                        setIsOpenAddTag(false);
                        setTagName('')
                    }}
                >
                    <input
                        type="text"
                        placeholder="Tag name"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        className="w-full p-2 rounded border bg-component-dark text-white mb-4"
                    />
                </Modal>
            )}

            {editTag && (
                <Modal
                    title="Edit tag"
                    handleName="Save"
                    handleAction={handleEditTag}
                    onClose={() => setEditTag(null)}
                >
                    <input
                        type="text"
                        placeholder="Tag name"
                        value={editTag.name}
                        onChange={(e) => setEditTag({ ...editTag, name: e.target.value })}
                        className="w-full p-2 rounded border bg-component-dark text-white mb-4"
                    />
                </Modal>
            )}

            {deleteTagModal && (
                <Modal
                    title="Confirm Delete"
                    handleName="Delete"
                    handleAction={async () => {
                        if (!deleteTagModal) return;
                        await handleDeleteTag(deleteTagModal.id);
                    }}
                    onClose={() => setDeleteTagModal(null)}
                >
                    <p>Are you sure you want to delete tag "{deleteTagModal.name}"?</p>
                </Modal>
            )}
        </>
    )
}