import { useSearchParams } from "react-router-dom";
import {useState} from 'react'
import UserTable from "../../components/admin/UserTable";
import Button from "../../components/admin/ui/Button";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import SearchInput from "../../components/admin/ui/SearchInput";

export default function UserManagement(){

    const [page, setPage] = useState(1);

    const [searchParams, setSearchParams] = useSearchParams();
    const userQuery = searchParams.get('users') || '';

    return(
        <>
            <AdminPageHeader 
                title="User Management"
                action={<Button name="add" text="Add New User"/>}/>
            <div className="flex flex-col gap-4">
                
                <SearchInput 
                    value={userQuery}
                    placeholder="Search by name, email..."
                    onChange={(e) => {
                        setPage(1)
                        const value = e.target.value;
                        value ? setSearchParams({users: value}) : setSearchParams({})
                    }}/>


                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex gap-3">
                        <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-component-dark
                         pl-4 pr-2 text-text-secondary-dark hover:bg-border-dark">
                            <p className="text-sm font-medium leading-normal">Role: All</p>
                            <span className="material-symbols-outlined text-lg">expand_more</span>
                         </button>
                        <button></button>
                    </div>
                    <div className="flex gap-2"></div>
                </div>
            </div>
            
            <UserTable page={page} setPage={setPage} search={userQuery}/>
        </>
    )
}