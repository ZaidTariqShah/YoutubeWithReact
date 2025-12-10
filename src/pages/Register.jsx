import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../api/api";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  async function onSubmit(data) {
    setServerError("");
    setServerSuccess("");

    const fd = new FormData();

    if (data.avatar && data.avatar.length > 0) {
      fd.append("avatar", data.avatar[0]);
    }

    if (data.coverImage && data.coverImage.length > 0) {
      fd.append("coverImage", data.coverImage[0]);
    }

    fd.append("fullName", data.fullName);
    fd.append("username", data.username);
    fd.append("email", data.email);
    fd.append("password", data.password);

    try {
      const res = await api.post("/register", fd);

      setServerSuccess(res.data.message || "User registered successfully!");
      reset();
    } catch (error) {
      setServerError(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.response?.data?.msg ||
          "Something went wrong!"
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-slate-950 bg-[radial-gradient(circle_at_top,_#1d4ed8_0,_#020617_45%,_#020617_100%)]">
      <div className="relative w-full max-w-xl">
        {/* Glow background */}
        <div className="pointer-events-none absolute -inset-0.5 rounded-[2rem] bg-gradient-to-r from-blue-500/40 via-sky-400/30 to-fuchsia-500/40 blur-2xl opacity-70" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-full bg-slate-900/70 backdrop-blur-2xl border border-slate-700/60 shadow-[0_18px_60px_rgba(15,23,42,0.9)] rounded-[1.7rem] px-8 py-8 sm:px-10 sm:py-10 space-y-6"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              New to the platform
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50 tracking-tight text-center">
              Create your account
            </h1>
            <p className="text-center text-sm text-slate-400 max-w-sm">
              Upload your profile assets and set up your credentials in a few
              seconds.
            </p>
          </div>

          {/* Success Message */}
          {serverSuccess && (
            <p className="bg-emerald-500/10 border border-emerald-500/60 text-emerald-300 px-4 py-3 rounded-xl text-sm text-center flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {serverSuccess}
            </p>
          )}

          {/* Error Message */}
          {serverError && (
            <p className="bg-rose-500/10 border border-rose-500/60 text-rose-300 px-4 py-3 rounded-xl text-sm text-center flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              {serverError}
            </p>
          )}

          {/* Avatar */}
          <div className="space-y-2">
            <label className="flex items-center justify-between text-sm font-medium text-slate-200">
              <span>Avatar</span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Required
              </span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                {...register("avatar", {
                  required: "Avatar Field Is Required",
                })}
                className="block w-full cursor-pointer rounded-xl border border-slate-600/70 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-200 shadow-sm file:mr-4 file:rounded-lg file:border-0 file:bg-sky-500/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:uppercase file:tracking-[0.16em] file:text-sky-300 hover:file:bg-sky-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition"
              />
            </div>
            {errors.avatar && (
              <p className="text-rose-400 text-xs mt-1">
                {errors.avatar.message}
              </p>
            )}
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <label className="flex items-center justify-between text-sm font-medium text-slate-200">
              <span>Cover image</span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Optional
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("coverImage")}
              className="block w-full cursor-pointer rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-200 shadow-sm file:mr-4 file:rounded-lg file:border-0 file:bg-fuchsia-500/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:uppercase file:tracking-[0.16em] file:text-fuchsia-200 hover:file:bg-fuchsia-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition"
            />
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">
              Full name
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 shadow-sm placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition"
              {...register("fullName", {
                required: "Full Name is required",
                maxLength: { value: 6, message: "Max Length is 6" },
              })}
              placeholder="John"
            />
            {errors.fullName && (
              <p className="text-rose-400 text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">
              Username
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 shadow-sm placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition"
              {...register("username", {
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Username must contain only alphabets",
                },
              })}
              placeholder="onlyletters"
            />
            {errors.username && (
              <p className="text-rose-400 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 shadow-sm placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition"
              {...register("password")}
              placeholder="••••••••"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 shadow-sm placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition"
              {...register("email")}
              placeholder="you@example.com"
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={isSubmitting}
            type="submit"
            className={`group relative w-full overflow-hidden rounded-xl border border-sky-500/60 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition ${
              isSubmitting
                ? "cursor-not-allowed opacity-70"
                : "hover:shadow-indigo-500/40 hover:shadow-[0_18px_45px_rgba(37,99,235,0.65)]"
            }`}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/20 to-transparent opacity-0 transition group-hover:opacity-100 group-hover:translate-x-10" />
            <span className="relative flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <span>Register</span>
                  <span className="text-xs opacity-80">→</span>
                </>
              )}
            </span>
          </button>

          <p className="text-[11px] text-center text-slate-500 pt-1">
            By continuing, you agree to the Terms and Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
