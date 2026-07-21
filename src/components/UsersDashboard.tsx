import React, { useMemo, useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import { useToast } from "./ToastProvider";

type User = {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  active: boolean;
  password: string;
};

type Props = {
  users: User[];
  onAddUser: (user: Omit<User, "id"> & { password: string }) => void;
  onUpdateUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
  onBack: () => void;
};

export default function UsersDashboard({ users, onAddUser, onUpdateUser, onDeleteUser, onBack }: Props) {
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.is_admin ? "admin" : "user").includes(q)
    );
  }, [users, search]);

  function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    if (!newName || !newEmail || !newPassword) return;
    onAddUser({
      name: newName.trim(),
      email: newEmail.trim(),
      password: newPassword,
      is_admin: isAdmin,
      active: true
    });
    showToast({
      title: "Mock user added",
      message: `${newName.trim()} was added to the dashboard.`,
      tone: "success",
    });
    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setIsAdmin(false);
  }

  function handleConfirmDelete() {
    if (!userToDelete) return;
    onDeleteUser(userToDelete.id);
    showToast({
      title: "Mock user deleted",
      message: `${userToDelete.name} was removed from the dashboard.`,
      tone: "success",
    });
    setUserToDelete(null);
  }

  function handleToggleUser(user: User) {
    onUpdateUser({ ...user, active: !user.active });
    showToast({
      title: user.active ? "User deactivated" : "User activated",
      message: `${user.name} is now ${user.active ? "inactive" : "active"}.`,
      tone: "info",
    });
  }

  return (
    <section className="rounded-lg border border-[var(--glass-border)] bg-white/70 p-6 shadow-xl backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <p className="eyebrow">Admin</p>
          <h2 className="mt-1 text-xl font-black text-[var(--text)]">Users Dashboard</h2>
          <p className="text-sm text-[var(--text-muted)]">Manage user accounts with mocked data (no backend calls).</p>
        </div>
        <button onClick={onBack} className="rounded-lg border border-[var(--glass-border)] bg-white/80 px-3 py-2 text-sm font-bold text-[var(--text-muted)] hover:bg-white">Back to app</button>
      </div>

      <div className="mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search users by name, email, admin status"
          className="w-full rounded-lg border border-[var(--glass-border)] bg-white/80 px-3 py-2 outline-none focus:border-[var(--accent)]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[var(--surface-soft)]/80">
              <th className="border border-[var(--glass-border)] px-3 py-2">Name</th>
              <th className="border border-[var(--glass-border)] px-3 py-2">Email</th>
              <th className="border border-[var(--glass-border)] px-3 py-2">Is Admin</th>
              <th className="border border-[var(--glass-border)] px-3 py-2">Status</th>
              <th className="border border-[var(--glass-border)] px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id} className="hover:bg-white/55">
                <td className="border border-[var(--glass-border)] px-3 py-2">{user.name}</td>
                <td className="border border-[var(--glass-border)] px-3 py-2">{user.email}</td>
                <td className="border border-[var(--glass-border)] px-3 py-2 text-xs uppercase tracking-wide">{user.is_admin ? "TRUE" : "FALSE"}</td>
                <td className="border border-[var(--glass-border)] px-3 py-2">
                  <span className={`rounded-full px-2 py-1 text-xs ${user.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="flex gap-2 border border-[var(--glass-border)] px-3 py-2">
                  <button onClick={() => handleToggleUser(user)} className="rounded-md bg-[var(--accent)] px-2 py-1 text-xs font-bold text-white hover:bg-[var(--accent-strong)]">Toggle</button>
                  <button onClick={() => setUserToDelete(user)} className="rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white hover:bg-red-700">Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="px-3 py-4 text-sm text-slate-500" colSpan={5}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <form className="mt-6 space-y-3" onSubmit={handleAddUser}>
        <h3 className="font-bold text-[var(--text)]">Add New Mock User</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="rounded-lg border border-[var(--glass-border)] bg-white/80 px-3 py-2" placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)} />
          <input className="rounded-lg border border-[var(--glass-border)] bg-white/80 px-3 py-2" placeholder="Email" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
          <input className="rounded-lg border border-[var(--glass-border)] bg-white/80 px-3 py-2" placeholder="Password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          <label className="flex items-center gap-2 rounded-lg border border-[var(--glass-border)] bg-white/80 px-3 py-2 text-sm text-[var(--text-muted)]">
            <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
            Is Admin
          </label>
        </div>
        <button type="submit" className="rounded-lg bg-[var(--accent)] px-4 py-2 font-bold text-white hover:bg-[var(--accent-strong)]">Add User</button>
      </form>

      {userToDelete && (
        <ConfirmationModal
          title="Delete this user?"
          description={`This will remove ${userToDelete.name} from the mock dashboard data.`}
          confirmLabel="Delete user"
          tone="danger"
          onCancel={() => setUserToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </section>
  );
}
