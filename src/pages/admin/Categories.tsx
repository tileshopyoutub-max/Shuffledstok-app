import { useCategories } from '../../components/admin/hooks/useCategories';
import AdminPageHeader from '../../components/admin/layout/AdminPageHeader';
import EntityTable from '../../components/admin/EntityTable';
import Button from '../../components/admin/ui/Button';
import Modal from '../../components/admin/ui/Modal';

export default function Categories() {
  const {
    categories,
    isLoading,
    isOpenAddCategory,
    setIsOpenAddCategory,
    categoryName,
    setCategoryName,
    editCategory,
    setEditCategory,
    deleteCategoryModal,
    setDeleteCategoryModal,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory
  } = useCategories();

  if (isLoading) {
    return <div className="p-8 text-center">Loading categories...</div>;
  }

  return (
    <>
      <AdminPageHeader
        title="Categories"
        action={
          <Button
            name="add"
            text="Add Category"
            onClick={() => setIsOpenAddCategory(true)}
          />
        }
      />

      <EntityTable
        tableName="Categories"
        data={categories}
        renderRow={({ id, name, usage_count, created_at }) => (
          <tr key={id} className="border-b border-border-dark hover:bg-border-dark/50">
            <td className="px-6 py-4 text-white">{name}</td>
            <td className="px-6 py-4">{usage_count}</td>
            <td className="px-6 py-4">{created_at}</td>
            <td className="px-6 py-4 text-right">
              <div className="flex justify-end gap-4">
                <button
                  className="text-slate-400 hover:text-white"
                  onClick={() => setEditCategory({ id, name })}
                >
                  <span className="material-symbols-outlined text-xl">edit</span>
                </button>
                <button
                  className="text-slate-400 hover:text-red-500"
                  onClick={() => setDeleteCategoryModal({ id, name })}
                >
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>
            </td>
          </tr>
        )}
      />

      {isOpenAddCategory && (
        <Modal
          title="Add Category"
          handleName="Add"
          handleAction={handleAddCategory}
          onClose={() => {
            setIsOpenAddCategory(false);
            setCategoryName('');
          }}
        >
          <input
            type="text"
            placeholder="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 rounded border bg-component-dark text-white mb-4"
          />
        </Modal>
      )}

      {editCategory && (
        <Modal
          title="Edit Category"
          handleName="Save"
          handleAction={handleEditCategory}
          onClose={() => setEditCategory(null)}
        >
          <input
            type="text"
            placeholder="Category name"
            value={editCategory.name}
            onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
            className="w-full p-2 rounded border bg-component-dark text-white mb-4"
          />
        </Modal>
      )}

      {deleteCategoryModal && (
        <Modal
          title="Confirm Delete"
          handleName="Delete"
          handleAction={async () => {
            if (!deleteCategoryModal) return;
            await handleDeleteCategory(deleteCategoryModal.id);
          }}
          onClose={() => setDeleteCategoryModal(null)}
        >
          <p>Are you sure you want to delete category "{deleteCategoryModal.name}"?</p>
        </Modal>
      )}
    </>
  );
}
