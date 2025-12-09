interface PaginationProps{
    startingCurrentPosition: number;
    lastCurrentPosition: number;
    maxCountPosition: number;
    name: string;
    pages: number[];
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({startingCurrentPosition, lastCurrentPosition, maxCountPosition, name, pages, currentPage, onPageChange}:PaginationProps){
    return(
        <div className="flex items-center justify-between p-4 text-sm text-text-secondary-dark">
            <span>Showing {startingCurrentPosition} - {lastCurrentPosition} of {maxCountPosition} {name}</span>
            <div className="flex items-center gap-2">
                {pages.map(p => (
                    <button 
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border ${currentPage === p ? 'border-primary bg-primary/20 text-primary' : 'border-border-dark hover:bg-border-dark'}`}>
                        {p}
                    </button>
                ))}
            </div>
        </div>
    )
}
