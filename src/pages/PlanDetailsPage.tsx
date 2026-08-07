import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SavedPlan } from "../types";

const DUMMY_PLAN = {
  title: "Modern Full-Stack Web Development",
  description:
    "A practical, project-led roadmap for building reliable web applications with React, TypeScript, Node.js, and relational databases.",
  duration: "6 weeks",
  commitment: "8 hours / week",
  level: "Intermediate",
  completedWeeks: 2,
  weeks: [
    {
      number: 1,
      title: "TypeScript foundations",
      focus: "Build confidence with the language and its tooling.",
      objectives: [
        "Model application data with interfaces and type aliases",
        "Use unions, generics, and type narrowing effectively",
        "Configure a strict TypeScript project",
      ],
      topics: ["Type system", "Generics", "Utility types", "Compiler config"],
      completed: true,
    },
    {
      number: 2,
      title: "React architecture",
      focus: "Create maintainable, component-driven interfaces.",
      objectives: [
        "Design reusable components with clear responsibilities",
        "Manage local and shared state",
        "Build accessible forms and navigation",
      ],
      topics: ["Components", "Hooks", "State", "Accessibility"],
      completed: true,
    },
    {
      number: 3,
      title: "API design with Node.js",
      focus: "Develop a clean REST API for the study project.",
      objectives: [
        "Structure routes, controllers, and services",
        "Validate and transform incoming data",
        "Handle errors consistently",
      ],
      topics: ["Express", "REST", "Validation", "Error handling"],
      completed: false,
    },
    {
      number: 4,
      title: "Data and persistence",
      focus: "Connect the application to a relational database.",
      objectives: [
        "Design normalized tables and relationships",
        "Write reliable queries and migrations",
        "Keep persistence concerns isolated",
      ],
      topics: ["PostgreSQL", "SQL", "Migrations", "Repositories"],
      completed: false,
    },
    {
      number: 5,
      title: "Authentication and security",
      focus: "Protect user data and authenticated workflows.",
      objectives: [
        "Implement secure session-based authentication",
        "Protect routes and sensitive operations",
        "Apply practical web security fundamentals",
      ],
      topics: ["Authentication", "Cookies", "CSRF", "Authorization"],
      completed: false,
    },
    {
      number: 6,
      title: "Testing and deployment",
      focus: "Ship a dependable production-ready application.",
      objectives: [
        "Test critical frontend and backend flows",
        "Create a repeatable production build",
        "Deploy and verify the complete application",
      ],
      topics: ["Testing", "CI", "Production builds", "Deployment"],
      completed: false,
    },
  ],
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[2.5]">
      <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlanDetailsPage(planId: number) {
  const [plan, setPlan] = useState<SavedPlan[]>([]);

  useEffect(() => {
    async function loadPlan() {
      try {
        // const response = await 
      } catch(err: unknown) {
        setPlan([]);
        console.log("Unavailable plan");
      }
    }
  })

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 rounded-lg px-1 py-2 text-sm font-semibold text-[var(--text-muted)] transition hover:text-[var(--accent)]"
        >
          <span aria-hidden="true">←</span>
          Back to saved plans
        </Link>

        <section className="relative mt-3 overflow-hidden rounded-lg border border-[var(--glass-border)] bg-white/75 p-6 shadow-xl backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[var(--surface-warm)]/80 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-[var(--surface-soft)] blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="eyebrow">Study plan</p>
                <span className="rounded-full border border-[var(--glass-border)] bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                  In progress
                </span>
              </div>
              <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-[var(--text)] sm:text-4xl lg:text-5xl">
                {DUMMY_PLAN.title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                {DUMMY_PLAN.description}
              </p>

              <dl className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
                {[
                  ["Duration", DUMMY_PLAN.duration],
                  ["Commitment", DUMMY_PLAN.commitment],
                  ["Level", DUMMY_PLAN.level],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-[var(--glass-border)] bg-white/65 px-4 py-3 last:col-span-2 sm:min-w-36"
                  >
                    <dt className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-[var(--text)]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>


          </div>
        </section>

        <section className="mt-6 rounded-lg border border-[var(--glass-border)] bg-white/70 p-5 shadow-xl backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Roadmap</p>
              <h2 className="mt-2 text-2xl font-black text-[var(--text)] sm:text-3xl">
                Weekly breakdown
              </h2>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              {DUMMY_PLAN.weeks.length} focused learning milestones
            </p>
          </div>

          <div className="relative mt-8 space-y-4 sm:ml-4 sm:space-y-5">
            <div className="absolute bottom-8 left-5 top-8 hidden w-px bg-[var(--border)] sm:block" />

            {DUMMY_PLAN.weeks.map((week) => (
              <article
                key={week.number}
                className="relative rounded-lg border border-[var(--glass-border)] bg-white/75 p-5 transition hover:border-[var(--border)] hover:bg-white sm:ml-12 sm:p-6"
              >
                <div
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-black sm:absolute sm:-left-[4.3rem] sm:top-6 ${
                    week.completed
                      ? "bg-[var(--accent)] text-white shadow-md"
                      : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]"
                  }`}
                  aria-label={
                    week.completed
                      ? `Week ${week.number} completed`
                      : `Week ${week.number}`
                  }
                >
                  {week.completed ? <CheckIcon /> : week.number}
                </div>

                <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                      Week {week.number}
                    </p>
                    <h3 className="mt-2 text-xl font-black text-[var(--text)]">
                      {week.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      {week.focus}
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--text)]">
                        Objectives
                      </h4>
                      <ul className="mt-3 space-y-2.5">
                        {week.objectives.map((objective) => (
                          <li
                            key={objective}
                            className="flex gap-2.5 text-sm leading-5 text-[var(--text-muted)]"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-warm)]" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--text)]">
                        Topics
                      </h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {week.topics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded-full border border-[var(--glass-border)] bg-[var(--surface-soft)]/75 px-3 py-1.5 text-xs font-semibold text-[var(--text-muted)]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
