import React, { useState } from "react";

interface RegisterFormProps {
  onRegister: (name: string, email: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export function RegisterForm({ onRegister, isLoading, error }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    setLocalError(null);
    onRegister(name.trim(), email.trim(), password);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Create an Account</h2>
      <p className="text-xs text-slate-500">Create your account to start using the platform.</p>
      {localError ? <div className="error">{localError}</div> : error && <div className="error">{error}</div>}

      <label>
        Full Name
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Jane Doe"
          required
        />
      </label>

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
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          required
        />
      </label>

      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Repeat password"
          required
        />
      </label>

      <button type="submit" disabled={isLoading} className="cursor-pointer">
        {isLoading ? "Creating account..." : "Register"}
      </button>
      <small className="text-xs text-slate-500 mt-2">Already registered? Login from the navbar.</small>
    </form>
  );
}
