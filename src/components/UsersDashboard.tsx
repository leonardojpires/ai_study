import React, { useMemo, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "instructor" | "student";
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
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"student" | "instructor" | "admin">("student");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q));
  }, [users, search]);

  function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    if (!newName || !newEmail || !newPassword) return;
    onAddUser({ name: newName.trim(), email: newEmail.trim(), password: newPassword, role: newRole, active: true });
    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewRole("student");
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold">Users Dashboard</h2>
          <p className="text-sm text-slate-500">Manage user accounts with mocked data (no backend calls).</p>
        </div>
        <button onClick={onBack} className="rounded-md px-3 py-1 bg-slate-100 text-slate-700 text-sm hover:bg-slate-200">Back to app</button>
      </div>

      <div className="mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search users by name, email, role"
          className="w-full border border-slate-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-3 py-2 border border-slate-200">Name</th>
              <th className="px-3 py-2 border border-slate-200">Email</th>
              <th className="px-3 py-2 border border-slate-200">Role</th>
              <th className="px-3 py-2 border border-slate-200">Status</th>
              <th className="px-3 py-2 border border-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-3 py-2 border border-slate-200">{user.name}</td>
                <td className="px-3 py-2 border border-slate-200">{user.email}</td>
                <td className="px-3 py-2 border border-slate-200 uppercase tracking-wide text-xs">{user.role}</td>
                <td className="px-3 py-2 border border-slate-200">
                  <span className={`rounded-full px-2 py-1 text-xs ${user.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-3 py-2 border border-slate-200 flex gap-2">
                  <button onClick={() => onUpdateUser({ ...user, active: !user.active })} className="rounded-md px-2 py-1 bg-blue-600 text-white text-xs hover:bg-blue-700 cursor-pointer">Toggle</button>
                  <button onClick={() => onDeleteUser(user.id)} className="rounded-md px-2 py-1 bg-red-600 text-white text-xs hover:bg-red-700 cursor-pointer">Delete</button>
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
        <h3 className="font-semibold">Add New Mock User</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="border border-slate-300 rounded-md px-3 py-2" placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)} />
          <input className="border border-slate-300 rounded-md px-3 py-2" placeholder="Email" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
          <input className="border border-slate-300 rounded-md px-3 py-2" placeholder="Password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          <select className="border border-slate-300 rounded-md px-3 py-2" value={newRole} onChange={e => setNewRole(e.target.value as "student" | "instructor" | "admin")}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="rounded-md bg-green-600 text-white px-4 py-2 hover:bg-green-700">Add User</button>
      </form>
    </section>
  );
}
