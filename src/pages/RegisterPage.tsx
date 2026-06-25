import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";
import { useAuth } from "../hooks/auth/AuthProvider";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(name: string, email: string, password: string) {
    setError(null);
    setIsLoading(true);
    try {
      await register(name, email, password);
      navigate("/login", { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 my-8">
      <RegisterForm
        onRegister={handleRegister}
        isLoading={isLoading}
        error={error}
      />
      <p className="mt-4 text-center text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:underline font-medium cursor-pointer"
        >
          Login
        </Link>
      </p>
    </div>
  );
}