import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/auth/AuthProvider";

interface LocationState {
  from?: string;
}

export function LoginPage() {
  const { login, status } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If the user is already authenticated, redirect them away from /login.
  useEffect(() => {
    if (status === "authenticated") {
      const from = (location.state as LocationState | null)?.from ?? "/";
      navigate(from, { replace: true });
    }
  }, [status, navigate, location.state]);

  async function handleLogin(email: string, password: string) {
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      const from = (location.state as LocationState | null)?.from ?? "/";
      navigate(from, { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 my-8">
      <LoginForm onLogin={handleLogin} isLoading={isLoading} error={error} />
      <p className="mt-4 text-center text-slate-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline font-medium cursor-pointer"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
