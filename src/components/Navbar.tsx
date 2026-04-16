import { Link } from "react-router-dom";

type UserInfo = {
  name: string
}

type Props = {
  user?: UserInfo | null
  onLogout: () => void
  onNavigate: (route: 'login'|'register'|'dashboard'|'main') => void
}

export default function Navbar({ user, onLogout, onNavigate }: Props) {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white font-bold cursor-pointer">SP</Link>
          <div>
            <h2 className="text-lg font-semibold">Study Plan</h2>
            <p className="text-xs text-slate-400">AI-powered study plans</p>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <Link to="/" onClick={() => onNavigate('main')} className="text-sm text-slate-700 hover:text-slate-900 cursor-pointer">Home</Link>
          <Link to="/dashboard" onClick={() => onNavigate('dashboard')} className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">Users Dashboard</Link>
          {user ? (
            <>
              <span className="text-sm text-slate-600">Hi, {user.name}</span>
              <button onClick={onLogout} className="ml-2 px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 cursor-pointer">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => onNavigate('login')} className="text-sm text-slate-700 hover:text-slate-900 cursor-pointer">Login</Link>
              <Link to="/register" onClick={() => onNavigate('register')} className="ml-2 px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 cursor-pointer">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
