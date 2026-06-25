import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/AuthProvider";

export function MobileHeader() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function linkClass(isActive: boolean) {
    return `flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition cursor-pointer text-center ${
      isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
    }`;
  }

  return (
    <header className="w-full px-4 py-6 bg-white shadow md:hidden flex flex-col items-center gap-2">
      <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
        AI Study Plan
      </h1>
      <p className="text-slate-500 text-center text-sm">
        Your personal roadmap generator
      </p>
      {isAuthenticated ? (
        <div className="mt-2 flex w-full max-w-sm gap-2">
          <NavLink to="/" end className={({ isActive }) => linkClass(isActive)}>
            Home
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => linkClass(isActive)}>
            Profile
          </NavLink>
        </div>
      ) : (
        <div className="mt-2 flex w-full max-w-sm gap-2">
          <button
            type="button"
            className="flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition cursor-pointer bg-blue-600 text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition cursor-pointer bg-slate-100 text-slate-700"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      )}
    </header>
  );
}