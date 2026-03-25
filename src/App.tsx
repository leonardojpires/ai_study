import { useEffect, useState } from "react";
import { createStudyPlan, fetchTopics, loginUser, registerUser } from "./api";
import { PromptForm } from "./components/PromptForm";
import { StatusBanner } from "./components/StatusBanner";
import { StudyPlanTimeline } from "./components/StudyPlanTimeline";
import { TopicSelector } from "./components/TopicSelector";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { StudyPlanResponse, Topic } from "./types";

export function App() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([]);
  const [isTopicsLoading, setIsTopicsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [studyPlan, setStudyPlan] = useState<StudyPlanResponse | null>(null);
  const [page, setPage] = useState<'login' | 'register' | 'main'>('login');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (page !== 'main') return;
    async function loadTopics() {
      try {
        setIsTopicsLoading(true);
        const response = await fetchTopics();
        setTopics(response);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load topics.";
        setErrorMessage(message);
      } finally {
        setIsTopicsLoading(false);
      }
    }
    void loadTopics();
  }, [page]);

  async function handleGenerate(values: { prompt: string; weeks: number; hoursPerWeek: number }) {
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      setIsGenerating(true);
      const generated = await createStudyPlan({
        prompt: values.prompt,
        weeks: values.weeks,
        hoursPerWeek: values.hoursPerWeek,
        topicIds: selectedTopicIds.length > 0 ? selectedTopicIds : undefined
      });
      setStudyPlan(generated);
      setSuccessMessage("Study plan generated successfully.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to generate study plan.";
      setErrorMessage(message);
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

  return (
    <div className="app-shell">
      <header className="hero">
        <h1>AI Study Plan Generator</h1>
        <p>Turn natural language requests into structured weekly plans.</p>
      </header>

      {page === 'login' && (
        <>
          <LoginForm onLogin={handleLogin} isLoading={authLoading} error={authError} />
          <p style={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <button type="button" onClick={() => setPage('register')} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>
              Register
            </button>
          </p>
        </>
      )}
      {page === 'register' && (
        <>
          <RegisterForm onRegister={handleRegister} isLoading={authLoading} error={authError} />
          <p style={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <button type="button" onClick={() => setPage('login')} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>
              Login
            </button>
          </p>
        </>
      )}
      {page === 'main' && (
        <>
          {errorMessage ? <StatusBanner type="error" message={errorMessage} /> : null}
          {successMessage ? <StatusBanner type="success" message={successMessage} /> : null}
          <main className="layout">
            <section className="left-panel">
              <PromptForm isSubmitting={isGenerating} onSubmit={handleGenerate} />
              {isTopicsLoading ? (
                <section className="card">
                  <p className="muted">Loading topics...</p>
                </section>
              ) : (
                <TopicSelector
                  topics={topics}
                  selectedIds={selectedTopicIds}
                  onChange={setSelectedTopicIds}
                />
              )}
            </section>
            <section className="right-panel">
              <StudyPlanTimeline data={studyPlan} />
            </section>
          </main>
        </>
      )}
    </div>
  );
}
