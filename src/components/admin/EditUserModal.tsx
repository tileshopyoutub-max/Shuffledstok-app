import { useEffect, useState } from "react";
import type { userTypes } from "../../data/users";

interface UserEditModalProps {
  user: userTypes;
  onClose: () => void;
  onSave: (patch: Pick<userTypes, "role" | "status">) => void;
}

export default function UserEditModal({
  user,
  onClose,
  onSave,
}: UserEditModalProps) {
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);

  useEffect(() => {
    setRole(user.role);
    setStatus(user.status);
  }, [user]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl border border-border-dark bg-component-dark shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-dark p-4">
          <p className="text-text-main-dark font-medium">Edit user</p>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary-dark hover:text-text-main-dark"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-4">
          <div>
            <p className="text-sm text-text-secondary-dark mb-2">Role</p>

            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="appearance-none w-full h-10 bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg pl-3 pr-10 outline-none"
              >
                <option value="Administrator">Administrator</option>
                <option value="Content Creator">Content Creator</option>
                <option value="Standard User">Standard User</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                <span className="material-symbols-outlined text-xl">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-text-secondary-dark mb-2">Status</p>

            <div className="relative">
              <select
                value={status ? "active" : "blocked"}
                onChange={(e) => setStatus(e.target.value === "active")}
                className="appearance-none w-full h-10 bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg pl-3 pr-10 outline-none"
              >
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                <span className="material-symbols-outlined text-xl">
                  expand_more
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-border-dark p-4">
          <button
            onClick={onClose}
            className="h-10 px-4 rounded-lg border border-border-dark text-text-secondary-dark hover:bg-border-dark"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ role, status })}
            className="h-10 px-4 rounded-lg bg-primary text-white hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
