import { useForm } from "react-hook-form";
import api from "../api/api";
import { toast } from "react-hot-toast";

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/change-password", data);
      toast.success("Password changed successfully!");
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error changing password");
    }
  };

  return (
    <div className="w-full flex justify-center px-10 pt-10 pb-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl bg-neutral-950/85 border border-neutral-800 rounded-xl 
                   px-10 py-8 shadow-[0_16px_40px_rgba(0,0,0,0.6)] 
                   transition-all duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-100 tracking-wide">
              Change Password
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Secure your account by updating your password.
            </p>
          </div>

          <span
            className="inline-flex items-center rounded-full border border-indigo-500/40 
                       bg-indigo-500/10 px-3 py-1 text-[10px] font-medium 
                       uppercase tracking-[0.18em] text-indigo-300"
          >
            Secure
          </span>
        </div>

        {/* FORM FIELDS */}
        <div className="space-y-5">
          {/* OLD PASSWORD */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 tracking-wide">
              Old password
            </label>

            <input
              type="password"
              {...register("oldPassword", {
                required: "Old password is required",
              })}
              placeholder="Enter your old password"
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 text-neutral-100 text-sm
                         border border-neutral-700 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 
                         placeholder-neutral-500 transition"
            />

            {errors.oldPassword && (
              <p className="text-[11px] text-red-400 mt-0.5">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          {/* NEW PASSWORD */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 tracking-wide">
              New password
            </label>

            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
              })}
              placeholder="Enter a new password"
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 text-neutral-100 text-sm
                         border border-neutral-700 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 
                         placeholder-neutral-500 transition"
            />

            {errors.newPassword && (
              <p className="text-[11px] text-red-400 mt-0.5">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 tracking-wide">
              Confirm new password
            </label>

            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your new password",
              })}
              placeholder="Re-enter your new password"
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 text-neutral-100 text-sm
                         border border-neutral-700 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 
                         placeholder-neutral-500 transition"
            />

            {errors.confirmPassword && (
              <p className="text-[11px] text-red-400 mt-0.5">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-7 flex items-center justify-between gap-4">
          <p className="text-[11px] text-neutral-500">
            Use a strong password to keep your account safe.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg 
                       bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-neutral-900
                       shadow-md shadow-indigo-500/25 
                       hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/35
                       active:bg-indigo-500 active:shadow 
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V2C5.58 2 2 5.58 2 10h2zm2 5.29A7.96 7.96 0 014 12H2c0 3.04 1.13 5.82 3 7.94L6 17.29z"
                  />
                </svg>
                <span>Saving…</span>
              </>
            ) : (
              <span>Save changes</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
