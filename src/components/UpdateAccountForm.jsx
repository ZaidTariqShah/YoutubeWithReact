import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { toast } from "react-hot-toast";

const UpdateAccountForm = () => {
  const { user, fetchCurrentUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.patch("/update-account", data, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Account updated!");

      await fetchCurrentUser();
      reset(data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update account details"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-neutral-900/40 border border-neutral-700 rounded-xl p-6 shadow-lg"
    >
      <h2 className="text-neutral-200 text-xl font-semibold">
        Update Account Details
      </h2>

      {/* FULL NAME */}
      <div className="space-y-1">
        <label className="text-neutral-300 text-sm">Full Name</label>
        <input
          {...register("fullName", {
            required: "Full name is required",
            minLength: { value: 3, message: "Too short" },
          })}
          className="w-full px-3 py-2 bg-neutral-800 text-neutral-200 border border-neutral-700 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition"
        />
        {errors.fullName && (
          <p className="text-xs text-red-400">{errors.fullName.message}</p>
        )}
      </div>

      {/* EMAIL */}
      <div className="space-y-1">
        <label className="text-neutral-300 text-sm">Email</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email",
            },
          })}
          className="w-full px-3 py-2 bg-neutral-800 text-neutral-200 border border-neutral-700 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition"
        />
        {errors.email && (
          <p className="text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        disabled={isSubmitting}
        className="w-full py-2 rounded-lg bg-emerald-500 text-emerald-950 font-semibold 
                   hover:bg-emerald-400 transition shadow-md 
                   disabled:bg-emerald-600/50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Updating..." : "Update Account"}
      </button>
    </form>
  );
};

export default UpdateAccountForm;
