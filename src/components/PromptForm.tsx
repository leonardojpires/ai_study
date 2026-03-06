import { FormEvent, useState } from "react";

interface PromptFormProps {
  isSubmitting: boolean;
  onSubmit: (values: { prompt: string; weeks: number; hoursPerWeek: number }) => Promise<void>;
}

export function PromptForm({ isSubmitting, onSubmit }: PromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [weeks, setWeeks] = useState(8);
  const [hoursPerWeek, setHoursPerWeek] = useState(6);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit({
      prompt: prompt.trim(),
      weeks,
      hoursPerWeek
    });
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="card-header">
        <h2>Generate Study Plan</h2>
        <p>Describe what you want to learn and how much time you have.</p>
      </div>

      <label className="field">
        <span>Prompt</span>
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Example: I want to master TypeScript and backend APIs in 2 months"
          rows={5}
          required
          minLength={10}
        />
      </label>

      <div className="grid two">
        <label className="field">
          <span>Weeks</span>
          <input
            type="number"
            min={1}
            max={52}
            value={weeks}
            onChange={(event) => setWeeks(Number(event.target.value))}
            required
          />
        </label>

        <label className="field">
          <span>Hours / Week</span>
          <input
            type="number"
            min={1}
            max={80}
            value={hoursPerWeek}
            onChange={(event) => setHoursPerWeek(Number(event.target.value))}
            required
          />
        </label>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Generating..." : "Generate Plan"}
      </button>
    </form>
  );
}
