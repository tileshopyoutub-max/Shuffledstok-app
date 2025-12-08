interface categoriesProps {
    id: number;
    name: string;
    mediaCount: number;
    dateCreated: string; 
}

export const categories: categoriesProps[] = [
    {
        id: 1,
        name: 'Wallpapers',
        mediaCount: 1204,
        dateCreated: '2023-01-15'
    },
    {
        id: 2,
        name: 'Icons',
        mediaCount: 876,
        dateCreated: '2023-02-10'
    },
    {
        id: 3,
        name: 'Stickers',
        mediaCount: 543,
        dateCreated: '2023-03-05'
    },
    {
        id: 4,
        name: 'Abstract',
        mediaCount: 312,
        dateCreated: '2023-04-20'
    },
    {
        id: 5,
        name: 'Nature',
        mediaCount: 489,
        dateCreated: '2023-05-12'
    },
    {
        id: 6,
        name: 'Technology',
        mediaCount: 630,
        dateCreated: '2023-06-18'
    }
]