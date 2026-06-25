interface PlanActionBarProps {
  onSave: () => void;
  onTryAgain: () => void;
  disabled?: boolean;
}

export function PlanActionBar({ onSave, onTryAgain, disabled }: PlanActionBarProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-slate-600">
        Plan recommendation is ready. Save it or try again.
      </span>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          disabled={disabled}
          onClick={onSave}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition cursor-pointer hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Save plan
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={onTryAgain}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition cursor-pointer hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Try again
        </button>
      </div>
    </div>
  );
}