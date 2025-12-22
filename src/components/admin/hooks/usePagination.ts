import { useState } from 'react';

interface UsePaginationProps {
    total: number;
    pageSize?: number;
}

export function usePagination({ total, pageSize = 10}: UsePaginationProps) {
    
    const [page, setPage] = useState(1);

    const maxPage = Math.ceil(total / pageSize);
    const pages = [...Array(maxPage).keys()].map(p => p + 1);

    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, total);

    return {
        page,
        setPage,
        startIndex,
        endIndex,
        pages,
        maxPage,
    };
}