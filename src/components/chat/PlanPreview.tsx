export interface PlanPreviewData {
  title: string;
  description?: string;
  weeks: Array<{
    week_number: number;
    title: string;
    objectives: string[];
    topics: string[];
  }>;
}

interface PlanPreviewProps {
  plan: PlanPreviewData;
}

export function PlanPreview({ plan }: PlanPreviewProps) {
  return (
    <div className="mt-4 rounded-[1.25rem] border border-slate-100 bg-white px-4 py-4 shadow-none">
      <div className="space-y-3 text-sm text-slate-700">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">{plan.title}</p>
          {plan.description && (
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {plan.description}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {plan.weeks.map((week) => (
            <div
              key={week.week_number}
              className="rounded-2xl border border-slate-100 bg-white p-3"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-slate-900">
                  Week {week.week_number}
                </p>
                <span className="text-xs text-slate-500">{week.title}</span>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Objectives
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                    {week.objectives.map((objective) => (
                      <li key={objective}>{objective}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Topics
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                    {week.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}