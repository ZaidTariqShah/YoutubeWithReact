import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Left: hero copy */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-sky-400 mb-4">
            Welcome back
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Step into your
            <span className="block bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
              personalized dashboard
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base mb-8">
            Access your workspace in seconds or create a new account and get
            started with a clean, modern interface built for speed.
          </p>

          <div className="flex flex-wrap gap-4">
            {/* Primary: Login */}
            <NavLink
              to="/login"
              className="inline-flex items-center justify-center rounded-full border border-sky-500 bg-sky-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-400 hover:shadow-sky-400/40"
            >
              Login
            </NavLink>

            {/* Secondary: Register */}
            <NavLink
              to="/register"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-2.5 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-sky-500 hover:bg-slate-900/60"
            >
              Sign up
            </NavLink>
          </div>
        </div>

        {/* Right: visual card */}
        <div className="relative">
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-sky-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-6 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 shadow-2xl shadow-black/60 backdrop-blur">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Status
                </p>
                <p className="text-lg font-semibold text-slate-50">
                  Ready when you are
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-sky-500/10 text-sky-400 text-xs">
                  1
                </span>
                <div>
                  <p className="font-medium text-slate-100">Fast access</p>
                  <p className="text-xs text-slate-400">
                    Jump back into your work with a single login.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 text-xs">
                  2
                </span>
                <div>
                  <p className="font-medium text-slate-100">
                    Simple onboarding
                  </p>
                  <p className="text-xs text-slate-400">
                    Create a new account in just a few clicks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-fuchsia-500/10 text-fuchsia-400 text-xs">
                  3
                </span>
                <div>
                  <p className="font-medium text-slate-100">Modern design</p>
                  <p className="text-xs text-slate-400">
                    A bold hero, gradients, and depth for a strong first
                    impression.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
              <p>Choose Login if you already have an account.</p>
              <span className="rounded-full border border-slate-700 px-3 py-1 text-[11px] uppercase tracking-wide">
                v1.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
