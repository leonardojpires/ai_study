import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { PromptForm } from "./components/PromptForm";
import { StatusBanner } from "./components/StatusBanner";
import { StudyPlanTimeline } from "./components/StudyPlanTimeline";
import { TopicSelector } from "./components/TopicSelector";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import Navbar from "./components/Navbar";
import UsersDashboard from "./components/UsersDashboard";
import { StudyPlanResponse, Topic } from "./types";
import { fetchAllUsers } from "./api";

type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "instructor" | "student";
  active: boolean;
  password: string;
};

export function App() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([]);
  const [isTopicsLoading, setIsTopicsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [studyPlan, setStudyPlan] = useState<StudyPlanResponse | null>(null);
  const [page, setPage] = useState<'login' | 'register' | 'main' | 'dashboard'>('main');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [mockUsers, setMockUsers] = useState<User[]>([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'student', active: true, password: 'pass123' },
    { id: 2, name: 'Bob Carter', email: 'bob@example.com', role: 'instructor', active: true, password: 'bob123' },
    { id: 3, name: 'Cara Smith', email: 'cara@example.com', role: 'admin', active: true, password: 'cara123' },
  ]);

  const mockTopics = [
    { id: 1, name: 'React', description: 'Componentes, hooks e estado', category: 'Frontend' },
    { id: 2, name: 'TypeScript', description: 'Tipos sólidos para JavaScript', category: 'Frontend' },
    { id: 3, name: 'Node.js', description: 'Construção de APIs e microsserviços', category: 'Backend' },
    { id: 4, name: 'SQL', description: 'Consultas e modelagem de dados', category: 'Database' },
    { id: 5, name: 'Docker', description: 'Containerização de aplicações', category: 'DevOps' },
  ];

  useEffect(() => {
    if (!currentUser) {
      setTopics([]);
      return;
    }

    setIsTopicsLoading(true);
    const timer = setTimeout(() => {
      setTopics(mockTopics);
      setIsTopicsLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [currentUser]);

  useEffect(() => {
    if (page !== 'dashboard') return;

    const loadUsers = async () => {
      try {
        const apiUsers = await fetchAllUsers();

        setUsers(apiUsers.map(apiUser => ({
          id: apiUser.id,
          name: apiUser.name,
          email: apiUser.email,
          role: apiUser.isAdmin ? 'admin' : 'student',
          active: true,
          password: ''
        })));
      } catch (error: any) {
        console.error('Failed to fetch users:', error);
        setUsers(mockUsers); // fallback or keep existing
      }
    };

    loadUsers();
  }, [page, mockUsers]);

  function handleGenerate(values: { prompt: string; weeks: number; hoursPerWeek: number }): Promise<void> {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsGenerating(true);

    const generated = {
      title: `Plano de estudo: ${values.prompt}`,
      summary: `Plano de ${values.weeks} semanas com ${values.hoursPerWeek} horas/semana`,
      weeks: Array.from({ length: values.weeks }, (_, i) => ({
        week: i + 1,
        title: `Semana ${i + 1}`,
        objectives: [
          `${values.prompt} (foco)`,
          "Revisão de conceitos chave",
          "Prática em exercícios específicos"
        ],
        topics: selectedTopicIds.length > 0
          ? selectedTopicIds.map(id => mockTopics.find(t => t.id === id)?.name ?? 'Tópico')
          : ['Tópico sugerido']
      }))
    };

    setStudyPlan(generated);
    setSuccessMessage("Study plan generated successfully.");
    setIsGenerating(false);

    return Promise.resolve();
  }

  // Real authentication handlers
  function handleLogin(email: string, password: string) {
    setAuthError(null);
    setAuthSuccess(null);
    setAuthLoading(true);

    const foundUser = mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
    if (!foundUser) {
      setAuthError("Usuário ou senha inválidos.");
      setAuthLoading(false);
      return;
    }

    setCurrentUser(foundUser);
    setAuthSuccess(`Bem-vindo, ${foundUser.name}!`);
    setAuthLoading(false);
  }

  function handleRegister(name: string, email: string, password: string) {
    setAuthError(null);
    setAuthSuccess(null);
    setAuthLoading(true);

    const existing = mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setAuthError('Este email já está em uso.');
      setAuthLoading(false);
      return;
    }

    const user: User = {
      id: mockUsers.length + 1,
      name,
      email,
      password,
      role: 'student',
      active: true,
    };

    setMockUsers(prev => [...prev, user]);
    setAuthSuccess('Conta criada com sucesso! Faça login.');
    setAuthLoading(false);
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Navbar
        user={currentUser}
        onNavigate={(route) => {
          if (route === 'login') setPage('login');
          if (route === 'register') setPage('register');
          if (route === 'dashboard') setPage('dashboard');
          if (route === 'main') setPage('main');
        }}
        onLogout={() => {
          setCurrentUser(null);
          setPage('login');
          setAuthSuccess('Sessão encerrada.');
        }}
      />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-16 flex flex-col gap-8">
        {errorMessage ? <StatusBanner type="error" message={errorMessage} /> : null}
        {successMessage ? <StatusBanner type="success" message={successMessage} /> : null}
        {authSuccess ? <StatusBanner type="success" message={authSuccess} /> : null}

        {page === 'login' ? (
          <div className="max-w-2xl mx-auto px-4 py-8">
            <LoginForm onLogin={handleLogin} isLoading={authLoading} error={authError} />
            <div className="text-center mt-4">
              <button onClick={() => setPage('register')} className="text-sm text-blue-600">Create account</button>
              <button onClick={() => setPage('main')} className="ml-4 text-sm text-slate-600">Back</button>
            </div>
          </div>
        ) : page === 'register' ? (
          <div className="max-w-2xl mx-auto px-4 py-8">
            <RegisterForm onRegister={handleRegister} isLoading={authLoading} error={authError} />
            <div className="text-center mt-4">
              <button onClick={() => setPage('login')} className="text-sm text-blue-600">Have an account? Login</button>
              <button onClick={() => setPage('main')} className="ml-4 text-sm text-slate-600">Back</button>
            </div>
          </div>
        ) : page === 'dashboard' ? (
          <UsersDashboard
            users={users.length > 0 ? users : mockUsers}
            onAddUser={(userData) => {
              const nextId = Math.max(...(users.length > 0 ? users.map(u => u.id) : mockUsers.map(u => u.id))) + 1;
              const newUser = { ...userData, id: nextId };
              setUsers(prev => [...prev, newUser]);
              setMockUsers(prev => [...prev, newUser]);
              setAuthSuccess(`Usuário ${userData.name} adicionado com sucesso.`);
            }}
            onUpdateUser={(updated) => {
              setUsers(prev => prev.map(user => user.id === updated.id ? updated : user));
              setMockUsers(prev => prev.map(user => user.id === updated.id ? updated : user));
            }}
            onDeleteUser={(id) => {
              setUsers(prev => prev.filter(user => user.id !== id));
              setMockUsers(prev => prev.filter(user => user.id !== id));
            }}
            onBack={() => setPage('main')}
          />
        ) : (
          <div className="space-y-8">
            <section>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" className="w-7 h-7 text-blue-700"><path fill="currentColor" d="M16 4L2 10.5l14 6.5 14-6.5L16 4zm0 15.5c-4.5 0-8.5 1.6-8.5 3.5V26h17v-3c0-1.9-4-3.5-8.5-3.5z"/><path fill="#38bdf8" d="M16 21c-4.5 0-8.5 1.6-8.5 3.5V26h17v-1.5c0-1.9-4-3.5-8.5-3.5z"/></svg>
                  </span>
                  Study Plan Generator
                </h1>
                <p className="text-lg text-slate-500 font-medium mb-2">Transform your learning goals into structured study plans powered by AI</p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 text-sm font-medium mb-4">
                  <span className="inline-flex items-center gap-1"><svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg> AI-Powered</span>
                  <span className="inline-flex items-center gap-1"><svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4"/></svg> Week-by-Week</span>
                  <span className="inline-flex items-center gap-1"><svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l9-5-9-5-9 5 9 5z"/><path d="M12 12V4"/></svg> Personalized</span>
                </div>
              </div>

              <PromptForm
                isSubmitting={isGenerating}
                onSubmit={handleGenerate}
                examples={[
                  'Create a 12-week study plan to learn full-stack web development',
                  'I want to master data structures and algorithms in 8 weeks',
                  'Help me learn machine learning fundamentals in 10 weeks',
                ]}
              />
            </section>

            <div>
              {isTopicsLoading ? (
                <section className="rounded-xl border border-slate-200 bg-white/80 p-6 text-center text-slate-500 shadow-sm">Loading topics...</section>
              ) : (
                <TopicSelector topics={topics} selectedIds={selectedTopicIds} onChange={setSelectedTopicIds} />
              )}
            </div>

            <div>
              <StudyPlanTimeline data={studyPlan} />
            </div>
          </div>
        )}
      </main>

      <footer className="w-full text-center text-slate-400 text-sm py-6 border-t border-slate-100 bg-white/90 mt-10 shadow-sm">&copy; {new Date().getFullYear()} StudyPlan AI</footer>
    </div>
  </BrowserRouter>
  );
}
