import { Link, useParams } from "react-router-dom";
import type { SavedPlan } from "../types";
import { getPlanById } from "../api/studyPlans";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/auth/AuthProvider";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

// Replace this value with the plan returned by GET /study-plan/get-plan/:id.
const DUMMY_PLAN: SavedPlan = {
  id: 1,
  user_id: 1,
  title: "Modern Full-Stack Web Development",
  description:
    "A practical roadmap for learning React, TypeScript, Node.js, and relational databases.",
  createdAt: "2026-08-20T10:00:00.000Z",
  weeks: [
    {
      week_number: 1,
      title: "TypeScript Foundations",
      objectives: [
        "Understand TypeScript's core type system",
        "Create strongly typed application models",
      ],
      topics: ["Types", "Interfaces", "Generics"],
    },
    {
      week_number: 2,
      title: "React Fundamentals",
      objectives: [
        "Build reusable components",
        "Manage component state and side effects",
      ],
      topics: ["Components", "Props", "Hooks"],
    },
    {
      week_number: 3,
      title: "Backend and Data",
      objectives: [
        "Create a REST API with Node.js",
        "Store and retrieve data from a database",
      ],
      topics: ["Express", "REST", "SQL"],
    },
  ],
};

export function PlanDetailsPage() {
  const { user } = useAuth();
  const [plann, setPlann] = useState<SavedPlan>(DUMMY_PLAN);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { planId } = useParams();

  useEffect(() => {
    async function loadPlan() {
      setIsLoading(true);
      setError(null);
      const id: number = Number(planId);

      try {
        const response = await getPlanById(id);
        if (response.success) {
          const fetchedPlan = Array.isArray(response.plan)
            ? response.plan[0]
            : response.plan;

          if (!fetchedPlan) {
            setError("Could not load this study plan.");
            return;
          }

          setPlann(fetchedPlan);
        } else {
          setError("Could not load this study plan.");
        }
      } catch (error: unknown) {
        setError(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    void loadPlan();
  }, [user]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
      <main className="mx-auto w-full max-w-4xl">
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] transition hover:text-[var(--accent)]"
        >
          <span aria-hidden="true">&larr;</span>
          Back to saved plans
        </Link>

        {isLoading && (
          <section className="mt-5 rounded-lg border border-[var(--glass-border)] bg-white/70 p-8 shadow-xl backdrop-blur-xl">
            <div className="flex min-h-40 flex-col items-center justify-center">
              <span className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--accent)]" />
              <p className="mt-4 text-sm font-semibold text-[var(--text-muted)]">
                Loading study plan...
              </p>
            </div>
          </section>
        )}

        {error && !isLoading && (
          <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {!isLoading && !error && (
          <>
            <section className="mt-5 rounded-lg border border-[var(--glass-border)] bg-white/70 p-6 shadow-xl backdrop-blur-xl sm:p-8">
              <p className="eyebrow">Study plan</p>
              <h1 className="mt-3 text-3xl font-black leading-tight text-[var(--text)] sm:text-4xl">
                {plann.title}
              </h1>
              {plann.description && (
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                  {plann.description}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-[var(--text-muted)]">
                <span className="rounded-full border border-[var(--glass-border)] bg-white/80 px-3 py-1.5">
                  {plann.weeks.length} weeks
                </span>
                {plann.createdAt && (
                  <span className="rounded-full border border-[var(--glass-border)] bg-white/80 px-3 py-1.5">
                    Created {new Date(plann.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </section>

            <section className="mt-6 rounded-lg border border-[var(--glass-border)] bg-white/70 p-6 shadow-xl backdrop-blur-xl sm:p-8">
              <h2 className="text-2xl font-black text-[var(--text)]">
                Weekly breakdown
              </h2>

              <div className="mt-6 space-y-4">
                {plann.weeks.map((week) => (
                  <article
                    key={week.week_number}
                    className="rounded-lg border border-[var(--glass-border)] bg-[var(--surface-soft)]/65 p-5 sm:p-6"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                      Week {week.week_number}
                    </p>
                    <h3 className="mt-2 text-xl font-black text-[var(--text)]">
                      {week.title}
                    </h3>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-bold text-[var(--text)]">
                          Objectives
                        </h4>
                        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--text-muted)]">
                          {week.objectives.map((objective) => (
                            <li key={objective}>{objective}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-[var(--text)]">
                          Topics
                        </h4>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {week.topics.map((topic) => (
                            <span
                              key={topic}
                              className="rounded-full border border-[var(--glass-border)] bg-white/80 px-3 py-1.5 text-xs text-[var(--text-muted)]"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
