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
  const [page, setPage] = useState<'login' | 'register' | 'main'>('main');
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
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <header className="w-full bg-white/90 shadow-sm py-4 px-4 border-b border-emerald-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100">
            {/* Graduation cap SVG icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" className="w-8 h-8 text-blue-700"><path fill="currentColor" d="M16 4L2 10.5l14 6.5 14-6.5L16 4zm0 15.5c-4.5 0-8.5 1.6-8.5 3.5V26h17v-3c0-1.9-4-3.5-8.5-3.5z"/><path fill="#38bdf8" d="M16 21c-4.5 0-8.5 1.6-8.5 3.5V26h17v-1.5c0-1.9-4-3.5-8.5-3.5z"/></svg>
          </span>
          <div>
            <span className="block font-bold text-lg text-blue-900 leading-tight">StudyPlan AI</span>
            <span className="block text-xs text-slate-500 font-medium leading-tight">Intelligent Learning Paths</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-16 flex flex-col gap-8">
        {errorMessage ? <StatusBanner type="error" message={errorMessage} /> : null}
        {successMessage ? <StatusBanner type="success" message={successMessage} /> : null}

        <div>
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
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-6">
              <PromptForm
                isSubmitting={isGenerating}
                onSubmit={handleGenerate}
                examples={[
                  'Create a 12-week study plan to learn full-stack web development',
                  'I want to master data structures and algorithms in 8 weeks',
                  'Help me learn machine learning fundamentals in 10 weeks',
                ]}
              />

              <div>
                {isTopicsLoading ? (
                  <section className="rounded-xl border border-slate-200 bg-white/80 p-6 text-center text-slate-500 shadow-sm">Loading topics...</section>
                ) : (
                  <TopicSelector topics={topics} selectedIds={selectedTopicIds} onChange={setSelectedTopicIds} />
                )}
              </div>
            </div>

            <div>
              <StudyPlanTimeline data={studyPlan} />
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full text-center text-slate-400 text-sm py-6 border-t border-slate-100 bg-white/90 mt-10 shadow-sm">&copy; {new Date().getFullYear()} StudyPlan AI</footer>
    </div>
  );
}
