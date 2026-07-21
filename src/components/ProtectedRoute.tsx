import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth/AuthProvider";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return (
      <div className="app-workspace flex min-h-screen items-center justify-center">
        <p className="rounded-lg border border-[var(--glass-border)] bg-white/70 px-4 py-3 text-sm font-semibold text-[var(--text-muted)] shadow-sm backdrop-blur-xl">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (status !== "authenticated") {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
