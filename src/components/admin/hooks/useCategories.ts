import { useState } from 'react';
import { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from '../../../shared/api/categoriesApi';

export function useCategories() {
  const { data: categories = [], isLoading } = useGetCategoriesQuery(undefined, { refetchOnMountOrArgChange: true });

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isOpenAddCategory, setIsOpenAddCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [editCategory, setEditCategory] = useState<{ id: number; name: string } | null>(null);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState<{ id: number; name: string } | null>(null);

  async function handleAddCategory() {
    if (!categoryName.trim() || categoryName.includes(" ")) {
      alert('Category cannot be empty or contain spaces');
      return;
    }
    try {
      await createCategory({ name: categoryName.trim() }).unwrap();
      setCategoryName('');
      setIsOpenAddCategory(false);
    } catch {
      alert('Failed to add category');
    }
  }

  async function handleEditCategory() {
    if (!editCategory?.name.trim() || editCategory.name.includes(" ")) {
      alert('Category cannot be empty or contain spaces');
      return;
    }

    const originalCategory = categories.find(c => c.id === editCategory.id);
    if (!originalCategory || editCategory.name.trim() === originalCategory.name) {
      setEditCategory(null);
      return;
    }

    try {
      await updateCategory({ id: editCategory.id, name: editCategory.name.trim() }).unwrap();
      setEditCategory(null);
    } catch {
      alert('Failed to update category');
    }
  }

  async function handleDeleteCategory(id: number) {
    try {
      await deleteCategory({ id }).unwrap();
      setDeleteCategoryModal(null);
    } catch {
      alert('Failed to delete category');
    }
  }

  return {
    isOpenAddCategory,
    setIsOpenAddCategory,
    categories,
    isLoading,
    categoryName,
    setCategoryName,
    editCategory,
    setEditCategory,
    deleteCategoryModal,
    setDeleteCategoryModal,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory
  };
}