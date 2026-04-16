import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export function LoginForm({ onLogin, isLoading, error }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onLogin(email.trim(), password);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login to Your Account</h2>
      <p className="text-xs text-slate-500">Enter your account credentials to continue.</p>
      {error && <div className="error">{error}</div>}

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </label>

      <label>
        Password
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </label>

      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)} />
        Show password
      </label>

      <button type="submit" disabled={isLoading} className="cursor-pointer">
        {isLoading ? "Validating..." : "Login"}
      </button>
      <small className="text-xs text-slate-500 mt-2">First time? Click Register in the navbar.</small>
    </form>
  );
}
