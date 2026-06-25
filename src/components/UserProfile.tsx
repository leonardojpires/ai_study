import { useEffect, useState } from "react";
import { deletePlan, getPlansByUserId } from "../api";
import { SavedPlan } from "../types";

type UserProfileData = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

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

  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [plansError, setPlansError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [planToRemove, setPlanToRemove] = useState<SavedPlan | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [removeError, setRemoveError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading || !user) return;

    let cancelled = false;

    async function loadPlans() {
      setPlansLoading(true);
      setPlansError(null);

      try {
        const response = await getPlansByUserId();
        if (cancelled) return;

        if (response.success) {
          setPlans(response.plans ?? []);
          setActiveIndex(0);
        } else {
          setPlans([]);
          setPlansError("Could not load your saved plans.");
        }
      } catch (err: any) {
        if (cancelled) return;
        setPlans([]);
        setPlansError(err?.message || "Could not load your saved plans.");
      } finally {
        if (!cancelled) {
          setPlansLoading(false);
        }
      }
    }

    void loadPlans();

    return () => {
      cancelled = true;
    };
  }, [user, isLoading]);

  const total = plans.length;
  const goPrev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const goNext = () => setActiveIndex((i) => (i + 1) % total);

  function openRemoveModal(plan: SavedPlan) {
    setPlanToRemove(plan);
    setRemoveError(null);
  }

  function closeRemoveModal() {
    if (isRemoving) return;
    setPlanToRemove(null);
    setRemoveError(null);
  }

  async function confirmRemovePlan() {
    if (!planToRemove || isRemoving) return;

    setIsRemoving(true);
    setRemoveError(null);

    const targetId = planToRemove.id;
    const previousPlans = plans;

    try {
      await deletePlan(targetId);
      
      const remainingPlans = plans.filter((p) => p.id !== targetId);
      setPlans(remainingPlans);
      setActiveIndex((current) => {
        if (remainingPlans.length === 0) return 0;
        return Math.min(current, remainingPlans.length - 1);
      });

      setPlanToRemove(null);
    } catch (err: any) {
      // Roll back if the backend rejects the removal.
      setPlans(previousPlans);
      setRemoveError(err?.message || "Failed to remove the plan. Please try again.");
    } finally {
      setIsRemoving(false);
    }
  }

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
          <div className="mt-8 grid flex-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
          {total > 1 && (
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
          )}
        </div>

        {plansLoading && (
          <p className="mt-8 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
            Loading your saved plans...
          </p>
        )}

        {plansError && !plansLoading && (
          <p className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {plansError}
          </p>
        )}

        {!plansLoading && !plansError && total === 0 && (
          <div className="mt-8 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
            <p className="text-base font-semibold text-slate-700">
              No saved plans yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Save a study plan from the chat to see it appear here.
            </p>
          </div>
        )}

        {!plansLoading && !plansError && total > 0 && (
          <>
            <div className="mt-8 flex-1 overflow-hidden">
              <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {plans.map((plan) => (
                  <article key={plan.id} className="w-full shrink-0 px-1">
                    <div className="flex h-full min-h-[20rem] flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Study Plan
                      </p>
                      <h4 className="break-words text-2xl font-bold text-slate-900">
                        {plan.title}
                      </h4>
                      {plan.description && (
                        <p className="text-base leading-7 text-slate-600">
                          {plan.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium">
                          {plan.weeks?.length ?? 0} weeks
                        </span>
                      </div>
                      <div className="mt-auto flex flex-wrap gap-2 pt-4">
                        <button
                          type="button"
                          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition cursor-pointer hover:bg-blue-700"
                        >
                          View details
                        </button>
                        <button
                          type="button"
                          onClick={() => openRemoveModal(plan)}
                          aria-label={`Remove plan ${plan.title}`}
                          className="rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition cursor-pointer hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {total > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {plans.map((plan, index) => (
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
            )}
          </>
        )}
      </section>

      {/* Remove plan confirmation modal */}
      {planToRemove && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="remove-plan-title"
        >
          <button
            type="button"
            aria-label="Close remove plan dialog"
            onClick={closeRemoveModal}
            disabled={isRemoving}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm cursor-pointer disabled:cursor-not-allowed"
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 9v4m0 4h.01M10.29 3.86l-7.6 13.18A2 2 0 0 0 4.42 20h15.16a2 2 0 0 0 1.73-2.96L13.71 3.86a2 2 0 0 0-3.42 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h4
                  id="remove-plan-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  Remove saved plan?
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  You are about to remove{" "}
                  <span className="font-semibold text-slate-900">
                    “{planToRemove.title}”
                  </span>{" "}
                  from your library. This action cannot be undone.
                </p>
              </div>
            </div>

            {removeError && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {removeError}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeRemoveModal}
                disabled={isRemoving}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition cursor-pointer hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmRemovePlan}
                disabled={isRemoving}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition cursor-pointer hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRemoving && (
                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                {isRemoving ? "Removing…" : "Remove plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
