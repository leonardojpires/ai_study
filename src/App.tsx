import { useEffect, useRef, useState } from "react";
import {
  converse,
  fetchCurrentUser,
  loginUser,
  logoutUser,
  persistGroqPlan,
  registerUser,
} from "./api";
import { PromptForm } from "./components/PromptForm";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";

type Message = {
  role: "assistant" | "user";
  text: string;
  ready: boolean;
};

export function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I am the study assistant powered by Groq AI. Tell me what you want to learn and I will create a study plan for you.",
      ready: false,
    },
  ]);
  const [planPreview, setPlanPreview] = useState<null | {
    title: string;
    description?: string;
    weeks: Array<{
      week_number: number;
      title: string;
      objectives: string[];
      topics: string[];
    }>;
  }>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlanSaved, setIsPlanSaved] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState<"login" | "register" | "main">("login");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages]);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetchCurrentUser();
        if (response.success) {
          setIsAuthenticated(true);
          setPage("main");
        } else {
          setIsAuthenticated(false);
          setPage("login");
        }
      } catch {
        setIsAuthenticated(false);
        setPage("login");
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
    const userMessage: Message = {
      role: "user",
      text: values.prompt,
      ready: false,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsGenerating(true);

    try {
      const result = await converse([...messages, userMessage]);

      const assistantText = result.ready && result.plan
        ? `Groq generated a study plan recommendation titled “${result.plan.title}”. Review the preview below and save it if you like.`
        : result.assistantText;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: assistantText, ready: result.ready },
      ]);

      if (result.ready && result.plan) {
        setPlanPreview(result.plan);
        setIsPlanSaved(false);
      }
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: error.message || "Something went wrong.",
          ready: false,
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSaveRecommendation() {
    if (!planPreview) return;

    try {
      await persistGroqPlan({
        title: planPreview.title,
        description: planPreview.description,
        weeks: planPreview.weeks.map((week) => ({
          week_number: week.week_number,
          title: week.title,
          objectives: week.objectives,
          topics: week.topics,
        })),
        is_saved: true,
      });

      setIsPlanSaved(true);
    } catch (error) {
      throw new Error("Failed to save plan.");
    }
  }

  function handleTryAgain() {
    // TODO: implement retry logic.
    console.log("Try again clicked");
  }

  const hasReadyPreview = Boolean(planPreview && !isPlanSaved);

  // Real authentication handlers
  async function handleLogin(email: string, password: string) {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        setIsAuthenticated(true);
        setPage("main");
      } else {
        setAuthError("Login failed.");
      }
    } catch (err: any) {
      setAuthError(err.message || "Login failed.");
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
        setPage("login");
      } else {
        setAuthError("Registration failed.");
      }
    } catch (err: any) {
      setAuthError(err.message || "Registration failed.");
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
      setPage("login");
    }
  }

  return (
    <div className="h-screen min-h-screen flex bg-linear-to-tr from-blue-50 to-slate-100 overflow-hidden">
      {/* Sidebar */}
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
          <button
            className={`w-full py-2 rounded-lg text-left px-4 font-medium transition ${page === "main" ? "bg-blue-100 text-blue-700" : "hover:bg-slate-100 text-slate-700"}`}
            onClick={() => setPage("main")}
          >
            Home
          </button>
          {!isAuthenticated ? (
            <>
              <button
                className={`w-full py-2 rounded-lg text-left px-4 font-medium transition ${page === "login" ? "bg-blue-100 text-blue-700" : "hover:bg-slate-100 text-slate-700"}`}
                onClick={() => setPage("login")}
              >
                Login
              </button>
              <button
                className={`w-full py-2 rounded-lg text-left px-4 font-medium transition ${page === "register" ? "bg-blue-100 text-blue-700" : "hover:bg-slate-100 text-slate-700"}`}
                onClick={() => setPage("register")}
              >
                Register
              </button>
            </>
          ) : (
            <button
              className="w-full py-2 rounded-lg text-left px-4 font-medium transition hover:bg-slate-100 text-slate-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </nav>
        <div className="flex-1" />
        <footer className="text-xs text-slate-400 text-center">
          &copy; {new Date().getFullYear()} StudyPlan AI
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">
        <header className="w-full px-4 py-6 bg-white shadow md:hidden flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
            AI Study Plan
          </h1>
          <p className="text-slate-500 text-center text-sm">
            Your personal roadmap generator
          </p>
        </header>

        <div className="flex-1 flex flex-col items-center justify-start">
          {page === "login" && (
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
              <LoginForm
                onLogin={handleLogin}
                isLoading={authLoading}
                error={authError}
              />
              <p className="mt-4 text-center text-slate-600">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setPage("register")}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Register
                </button>
              </p>
            </div>
          )}
          {page === "register" && (
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
              <RegisterForm
                onRegister={handleRegister}
                isLoading={authLoading}
                error={authError}
              />
              <p className="mt-4 text-center text-slate-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setPage("login")}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Login
                </button>
              </p>
            </div>
          )}
          {page === "main" && (
            <div className="w-full max-w-7xl mx-auto flex flex-1 flex-col">
              <div className="flex flex-1 flex-col min-h-[calc(100vh-5.5rem)]  border border-slate-200 bg-slate-50 shadow-inner">
                <div className="border-b border-slate-200 px-6 py-5 bg-white">
                  <h2 className="text-xl font-semibold text-slate-900">
                    AI Study Plan Chat
                  </h2>
                  <p className="text-sm text-slate-500">
                    Chat with the assistant and generate your study plan like a
                    chatbot.
                  </p>
                </div>

                <div className="flex-1 min-h-0 overflow-hidden bg-slate-100">
                  <div className="h-full min-h-0 overflow-y-auto px-6 py-6 pb-32 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                    <div className="flex flex-col gap-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`max-w-3xl ${message.role === "assistant" ? "self-start bg-white text-slate-900 rounded-[1.5rem] rounded-br-none border border-slate-200 px-5 py-4 shadow-sm" : "self-end bg-blue-600 text-white rounded-[1.5rem] rounded-bl-none px-5 py-4 shadow-sm"}`}
                        >
                          <p className="text-sm leading-6 whitespace-pre-line">
                            {message.text}
                          </p>
                          <span className="mt-2 text-xs text-slate-400">
                            Ready: {message.ready ? "Yes" : "No"}
                          </span>

                          {message.role === "assistant" && message.ready && planPreview && index === messages.length - 1 && (
                            <div className="mt-4 rounded-[1.25rem] border border-slate-100 bg-white px-4 py-4 shadow-none">
                              <div className="space-y-3 text-sm text-slate-700">
                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                  <p className="text-sm font-semibold text-slate-900">{planPreview.title}</p>
                                  {planPreview.description && (
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{planPreview.description}</p>
                                  )}
                                </div>

                                <div className="space-y-3">
                                  {planPreview.weeks.map((week) => (
                                    <div key={week.week_number} className="rounded-2xl border border-slate-100 bg-white p-3">
                                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-sm font-semibold text-slate-900">Week {week.week_number}</p>
                                        <span className="text-xs text-slate-500">{week.title}</span>
                                      </div>
                                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                        <div>
                                          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-slate-500">Objectives</p>
                                          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                                            {week.objectives.map((objective) => (
                                              <li key={objective}>{objective}</li>
                                            ))}
                                          </ul>
                                        </div>
                                        <div>
                                          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-slate-500">Topics</p>
                                          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                                            {week.topics.map((topic) => (
                                              <li key={topic}>{topic}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 border-t border-slate-200 bg-white px-6 py-5 z-20">
                  {hasReadyPreview && (
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm text-slate-600">
                        Plan recommendation is ready. Save it or try again.
                      </span>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                          type="button"
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                          onClick={handleSaveRecommendation}
                        >
                          Save plan
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                          onClick={handleTryAgain}
                        >
                          Try again
                        </button>
                      </div>
                    </div>
                  )}

                  <PromptForm
                    isSubmitting={isGenerating}
                    onSubmit={handleGenerate}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
