import { NavLink } from "react-router-dom"
import Icon from "./ui/Icon"
import AdminPanelLogo from '../../assets/admin/AdminPanelLogo.png'

export default function AdminSidebar(){

    function getActiveClass(isActive: boolean): string{
        return isActive ? 'flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 text-primary' :
         'flex items-center gap-3 px-3 py-2 text-text-secondary-dark hover:text-text-main-dark hover:bg-primary/20 rounded-lg'
    }
    // w-64 flex-shrink-0 bg-surface hidden md:flex flex-col
    // flex w-64 flex-col gap-y-6 border-r border-border-dark bg-component-dark/50 p-4
    return(
        <aside className='hidden md:flex flex w-64 flex-col gap-y-6 border-r border-border-dark bg-component-dark/50 p-4'>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-3'>
                    <img className='bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10' src={AdminPanelLogo} alt="LogoPanel" />
                    <div className='flex flex-col'>
                        <h1 className='text-text-main-dark text-base font-medium leading-normal'>ShuffledStock</h1>
                        <p className='text-text-secondary-dark text-sm font-normal leading-normal'>Admin Panel</p>
                    </div>
                </div>
                <nav className='flex flex-col gap-2'>
                    <NavLink to='dashboard' className={({isActive}) => getActiveClass(isActive)}>
                        <Icon name='dashboard'/>
                        <p className="">Dashboard</p>
                    </NavLink>
                    <NavLink to='userManagement' className={({isActive}) => getActiveClass(isActive)}>
                        <Icon name="group" />
                        <p>User Management</p>
                    </NavLink>
                    <NavLink to='categories' className={({isActive}) => getActiveClass(isActive)}>
                        <Icon name="category"/>
                        <p>Categories</p>
                    </NavLink>
                    <NavLink to='tags' className={({isActive}) => getActiveClass(isActive)}>
                        <Icon name="sell"/>
                        <p>Tags</p>
                    </NavLink>
                    <NavLink to='new-photo' className={({isActive}) => getActiveClass(isActive)}>
                        <Icon name="add_box"/>
                        <p>Add New</p>
                    </NavLink>
                    <NavLink to='settings' className={({isActive}) => getActiveClass(isActive)}>
                        <Icon name="settings"/>
                        <p>Settings</p>
                    </NavLink>
                </nav>
            </div>
            <div className='mt-auto flex flex-col gap-1'>
                <NavLink to='help' className={({isActive}) => getActiveClass(isActive)}>
                    <Icon name="help"/>
                    <span className='text-sm font-medium leading-normal'>Help</span>
                </NavLink>
                <NavLink to='logOut' className='flex items-center gap-3 px-3 py-2 text-text-secondary-dark hover:text-text-main-dark hover:bg-primary/20 rounded-lg'>
                    <Icon name="logout"/>
                    <span className="text-sm font-medium leading-normal">Log Out</span>
                </NavLink>
            </div>
        </aside>
    )
}