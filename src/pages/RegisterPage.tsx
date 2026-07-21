import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandMark } from "../components/BrandMark";
import { RegisterForm } from "../components/RegisterForm";
import { useToast } from "../components/ToastProvider";
import { useAuth } from "../hooks/auth/AuthProvider";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(name: string, email: string, password: string) {
    setError(null);
    setIsLoading(true);
    try {
      await register(name, email, password);
      showToast({
        title: "Account created",
        message: "Log in to open your study workspace.",
        tone: "success",
      });
      navigate("/login", { replace: true });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Registration failed.";
      setError(message);
      showToast({
        title: "Registration failed",
        message,
        tone: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="auth-page min-h-screen px-4 py-8">
      <Link to="/" className="brand-lockup mx-auto mb-8 w-fit">
        <BrandMark />
      </Link>

      <section className="auth-panel mx-auto grid w-full max-w-5xl overflow-hidden rounded-lg border border-[var(--glass-border)] bg-white/60 shadow-2xl backdrop-blur-2xl md:grid-cols-[0.9fr_1fr]">
        <div className="hidden border-r border-[var(--glass-border)] bg-[var(--surface-soft)]/70 p-8 md:flex md:flex-col md:justify-between">
          <div>
            <p className="eyebrow">Start focused</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-[var(--text)]">
              Build a learning system around your next goal.
            </h1>
            <p className="mt-4 leading-7 text-[var(--text-muted)]">
              Create an account, open the chatroom, and let the assistant shape
              your first roadmap.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--glass-border)] bg-white/65 p-4 text-sm text-[var(--text-muted)]">
            Small weekly wins compound quickly.
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <RegisterForm
            onRegister={handleRegister}
            isLoading={isLoading}
            error={error}
          />
          <p className="mt-5 text-center text-sm text-[var(--text-muted)]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-[var(--accent)] hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
