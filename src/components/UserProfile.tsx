import { useState } from "react";

type UserProfileData = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

type SavedPlan = {
  id: number;
  title: string;
  description: string;
  category: string;
  weeks: number;
};

const mockSavedPlans: SavedPlan[] = [
  {
    id: 1,
    title: "Master React & TypeScript",
    description:
      "Build production-ready React applications with TypeScript, hooks, and modern patterns.",
    category: "Web Development",
    weeks: 8,
  },
  {
    id: 2,
    title: "Data Structures & Algorithms",
    description:
      "Deep dive into arrays, trees, graphs, and dynamic programming with weekly problem sets.",
    category: "Computer Science",
    weeks: 12,
  },
  {
    id: 3,
    title: "Introduction to Machine Learning",
    description:
      "Learn supervised and unsupervised learning fundamentals with hands-on Python projects.",
    category: "AI & Data",
    weeks: 10,
  },
];

interface UserProfileProps {
  user: UserProfileData | null;
  isLoading: boolean;
  error: string | null;
}

export function UserProfile({ user, isLoading, error }: UserProfileProps) {
  const initials =
    user?.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  const [activeIndex, setActiveIndex] = useState(0);
  const total = mockSavedPlans.length;
  const goPrev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const goNext = () => setActiveIndex((i) => (i + 1) % total);

  return (
    <div className="flex w-full flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8 min-h-[calc(100vh-2rem)]">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="inline-flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-700">
            {initials}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Profile
            </p>
            <h2 className="mt-1 break-words text-3xl font-bold text-slate-900">
              {user?.name || "User account"}
            </h2>
            <p className="mt-1 break-words text-base text-slate-500">
              {user?.email || "Account information"}
            </p>
          </div>
        </div>

        {isLoading && (
          <p className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
            Loading profile information...
          </p>
        )}

        {error && (
          <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {user && !isLoading && (
          <div className="mt-8 grid flex-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Name
              </p>
              <p className="mt-2 break-words text-base font-semibold text-slate-900">
                {user.name}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Email
              </p>
              <p className="mt-2 break-words text-base font-semibold text-slate-900">
                {user.email}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                User ID
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                #{user.id}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Role
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                {user.isAdmin ? "Admin" : "Student"}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Saved Plans Section */}
      <section className="mx-auto mt-6 flex w-full max-w-6xl flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Library
            </p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">
              My Saved Plans
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Browse the study plans you have saved.
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2 sm:mt-0">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous plan"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition cursor-pointer hover:bg-slate-100"
            >
              ‹
            </button>
            <span className="text-xs font-semibold text-slate-500">
              {activeIndex + 1} / {total}
            </span>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next plan"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition cursor-pointer hover:bg-slate-100"
            >
              ›
            </button>
          </div>
        </div>

        <div className="mt-8 flex-1 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {mockSavedPlans.map((plan) => (
              <article
                key={plan.id}
                className="w-full shrink-0 px-1"
              >
                <div className="flex h-full min-h-[20rem] flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {plan.category}
                  </p>
                  <h4 className="break-words text-2xl font-bold text-slate-900">
                    {plan.title}
                  </h4>
                  <p className="text-base leading-7 text-slate-600">
                    {plan.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium">
                      {plan.weeks} weeks
                    </span>
                  </div>
                  <div className="mt-auto pt-4">
                    <button
                      type="button"
                      className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition cursor-pointer hover:bg-blue-700"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {mockSavedPlans.map((plan, index) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to plan ${index + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                index === activeIndex
                  ? "w-8 bg-blue-600"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
