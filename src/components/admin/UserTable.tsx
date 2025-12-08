import { users } from "../../data/users";
import Pagination from "./ui/Pagination";

interface UserTableProps {
    page: number;
    setPage: (page: number) => void;
    search: string;
}

export default function UserTable({page, setPage, search}:UserTableProps){

    const maxUsersPage = 4;
    const startIndex = (page - 1) * maxUsersPage;
    const filterUser = users.filter(user => user.name.toLowerCase().includes(search.toLocaleLowerCase()) 
        || user.email.toLowerCase().includes(search.toLocaleLowerCase()));
    const visibleUsers = filterUser.slice(startIndex, startIndex + maxUsersPage);

    const maxPage = Math.ceil(filterUser.length / maxUsersPage);
    const pages = [...Array(maxPage).keys()].map(p => p + 1)

    return(
        <div className="overflow-x-auto bg-component-dark rounded-xl border border-border-dark">
            <table className="w-full text-left">
                <thead className="border-b border-border-dark">
                    <tr className="text-sm text-text-secondary-dark">
                        <th className="p-4 font-medium">
                            <input className="form-checkbox rounded bg-component-dark border-border-dark text-primary focus:ring-primary/50" type="checkbox" />
                        </th>
                        <th className="p-4 font-medium">User</th>
                        <th className="p-4 font-medium">Role</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Date Joined</th>
                        <th className="p-4 font-medium text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    
                    {visibleUsers
                    .map(({id, avatar, name, email, role, status, dateJoined}) => {
                        // Вынес изменение цвета статуса в отдельные переменные т.к. при условном рендере отрабатывал криво
                        const statusColor = status ? 'inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-2.5 py-1 text-xs font-medium text-green-400'
                            : 'inline-flex items-center gap-1.5 rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-medium text-red-400';

                        const statusColorRounded = status ? 'size-1.5 rounded-full bg-green-500' : 'size-1.5 rounded-full bg-red-500';

                        return(
                            <tr key={id} className="border-b border-border-dark hover:bg-border-dark/50">
                                <td className="p-4">
                                    <input className="form-checkbox rounded bg-component-dark border-border-dark text-primary focus:ring-primary/50" type="checkbox" />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img className="size-10 rounded-full object-cover" src={avatar} alt="avatar" />
                                        <div>
                                            <p className="font-medium text-text-main-dark">{name}</p>
                                            <p className="text-sm text-text-secondary-dark">{email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-text-secondary-dark">{role}</td>
                                <td className="p-4">
                                    <span className={statusColor}>
                                        <span className={statusColorRounded}></span>
                                        {status ? 'Active' : 'Blocked'}
                                    </span>
                                </td>
                                <td className="p-4 text-text-secondary-dark">{dateJoined}</td>
                                <td className="p-4">
                                    <div className="flex justify-center gap-2">
                                        <button className="p-2 text-text-secondary-dark rounded-md hover:bg-border-dark hover:text-text-main-dark">
                                            <span className="material-symbols-outlined text-xl">edit</span>
                                        </button>
                                        <button className="p-2 text-text-secondary-dark rounded-md hover:bg-border-dark hover:text-red-400">
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
            <Pagination 
                startingCurrentPosition={startIndex + 1}
                lastCurrentPosition={startIndex + visibleUsers.length}
                maxCountPosition={filterUser.length}
                name="users"
                pages={pages}
                currentPage={page}
                onPageChange={setPage}
            />
        </div>
    )
}
