import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/AuthProvider";

interface NavItem {
  to: string;
  label: string;
}

const AUTH_NAV: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/guide", label: "Guide" },
];

const GUEST_NAV: NavItem[] = [
  { to: "/login", label: "Login" },
  { to: "/register", label: "Register" },
];

export function Sidebar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const navItems = isAuthenticated ? AUTH_NAV : GUEST_NAV;

  async function handleLogout() {
    setProfileMenuOpen(false);
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="hidden md:flex sticky top-0 self-start flex-col w-72 bg-white shadow-2xl px-8 py-10 items-center gap-8 border-r border-slate-200 h-screen">
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full bg-blue-100 p-4 mb-2">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
            <path
              fill="#2563eb"
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14A7 7 0 0112 5zm0 2a5 5 0 100 10A5 5 0 0012 7z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-blue-700 tracking-tight text-center">
          AI Study Plan
        </h1>
        <p className="text-slate-500 text-center text-sm">
          Your personal roadmap generator
        </p>
      </div>

      <nav className="flex flex-col gap-2 w-full mt-8">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `w-full py-2 rounded-lg text-left px-4 font-medium transition cursor-pointer ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-slate-100 text-slate-700"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {isAuthenticated && (
        <div className="w-full relative">
          <button
            type="button"
            onClick={() => setProfileMenuOpen((open) => !open)}
            className="w-full flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition cursor-pointer hover:bg-slate-100"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold">
              U
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-500">Account actions</p>
            </div>
            <span className="text-slate-400">▾</span>
          </button>

          {profileMenuOpen && (
            <div className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <button
                type="button"
                className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate("/profile");
                }}
              >
                Profile
              </button>
              <button
                type="button"
                className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex-1" />
      <footer className="text-xs text-slate-400 text-center">
        &copy; {new Date().getFullYear()} StudyPlan AI
      </footer>
    </aside>
  );
}