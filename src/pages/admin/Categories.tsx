import { useState } from 'react'
import AdminPageHeader from '../../components/admin/layout/AdminPageHeader'
import EntityTable from '../../components/admin/EntityTable'
import Button from '../../components/admin/ui/Button'
import { useGetCategoriesQuery } from '../../shared/api/categoriesApi'
import AddCategoryModal from '../../components/admin/AddCategoryModal'


export default function Categories() {
  const { data: categories = [], isLoading } = useGetCategoriesQuery()
  console.log(categories)

  const [isOpenAddCategory, setIsOpenAddCategory] = useState<boolean>(false)
  if (isLoading) {
        return <div className="p-8 text-center">Loading categories...</div>;
    }
  return (
    <>
      <AdminPageHeader title="Categories" action={<Button name="add" text="Add Category" onClick={() => setIsOpenAddCategory(true)}/>} />
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
                <button className="text-slate-400 hover:text-white">
                  <span className="material-symbols-outlined text-xl">edit</span>
                </button>
                <button className="text-slate-400 hover:text-red-500">
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>
            </td>
          </tr>
        )}
      />
      {isOpenAddCategory && <AddCategoryModal onClose={() => setIsOpenAddCategory(false)}/>}
    </>
  )
}
