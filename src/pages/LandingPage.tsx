import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandMark } from "../components/BrandMark";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { useToast } from "../components/ToastProvider";
import { useAuth } from "../hooks/auth/AuthProvider";

const features = [
  {
    title: "Adaptive roadmaps",
    text: "Turn a messy goal into weekly milestones, topics, and objectives.",
  },
  {
    title: "Chat-first planning",
    text: "Refine your plan naturally instead of wrestling with forms.",
  },
  {
    title: "Saved plan library",
    text: "Keep your best roadmaps close and return when it is time to execute.",
  },
];

const weeks = [
  "Foundations and setup",
  "Guided practice",
  "Project sprint",
  "Review and next steps",
];

export function LandingPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const primaryHref = isAuthenticated ? "/chat" : "/register";

  async function handleLogout() {
    setProfileMenuOpen(false);
    setIsLoggingOut(true);
    try {
      await logout();
      showToast({
        title: "Logged out",
        message: "Your session has been closed.",
        tone: "success",
      });
      setIsLogoutModalOpen(false);
      navigate("/", { replace: true });
    } catch (err) {
      showToast({
        title: "Could not log out",
        message: err instanceof Error ? err.message : "Please try again.",
        tone: "error",
      });
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <main className="landing-page min-h-screen overflow-hidden text-[var(--text)]">
      <header className="landing-nav mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link to="/" className="brand-lockup" aria-label="Blueprint home">
          <BrandMark />
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            to="/guide"
            className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-[var(--text-muted)] transition hover:bg-white/50 hover:text-[var(--text)] sm:inline-flex"
          >
            Guide
          </Link>
          <Link
            to={isAuthenticated ? "/chat" : "/login"}
            className="rounded-lg border border-[var(--glass-border)] bg-white/55 px-4 py-2 text-sm font-semibold text-[var(--accent-strong)] shadow-sm backdrop-blur-xl transition hover:bg-white/80"
          >
            {isAuthenticated ? "Open chat" : "Log in"}
          </Link>
          {isAuthenticated && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-lg border border-[var(--glass-border)] bg-white/60 px-2 py-2 text-left shadow-sm backdrop-blur-xl transition hover:bg-white/85 sm:px-3"
                aria-expanded={profileMenuOpen}
                aria-haspopup="menu"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-black text-white">
                  {user?.name?.[0]?.toUpperCase() ?? "U"}
                </span>
                <span className="hidden max-w-32 truncate text-sm font-bold text-[var(--text)] sm:inline">
                  {user?.name ?? "Profile"}
                </span>
                <span className="text-xs font-bold text-[var(--text-muted)]">v</span>
              </button>

              {profileMenuOpen && (
                <div
                  className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-lg border border-[var(--glass-border)] bg-white/95 shadow-2xl backdrop-blur-2xl"
                  role="menu"
                >
                  <button
                    type="button"
                    className="w-full px-4 py-3 text-left text-sm font-bold text-[var(--text)] hover:bg-[var(--surface-soft)]"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate("/profile");
                    }}
                    role="menuitem"
                  >
                    Profile
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setIsLogoutModalOpen(true);
                    }}
                    role="menuitem"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-5.5rem)] w-full max-w-7xl items-center gap-10 px-4 pb-12 pt-6 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow">Personal AI study roadmap</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.98] tracking-normal text-[var(--text)] sm:text-6xl lg:text-7xl">
            Study plans that feel structured, human, and ready to follow.
          </h1>
          <p className="!mt-4 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
            Build a weekly learning path from a simple conversation using Blueprint. Keep the
            friendly green style, add a little glass, and make planning feel
            calmer than a blank document.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to={primaryHref} className="btn-primary">
              {isAuthenticated ? "Go to chatroom" : "Start planning"}
            </Link>
            <Link to={isAuthenticated ? "/profile" : "/login"} className="btn-secondary">
              {isAuthenticated ? "Account" : "I already have an account"}
            </Link>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="glass-tile">
                <h2>{feature.title}</h2>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-preview" aria-label="Study plan interface preview">
          <div className="preview-toolbar">
            <span />
            <span />
            <span />
          </div>
          <div className="preview-message preview-message-user">
            I have 4 weeks to learn React and build a portfolio project.
          </div>
          <div className="preview-message preview-message-ai">
            Great. I will shape this into a practical weekly plan with review
            loops and a final project checkpoint.
          </div>
          <div className="preview-plan">
            <div>
              <p className="preview-label">Generated roadmap</p>
              <h2>React Portfolio Sprint</h2>
            </div>
            <div className="preview-week-list">
              {weeks.map((week, index) => (
                <div key={week} className="preview-week">
                  <span>{index + 1}</span>
                  <p>{week}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isLogoutModalOpen && (
        <ConfirmationModal
          title="Log out?"
          description="You can come back anytime. Your saved plans will stay in your library."
          confirmLabel="Log out"
          tone="danger"
          isLoading={isLoggingOut}
          onCancel={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </main>
  );
}
