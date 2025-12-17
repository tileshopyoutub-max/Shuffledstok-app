import { useSearchParams } from 'react-router-dom';
import { useGetTagsQuery } from "../../shared/api/tagsApi";
import { usePagination } from '../../components/admin/hooks/usePagination';
import {useState} from 'react'
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import EntityTable from "../../components/admin/EntityTable";
import Button from "../../components/admin/ui/Button";
import SearchInput from "../../components/admin/ui/SearchInput";
import AddTagModal from '../../components/admin/AddTagModal';




export default function Tags() {

    const { data: tags = [], isLoading } = useGetTagsQuery();
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(tags)

    const [isOpenAddTag, setIsOpenAddTag] = useState<boolean>(false);

    const tagsQuery = searchParams.get('tags') || '';
    const tagsFilter = tags.filter(t => t.name.toLowerCase().includes(tagsQuery.toLowerCase()));

    const { page, setPage, startIndex, endIndex, pages } = usePagination({ total: tagsFilter.length, pageSize: 6, });

    const visibleTags = tagsFilter.slice(startIndex, endIndex);

    if (isLoading) {
        return <div className="p-8 text-center">Loading tags...</div>;
    }


    

    return (
        <>
            <AdminPageHeader title="Manage Tags" action={<Button name="add" text="New Tag" onClick={() => setIsOpenAddTag(true)}/>} />
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
                startingCurrentPosition={startIndex + 1}
                lastCurrentPosition={endIndex}
                maxCountPosition={tagsFilter.length}
                name="tags"
                pages={pages}
                currentPage={page}
                onPageChange={setPage}
            />

            {isOpenAddTag && <AddTagModal onClose={() => setIsOpenAddTag(false)}/>}
        </>
    )
}