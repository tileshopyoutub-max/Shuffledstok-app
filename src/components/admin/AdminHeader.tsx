import UserAvatar from '../../assets/admin/user_avatar_fake.avif'

export default function AdminHeader(){
    return(
        <header className="sticky top-0 z-50 flex items-center justify-end whitespace-nowrap px-10 py-3 bg-background-dark/80 backdrop-blur-sm border-b border-dark-border">
            <div className="flex items-center gap-4">
                <button className="relative text-text-light-secondary">
                    <span className="material-symbols-outlined text-2xl text-slate-400 hover:text-text-light">notifications</span>
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75'></span>
                        <span className='relative inline-flex rounded-full h-2 w-2 bg-primary'></span>
                    </span>
                </button>
                <div className="w-px h-6 bg-dark-border"></div>
                <div className="flex items-center gap-3">
                    <img className="w-8 h-8 rounded-full object-cover" src={UserAvatar} alt="userPhoto" />
                    <div className="flex flex-col">
                        <p className="text-sm font-semibold text-white">Admin</p>
                        <p className="text-xs text-slate-400">admin@shuffledstock.com</p>
                    </div>
                </div>
            </div>
        </header>
    )
}