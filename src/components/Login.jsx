import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { fetchCurrentUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [shake, setShake] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/login", data, { withCredentials: true });

      toast.success(res.data.message || "Logged in successfully!", {
        style: {
          background: "#0f172a",
          color: "#a7f3d0",
          border: "1px solid #10b981",
          borderRadius: "10px",
        },
        iconTheme: {
          primary: "#10b981",
          secondary: "#0f172a",
        },
      });

      await fetchCurrentUser();
      reset();
      navigate("/dashboard");
    } catch (error) {
      // Trigger shake animation
      setShake(true);
      setTimeout(() => setShake(false), 600);

      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Invalid username or password!",
        {
          style: {
            background: "#0f172a",
            color: "#fca5a5",
            border: "1px solid #f43f5e",
            borderRadius: "10px",
          },
          iconTheme: {
            primary: "#f43f5e",
            secondary: "#0f172a",
          },
        }
      );
    }
  };

  // CapsLock handler for keyboard events
  const handleCapsCheck = (e) => {
    try {
      // getModifierState is supported in all modern browsers
      const caps = e.getModifierState && e.getModifierState("CapsLock");
      setCapsLockOn(Boolean(caps));
    } catch {
      setCapsLockOn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* tiny keyframes for shake animation included directly so no Tailwind plugin required */}
      <style>{`
        @keyframes login-shake {
          0% { transform: translateX(0); }
          10% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          50% { transform: translateX(-6px); }
          70% { transform: translateX(6px); }
          90% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
        .shake {
          animation: login-shake 0.6s ease;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-10 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e293b_0,_#020617_55%,_#020617_100%)] opacity-80" />
      </div>

      <div className="relative mx-4 w-full max-w-md">
        <div className="mb-8 text-center space-y-2">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-300/80 shadow-[0_0_30px_rgba(15,23,42,0.9)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            Secure access portal
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
            Welcome back
          </h1>
          <p className="text-sm text-slate-400">
            Sign in to continue to your dashboard.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`space-y-6 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-xl backdrop-blur-xl sm:p-8 ${
            shake ? "shake" : ""
          }`}
        >
          {/* Username */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Username or email
            </label>
            <div className="relative">
              <input
                className="w-full rounded-xl border border-slate-700/80 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-colors"
                placeholder="johndoe or john@example.com"
                {...register("username", { required: "username is required" })}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                @
              </span>
            </div>
            {errors.username && (
              <p className="text-xs font-medium text-rose-400">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-colors"
                placeholder="••••••••"
                {...register("password", {
                  required: "password field is missing",
                })}
                onKeyUp={handleCapsCheck}
                onKeyDown={handleCapsCheck}
                onBlur={() => setCapsLockOn(false)}
              />

              {/* Eye Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-200 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye Open
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  // Eye Closed
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18M10.73 10.73A3 3 0 0113.27 13.27M6.53 6.53C4.59 7.834 3.275 9.76 2.458 12c1.274 4.057 5.065 7 9.542 7 1.794 0 3.487-.443 4.968-1.226M17.47 17.47A10.473 10.473 0 0021.542 12c-.873-2.789-2.892-5.155-5.47-6.53"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Caps Lock Notice */}
            {capsLockOn && (
              <div className="mt-1 flex items-center gap-2 text-xs text-amber-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
                Caps Lock is ON
              </div>
            )}

            {errors.password && (
              <p className="text-xs font-medium text-rose-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <input
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? "Signing in..." : "Sign in"}
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-emerald-950 shadow-[0_18px_45px_rgba(16,185,129,0.55)] transition hover:bg-emerald-400 hover:shadow-[0_20px_55px_rgba(16,185,129,0.75)] disabled:cursor-not-allowed disabled:bg-emerald-600/60 disabled:shadow-none"
          />

          {/* Sign Up */}
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-slate-300 text-sm hover:text-white transition underline-offset-4 hover:underline"
            >
              Don’t have an account? Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
