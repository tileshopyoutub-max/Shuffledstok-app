import { useSearchParams } from "react-router-dom";
import UserTable from "../../components/admin/UserTable";
import Button from "../../components/admin/ui/Button";
import AdminPageHeader from "../../components/admin/layout/AdminPageHeader";
import SearchInput from "../../components/admin/ui/SearchInput";
import { useMemo, useState } from "react";
import { users as initialUsers } from "../../data/users";
import type { userTypes } from "../../data/users";

export default function UserManagement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const userQuery = searchParams.get("users") || "";

  const [users, setUsers] = useState<userTypes[]>(initialUsers);

  const filteredUsers = useMemo(() => {
    const q = userQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, userQuery]);

  function updateUser(id: number, patch: Partial<userTypes>) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  }

  return (
    <>
      <AdminPageHeader
        title="User Management"
        action={<Button name="add" text="Add New User" />}
      />
      <div className="flex flex-col gap-4">
        <SearchInput
          value={userQuery}
          placeholder="Search by name, email..."
          onChange={(e) => {
            const value = e.target.value;
            value ? setSearchParams({ users: value }) : setSearchParams({});
          }}
        />

        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-3">
            <button
              className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-component-dark
                         pl-4 pr-2 text-text-secondary-dark hover:bg-border-dark"
            >
              <p className="text-sm font-medium leading-normal">Role: All</p>
              <span className="material-symbols-outlined text-lg">
                expand_more
              </span>
            </button>
            <button></button>
          </div>
          <div className="flex gap-2"></div>
        </div>
      </div>

      <UserTable
        search={userQuery}
        users={filteredUsers}
        onUpdateUser={updateUser}
      />
    </>
  );
}
