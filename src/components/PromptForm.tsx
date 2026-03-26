import { FormEvent, useMemo, useState } from "react";

interface PromptFormProps {
  isSubmitting: boolean;
  onSubmit: (values: { prompt: string; weeks: number; hoursPerWeek: number }) => Promise<void>;
  examples?: string[];
}

export function PromptForm({ isSubmitting, onSubmit, examples = [] }: PromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [weeks, setWeeks] = useState(8);
  const [hoursPerWeek, setHoursPerWeek] = useState(6);

  const charCount = useMemo(() => prompt.length, [prompt]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      prompt: prompt.trim(),
      weeks,
      hoursPerWeek,
    }).catch((err) => {
      console.error("PromptForm submit error:", err);
    });
  }

  function applyExample(example: string) {
    setPrompt(example);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-4">
          <textarea
            aria-label="Study plan prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to learn... (e.g., 'Create a 12-week plan to learn web development')"
            rows={5}
            className="w-full bg-slate-50 rounded-2xl border border-slate-200 p-5 text-lg resize-none placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            required
            minLength={10}
            maxLength={500}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-slate-400">{charCount} characters</span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-60 font-semibold text-base transition"
            >
              {isSubmitting ? "Generating..." : "Generate Plan"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm text-slate-600 mb-1">Weeks</span>
            <input
              type="number"
              min={1}
              max={52}
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value))}
              className="rounded-full border border-slate-200 px-4 py-3 bg-white"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-slate-600 mb-1">Hours / Week</span>
            <input
              type="number"
              min={1}
              max={80}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="rounded-full border border-slate-200 px-4 py-3 bg-white"
            />
          </label>
        </div>

        {examples.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-slate-500 mb-3">Try these examples:</h3>
            <div className="flex flex-col gap-2">
              {examples.map((ex) => (
                <button
                  type="button"
                  key={ex}
                  onClick={() => applyExample(ex)}
                  className="w-full text-left px-4 py-3 text-base bg-white hover:bg-blue-50 rounded-xl border border-slate-200 shadow-sm transition"
                  style={{ boxShadow: '0 1px 4px 0 rgba(16, 23, 22, 0.04)' }}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
