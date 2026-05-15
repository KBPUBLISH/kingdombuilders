import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export function NotFound() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="mx-auto max-w-2xl rounded-3xl border border-ink-900/10 bg-white/80 p-12 text-center shadow-soft">
          <p className="font-serif text-6xl font-semibold text-ink-950 sm:text-7xl">
            404
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-ink-950 sm:text-4xl">
            This page wandered off.
          </h1>
          <p className="mt-3 text-ink-700">
            The link may be broken or the page may have been moved. Let's get
            you back home.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/" className="btn-primary">
              <Home className="h-4 w-4" /> Back to home
            </Link>
            <Link to="/books" className="btn-ghost">
              <ArrowLeft className="h-4 w-4" /> Browse books
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
