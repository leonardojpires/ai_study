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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onRegister(name, email, password);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
