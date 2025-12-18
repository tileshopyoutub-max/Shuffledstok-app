import AdminPageHeader from "../../components/admin/layout/AdminPageHeader";
import EntityTable from "../../components/admin/EntityTable";
import Button from "../../components/admin/ui/Button";
import { categories } from "../../data/categories";

export default function Categories(){
    return(
        <>
            <AdminPageHeader 
                title="Categories"
                action={<Button name="add" text="Add Category"/>}/>
            <EntityTable 
            tableName="Categories"
            data={categories} 
            renderRow={({id, name, mediaCount, dateCreated}) => (
                        <tr key={id} className="border-b border-border-dark hover:bg-border-dark/50">
                            <td className="px-6 py-4 text-white">{name}</td>
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
                    )}/>
        </>
    )
}


