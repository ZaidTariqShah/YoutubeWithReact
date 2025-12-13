import { useForm } from "react-hook-form";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  async function onSubmit(data) {
    const fd = new FormData();

    if (data.avatar?.[0]) fd.append("avatar", data.avatar[0]);
    if (data.coverImage?.[0]) fd.append("coverImage", data.coverImage[0]);

    fd.append("fullName", data.fullName);
    fd.append("username", data.username);
    fd.append("email", data.email);
    fd.append("password", data.password);

    try {
      const res = await api.post("/register", fd);

      toast.success(res.data.message || "Registration successful!", {
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

      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.response?.data?.msg ||
          "Something went wrong!",
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
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden px-4 py-10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-10 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e293b_0,_#020617_55%,_#020617_100%)] opacity-80" />
      </div>

      <div className="relative w-full max-w-xl">
        <div className="pointer-events-none absolute -inset-0.5 rounded-[2rem] bg-gradient-to-r from-emerald-500/35 via-sky-400/25 to-indigo-500/35 blur-2xl opacity-70" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-full bg-slate-900/70 backdrop-blur-2xl border border-slate-800/70 shadow-[0_18px_60px_rgba(15,23,42,0.9)] rounded-[1.7rem] px-8 py-10 space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              New to the platform
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50 tracking-tight text-center">
              Create your account
            </h1>

            <p className="text-center text-sm text-slate-400 max-w-sm">
              Upload your profile and enter your details to join us.
            </p>
          </div>

          {/* Avatar */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">Avatar</label>
            <input
              type="file"
              accept="image/*"
              {...register("avatar", { required: "Avatar is required" })}
              className="block w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-200"
            />
            {errors.avatar && (
              <p className="text-rose-400 text-xs">{errors.avatar.message}</p>
            )}
          </div>

          {/* Cover */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">
              Cover Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("coverImage")}
              className="block w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-200"
            />
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">
              Full Name
            </label>
            <input
              className="w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100"
              {...register("fullName", { required: "Full Name is required" })}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-rose-400 text-xs">{errors.fullName.message}</p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">
              Username
            </label>
            <input
              className="w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100"
              {...register("username")}
              placeholder="username"
            />
            {errors.username && (
              <p className="text-rose-400 text-xs">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100"
              {...register("password")}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-rose-400 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">Email</label>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-rose-400 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full rounded-xl bg-emerald-500 text-emerald-950 py-2.5 font-semibold hover:bg-emerald-400 transition"
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>

          {/* Login button */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full mt-3 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 px-4 rounded-lg border border-slate-600 transition"
          >
            Already have an account? Login →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
