import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (email: string, password: string, rememberMe: boolean) => void;
  isLoading?: boolean;
  error?: string | null;
}

export function LoginForm({ onLogin, isLoading, error }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onLogin(email.trim(), password, rememberMe);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login to Your Account</h2>
      <p>Enter your account credentials to continue.</p>
      {error && <div className="error">{error}</div>}

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </label>

      <label>
        Password
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          required
        />
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={(e) => setShowPassword(e.target.checked)}
        />
        Show password
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        Remember me
      </label>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Validating..." : "Login"}
      </button>
    </form>
  );
}
