import { useForm } from "react-hook-form";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { fetchCurrentUser } = useAuth();

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

      // Navigate after toast shows
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.response?.data?.msg ||
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-xl backdrop-blur-xl sm:p-8"
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

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full rounded-xl border border-slate-700/80 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-colors"
                placeholder="••••••••"
                {...register("password", {
                  required: "password field is missing",
                })}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500 text-xs">
                Secure
              </span>
            </div>
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
