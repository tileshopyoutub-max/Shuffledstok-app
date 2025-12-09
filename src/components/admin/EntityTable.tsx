import Pagination from "./ui/Pagination";

interface EntityTableProps<T>{
    tableName: string;
    data: T[];
    renderRow: (item: T) => React.ReactNode;

    startingCurrentPosition?: number;
    lastCurrentPosition?: number;
    maxCountPosition?: number;
    name?: string;
    pages?: number[];
    currentPage?: number;
    onPageChange?: (page: number) => void;
}

export default function EntityTable<T>({
    tableName,
    data, 
    renderRow,
    startingCurrentPosition,
    lastCurrentPosition,
    maxCountPosition,
    name,
    pages,
    currentPage,
    onPageChange,
    }:EntityTableProps<T>){

    return(
        <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-900/50">
                    <tr>
                        <th className="px-6 py-3 font-semibold text-white">{tableName} Name</th>
                        <th className="px-6 py-3 font-semibold text-white">Media Count</th>
                        <th className="px-6 py-3 font-semibold text-white">Date Created</th>
                        <th className="px-6 py-3 font-semibold text-white text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderRow)}
                </tbody>
            </table>
            {pages && currentPage && (
                <Pagination startingCurrentPosition={startingCurrentPosition!}
                    lastCurrentPosition={lastCurrentPosition!}
                    maxCountPosition={maxCountPosition!}
                    name={name!}
                    pages={pages}
                    currentPage={currentPage}
                    onPageChange={onPageChange!}/>
            )}
        </div>
    )
}