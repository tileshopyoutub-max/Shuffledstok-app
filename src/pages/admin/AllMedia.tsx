import AdminPageHeader from "../../components/admin/layout/AdminPageHeader"
import SearchInput from "../../components/admin/ui/SearchInput"
import Pagination from '../../components/admin/ui/Pagination'
import { useAllMedia } from '../../components/admin/hooks/useAllMedia'

export default function AllMedia() {

    const selectCategories = ['Wallpapers', 'Icons', 'Sticker', 'Cat'];
    const selectedFormat = ['JPG', 'PNG', 'SVG', 'WEBP']

    const {page, setPage, pages, visibleImages, setSearchParams, imagesQuery, filteredImages} = useAllMedia();

    return (
        <div>
            <AdminPageHeader title="Media Library" />
            <div className="pt-5 pb-4">
                <div className="bg-card-dark border border-border-dark rounded-xl p-3 mb-6 shadow-sm">
                    <div className="flex flex-col xl:flex-row gap-3">
                        <div className="relative flex-1">
                            <SearchInput value={imagesQuery} placeholder="Search by name, ID or tag..." onChange={(e) => {
                                setPage(1);
                                const value = e.target.value
                                value ? setSearchParams({q: value}) : setSearchParams({})
                            }} />
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="relative group">
                                <select
                                    className="appearance-none h-10 bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg pl-3 pr-8 focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer hover:bg-slate-800 transition-colors min-w-[140px]">
                                    <option value="">All Categories</option>
                                    {selectCategories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                    <span className="material-symbols-outlined text-lg">expand_more</span>
                                </div>
                            </div>
                            <div className="relative group">
                                <select className="appearance-none h-10 bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg pl-3 pr-8 focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer hover:bg-slate-800 transition-colors min-w-[100px]">
                                    <option value="">Format</option>
                                    {selectedFormat.map(format => (
                                        <option key={format} value={format}>{format}</option>
                                    ))}
                                </select>
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                    <span className="material-symbols-outlined text-lg">expand_more</span>
                                </div>
                            </div>
                            <div className="relative group">
                                <select
                                    className="appearance-none h-10 bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg pl-9 pr-8 focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer hover:bg-slate-800 transition-colors min-w-[140px]">
                                    <option value="">Date Added</option>
                                    <option value="today">Last 24 Hours</option>
                                    <option value="week">Last 7 Days</option>
                                    <option value="month">Last 30 Days</option>
                                    <option value="custom">Custom Range</option>
                                </select>
                                <div
                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400">
                                    <span className="material-symbols-outlined text-lg">calendar_today</span>
                                </div>
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                    <span className="material-symbols-outlined text-lg">expand_more</span>
                                </div>
                            </div>
                            <div className="hidden sm:block w-px h-6 bg-border-dark mx-1"></div>
                            <div className="relative group">
                                <select
                                    className="appearance-none h-10 bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg pl-3 pr-8 focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer hover:bg-slate-800 transition-colors min-w-[130px]">
                                    <option value="date_desc">Newest First</option>
                                    <option value="date_asc">Oldest First</option>
                                    <option value="name_asc">Name (A-Z)</option>
                                    <option value="popular">Most Popular</option>
                                </select>
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                    <span className="material-symbols-outlined text-lg">sort</span>
                                </div>
                            </div>
                            <button
                                className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-border-dark"
                                title="Reset Filters">
                                <span className="material-symbols-outlined text-xl">restart_alt</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full px-8 pb-2">
                <div
                    className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-border-dark/50">
                    <div className="col-span-4 md:col-span-4 lg:col-span-3">Asset</div>
                    <div className="col-span-2 hidden md:block">Category</div>
                    <div className="col-span-3 hidden lg:block">Tags</div>
                    <div className="col-span-3 md:col-span-3 lg:col-span-2">Date Added</div>
                    <div className="col-span-5 md:col-span-3 lg:col-span-2 text-right">Actions</div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto px-8 pb-8">
                <div className="flex flex-col gap-2">
                    {visibleImages.map(image => (
                        <div key={image.key} className="group grid grid-cols-12 gap-4 items-center bg-component-dark border border-border-dark rounded-lg p-3 hover:border-primary/50 transition-all hover:bg-slate-800/50">
                            <div className="col-span-4 md:col-span-4 lg:col-span-3 flex items-center gap-4">
                                <div className="w-16 h-12 rounded bg-black overflow-hidden shrink-0 relative border border-border-dark">
                                    <img src={image.url} alt={image.title!} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-white font-medium text-sm truncate" title={image.title!}>{image.title}</h3>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5">ID: #{image.id}</p>
                                </div>
                            </div>
                            <div className="col-span-2 hidden md:block">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/20">
                                    Wallpapers
                                </span>
                            </div>
                            <div className="col-span-3 hidden lg:flex flex-wrap gap-1.5">
                                {image.tags.map(tag => (
                                    <span key={tag} className="text-[10px] text-slate-400 bg-background-dark border border-border-dark px-1.5 py-0.5 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="col-span-3 md:col-span-3 lg:col-span-2 text-sm text-slate-400">
                                {new Date(image.created_at).toLocaleDateString()}
                            </div>
                            <div className="col-span-5 md:col-span-3 lg:col-span-2 flex justify-end items-center gap-2">
                                <button
                                    className="p-2 text-slate-400 hover:text-primary hover:bg-slate-700 rounded transition-colors"
                                    title="Edit">
                                    <span className="material-symbols-outlined text-lg">edit</span>
                                </button>
                                <button
                                    className="p-2 text-slate-400 hover:text-danger hover:bg-slate-700 rounded transition-colors"
                                    title="Delete">
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                                <button
                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors lg:hidden"
                                    title="More">
                                    <span className="material-symbols-outlined text-lg">more_vert</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination
                    name='media'
                    currentPage={page}
                    onPageChange={setPage}
                    startingCurrentPosition={1}
                    lastCurrentPosition={visibleImages.length}
                    maxCountPosition={filteredImages.length}
                    pages={pages}/>
            </div>
        </div>
    )
}