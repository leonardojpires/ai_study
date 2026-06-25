import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 my-8 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-sm text-slate-600">
        The page you were looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 cursor-pointer"
      >
        Back to home
      </Link>
    </div>
  );
}