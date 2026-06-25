export function GuidePage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-10">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
          Guide
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          How to use AI Study Plan
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Follow these steps to generate a personalised study roadmap with the
          help of our AI assistant.
        </p>

        <ol className="mt-8 space-y-5 text-sm text-slate-700">
          <li className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-base font-semibold text-slate-900">
              1. Start a conversation
            </p>
            <p className="mt-2">
              From the home page, describe the topic you want to learn in the
              prompt box at the bottom of the chat.
            </p>
          </li>
          <li className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-base font-semibold text-slate-900">
              2. Review the recommendation
            </p>
            <p className="mt-2">
              Once the assistant returns a ready plan, expand the preview to see
              the weekly breakdown of objectives and topics.
            </p>
          </li>
          <li className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-base font-semibold text-slate-900">
              3. Save or regenerate
            </p>
            <p className="mt-2">
              Save the plan to your library or use Try Again to get a different
              recommendation.
            </p>
          </li>
          <li className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-base font-semibold text-slate-900">
              4. Manage your library
            </p>
            <p className="mt-2">
              Open your profile to browse, view, and remove the plans you have
              saved.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
}