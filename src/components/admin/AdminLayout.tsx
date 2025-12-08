import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'


export default function AdminLayout(){

    return(
        <div className='bg-background-dark font-display text-text-main-dark'>
            <div className='relative flex h-auto min-h-screen w-full flex-col group/design-root'>
                <div className='flex min-h-screen'>
                    <AdminSidebar />
                    <div className='flex-1 flex-col'>
                        <AdminHeader />
                        <main className="p-8 flex flex-col gap-6 ">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

