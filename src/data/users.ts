import avatar from '../assets/admin/user_avatar_fake.avif'

interface userTypes {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: string;
    status: boolean;
    dateJoined: string;
}

export const users: userTypes[] = [
    {
        id: 1,
        name: 'Olivia Rhye',
        email: 'olivia@shuffledstock.com',
        avatar: avatar,
        role: 'Administrator',
        status: true,
        dateJoined: '2023-01-15'
    },
    {
        id: 2,
        name: 'Phoenix Baker',
        email: 'phoenix@shuffledstock.com',
        avatar: avatar,
        role: 'Content Creator',
        status: true,
        dateJoined: '2023-03-22'
    },
    {
        id: 3,
        name: 'Lana Steiner',
        email: 'lana@shuffledstock.com',
        avatar: avatar,
        role: 'Standard User',
        status: false,
        dateJoined: '2023-03-22'
    },
        {
        id: 4,
        name: 'Demi Wilkinson',
        email: 'demi@shuffledstock.com',
        avatar: avatar,
        role: 'Standard User',
        status: true,
        dateJoined: '2023-08-01'
    },
    {
        id: 5,
        name: 'Olivia Rhye',
        email: 'olivia@shuffledstock.com',
        avatar: avatar,
        role: 'Administrator',
        status: true,
        dateJoined: '2023-01-15'
    },
    {
        id: 6,
        name: 'Olivia Rhye',
        email: 'olivia@shuffledstock.com',
        avatar: avatar,
        role: 'Administrator',
        status: true,
        dateJoined: '2023-01-15'
    },
    {
        id: 7,
        name: 'Olivia Rhye',
        email: 'olivia@shuffledstock.com',
        avatar: avatar,
        role: 'Administrator',
        status: true,
        dateJoined: '2023-01-15'
    },
    {
        id: 8,
        name: 'Olivia Rhye',
        email: 'olivia@shuffledstock.com',
        avatar: avatar,
        role: 'Administrator',
        status: true,
        dateJoined: '2023-01-15'
    },
    {
        id: 9,
        name: 'Olivia Rhye',
        email: 'olivia@shuffledstock.com',
        avatar: avatar,
        role: 'Administrator',
        status: true,
        dateJoined: '2023-01-15'
    },
    {
        id: 10,
        name: 'Olivia Rhye',
        email: 'olivia@shuffledstock.com',
        avatar: avatar,
        role: 'Administrator',
        status: true,
        dateJoined: '2023-01-15'
    },
    {
        id: 11,
        name: 'Olivia Rhye',
        email: 'olivia@shuffledstock.ru',
        avatar: avatar,
        role: 'Administrator',
        status: false,
        dateJoined: '2023-01-15'
    },
]