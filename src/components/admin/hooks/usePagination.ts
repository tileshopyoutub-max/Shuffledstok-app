import { useState, useEffect } from 'react';

interface UsePaginationProps {
    total: number;
    pageSize?: number;
    resetOnTotalChange?: boolean;
}

export function usePagination({ total, pageSize = 10, resetOnTotalChange = false }: UsePaginationProps) {

    useEffect(() => {
        if (resetOnTotalChange) {
            setPage(1);
        }
    }, [total, resetOnTotalChange]);

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