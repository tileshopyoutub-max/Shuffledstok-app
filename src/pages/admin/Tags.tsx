import {useState} from 'react'
import { useSearchParams } from 'react-router-dom';
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import EntityTable from "../../components/admin/EntityTable";
import Button from "../../components/admin/ui/Button";
import SearchInput from "../../components/admin/ui/SearchInput";
import { useGetImagesQuery } from '../../shared/api/imagesApi';



export default function Tags(){

    const {data: images} = useGetImagesQuery();

    const allTagsMediaCount = images?.reduce<Record<string, { count: number; firstDate: string }>>((acc, img) => {

        const uniqueTags = new Set(img.tags);

        uniqueTags.forEach(tag => {
            const imgDate = img.created_at;
            
            if(!acc[tag]){
                acc[tag] = {count: 1, firstDate: imgDate}
            } else {
                acc[tag].count += 1;
                if(new Date(imgDate) < new Date(acc[tag].firstDate)){
                    acc[tag].firstDate = imgDate
                }
            }
        })

        return acc
    }, {})

    const tagsArray = Object.entries(allTagsMediaCount || {}).map(([tag, info]) => ({
        id: tag,
        tagName: tag,
        mediaCount: info.count,
        dateCreated: new Date(info.firstDate).toISOString().slice(0, 10),
    }))

    console.log(tagsArray)
    
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const tagsQuery = searchParams.get('tags') || '';

    const tagsFilter = tagsArray.filter(t => t.tagName.toLowerCase().includes(tagsQuery.toLowerCase()));

    const maxItemPage = 6;
    const startIndex = (page - 1) * maxItemPage;
    const visibleItem = tagsFilter.slice(startIndex, startIndex + maxItemPage);
    const maxPage = Math.ceil(tagsFilter.length / maxItemPage);
    const pages = [...Array(maxPage).keys()].map(p => p + 1);

    return(
        <>
            <AdminPageHeader title="Manage Tags" action={<Button name="add" text="New Tag"/>}/>
            <SearchInput 
                value={tagsQuery} 
                placeholder="Search tags..." 
                onChange={(e) => {setPage(1)
                const value = e.target.value;
                value ? setSearchParams({tags: value}) : setSearchParams({})}}/>
                
            <EntityTable 
                tableName="Tag"
                data={visibleItem}
                renderRow={({id, tagName, mediaCount, dateCreated}) => (
                        <tr key={id} className="border-b border-border-dark hover:bg-border-dark/50">
                            <td className="px-6 py-4 text-white">{tagName}</td>
                            <td className="px-6 py-4">{mediaCount}</td>
                            <td className="px-6 py-4">{dateCreated}</td>
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
                lastCurrentPosition={startIndex + visibleItem.length}
                maxCountPosition={tagsFilter.length}
                name="tags"
                pages={pages}
                currentPage={page}
                onPageChange={setPage}
            />
        </>
    )
}