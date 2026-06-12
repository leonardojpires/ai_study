import { FormEvent, useMemo, useState } from "react";

interface PromptFormProps {
  isSubmitting: boolean;
  onSubmit: (values: { prompt: string }) => Promise<void>;
  examples?: string[];
}


export function PromptForm({ isSubmitting, onSubmit, examples = [] }: PromptFormProps) {
  const [prompt, setPrompt] = useState("");

  const charCount = useMemo(() => prompt.length, [prompt]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ prompt: prompt.trim() }).catch((err) => {
      console.error("PromptForm submit error:", err);
    });
    setPrompt("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event as unknown as FormEvent<HTMLFormElement>);
    }
  }

  function applyExample(example: string) {
    setPrompt(example);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white rounded-full border border-slate-200 shadow-sm px-4 py-3 flex items-end gap-3">
        <textarea
          aria-label="Study plan prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          className="flex-1 min-h-[48px] max-h-32 w-full resize-none bg-transparent text-base leading-6 placeholder:text-slate-400 focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-3 rounded-full shadow hover:bg-blue-700 disabled:opacity-60 font-semibold text-sm transition cursor-pointer"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
        <span>{charCount} characters</span>
        {examples.length > 0 && (
          <button type="button" onClick={() => applyExample(examples[0])} className="text-blue-600 hover:underline cursor-pointer">
            Try an example
          </button>
        )}
      </div>
    </form>
  );
}
