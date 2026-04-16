import { Link } from "react-router-dom";
import { useState } from "react";

type UserInfo = {
  name: string
}

type Props = {
  user?: UserInfo | null
  onLogout: () => void
  onNavigate: (route: 'login'|'register'|'dashboard'|'main') => void
}

export default function Navbar({ user, onLogout, onNavigate }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white/70 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" onClick={() => { setMobileOpen(false); onNavigate('main') }} className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-emerald-600 to-green-500 text-white flex items-center justify-center font-extrabold text-lg shadow-md">SP</div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-lg font-semibold text-slate-800">Study Plan</span>
              <span className="text-xs text-slate-500">AI-powered roadmaps</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" onClick={() => onNavigate('main')} className="text-sm text-slate-700 hover:text-slate-900 transition">Home</Link>
          <Link to="/dashboard" onClick={() => onNavigate('dashboard')} className="text-sm text-slate-700 hover:text-slate-900 transition">Users Dashboard</Link>
          <Link to="/" onClick={() => onNavigate('main')} className="text-sm text-slate-700 hover:text-slate-900 transition">Topics</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <button onClick={() => onNavigate('dashboard')} className="text-sm text-slate-700 hover:text-slate-900">{user.name}</button>
                <button onClick={onLogout} className="ml-2 px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => onNavigate('login')} className="text-sm text-slate-700 hover:text-slate-900">Login</Link>
                <Link to="/register" onClick={() => onNavigate('register')} className="ml-2 px-3 py-1 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700">Register</Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-md bg-slate-100 hover:bg-slate-200 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            <Link to="/" onClick={() => { setMobileOpen(false); onNavigate('main') }} className="text-sm text-slate-700 hover:text-slate-900">Home</Link>
            <Link to="/dashboard" onClick={() => { setMobileOpen(false); onNavigate('dashboard') }} className="text-sm text-slate-700 hover:text-slate-900">Users Dashboard</Link>
            <Link to="/" onClick={() => { setMobileOpen(false); onNavigate('main') }} className="text-sm text-slate-700 hover:text-slate-900">Topics</Link>

            <div className="pt-2">
              {user ? (
                <>
                  <div className="text-sm text-slate-600">Signed in as <strong>{user.name}</strong></div>
                  <button onClick={() => { setMobileOpen(false); onLogout(); }} className="w-full mt-2 px-3 py-2 rounded-md bg-red-600 text-white">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => { setMobileOpen(false); onNavigate('login') }} className="text-sm text-slate-700 hover:text-slate-900">Login</Link>
                  <Link to="/register" onClick={() => { setMobileOpen(false); onNavigate('register') }} className="mt-2 px-3 py-2 rounded-md bg-emerald-600 text-white inline-block">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
