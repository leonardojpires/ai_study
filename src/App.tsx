import { useEffect, useState } from "react";
import { createStudyPlan, fetchCurrentUser, loginUser, logoutUser, registerUser } from "./api";
import { PromptForm } from "./components/PromptForm";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";

export function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState<'login' | 'register' | 'main'>('login');

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetchCurrentUser();
        if (response.success) {
          setIsAuthenticated(true);
          setPage('main');
        } else {
          setIsAuthenticated(false);
          setPage('login');
        }
      } catch {
        setIsAuthenticated(false);
        setPage('login');
      } finally {
        setAuthChecked(true);
      }
    }

    void checkSession();
  }, []);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Checking authentication…</p>
      </div>
    );
  }

  async function handleGenerate(values: { prompt: string }) {
    try {
      setIsGenerating(true);
      await createStudyPlan({
        prompt: values.prompt,
        weeks: 8,
        hoursPerWeek: 6,
      });
    } finally {
      setIsGenerating(false);
    }
  }

  // Real authentication handlers
  async function handleLogin(email: string, password: string) {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        setIsAuthenticated(true);
        setPage('main');
      } else {
        setAuthError('Login failed.');
      }
    } catch (err: any) {
      setAuthError(err.message || 'Login failed.');
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleRegister(name: string, email: string, password: string) {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const result = await registerUser(name, email, password);
      if (result.success) {
        setPage('login');
      } else {
        setAuthError('Registration failed.');
      }
    } catch (err: any) {
      setAuthError(err.message || 'Registration failed.');
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await logoutUser();
    } catch {
      // ignore logout errors
    } finally {
      setIsAuthenticated(false);
      setPage('login');
    }
  }

  return (
    <div className="min-h-screen flex bg-linear-to-tr from-blue-50 to-slate-100">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white shadow-2xl px-8 py-10 items-center gap-8 border-r border-slate-200">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-blue-100 p-4 mb-2">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path fill="#2563eb" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14A7 7 0 0112 5zm0 2a5 5 0 100 10A5 5 0 0012 7z"/></svg>
          </div>
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight text-center">AI Study Plan</h1>
          <p className="text-slate-500 text-center text-sm">Your personal roadmap generator</p>
        </div>
        <nav className="flex flex-col gap-2 w-full mt-8">
          <button className={`w-full py-2 rounded-lg text-left px-4 font-medium transition ${page==='main' ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100 text-slate-700'}`} onClick={()=>setPage('main')}>Home</button>
          {!isAuthenticated ? (
            <>
              <button className={`w-full py-2 rounded-lg text-left px-4 font-medium transition ${page==='login' ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100 text-slate-700'}`} onClick={()=>setPage('login')}>Login</button>
              <button className={`w-full py-2 rounded-lg text-left px-4 font-medium transition ${page==='register' ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100 text-slate-700'}`} onClick={()=>setPage('register')}>Register</button>
            </>
          ) : (
            <button className="w-full py-2 rounded-lg text-left px-4 font-medium transition hover:bg-slate-100 text-slate-700" onClick={handleLogout}>Logout</button>
          )}
        </nav>
        <div className="flex-1" />
        <footer className="text-xs text-slate-400 text-center">&copy; {new Date().getFullYear()} StudyPlan AI</footer>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="w-full px-4 py-6 bg-white shadow md:hidden flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight">AI Study Plan</h1>
          <p className="text-slate-500 text-center text-sm">Your personal roadmap generator</p>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-2 py-8">
          {page === 'login' && (
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
              <LoginForm onLogin={handleLogin} isLoading={authLoading} error={authError} />
              <p className="mt-4 text-center text-slate-600">
                Don&apos;t have an account?{' '}
                <button type="button" onClick={() => setPage('register')} className="text-blue-600 hover:underline font-medium">
                  Register
                </button>
              </p>
            </div>
          )}
          {page === 'register' && (
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
              <RegisterForm onRegister={handleRegister} isLoading={authLoading} error={authError} />
              <p className="mt-4 text-center text-slate-600">
                Already have an account?{' '}
                <button type="button" onClick={() => setPage('login')} className="text-blue-600 hover:underline font-medium">
                  Login
                </button>
              </p>
            </div>
          )}
          {page === 'main' && (
            <div className="w-full max-w-7xl mx-auto py-8 px-2 md:px-8">
              <PromptForm isSubmitting={isGenerating} onSubmit={handleGenerate} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
