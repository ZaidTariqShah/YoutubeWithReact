// --- DASHBOARD (STATIC SAFE VERSION) ---
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-8">
        <div
          className="w-full max-w-xl bg-neutral-900/60 border border-neutral-800 
          rounded-2xl p-10 space-y-6 shadow-2xl"
        >
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-xl bg-neutral-800 animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-40 bg-neutral-800 animate-pulse rounded" />
              <div className="h-4 w-32 bg-neutral-800 animate-pulse rounded" />
              <div className="h-4 w-24 bg-neutral-800 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-xl text-neutral-300">
        Session expired — please login again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-5 py-24">
      <div className="max-w-4xl mx-auto">
        {/* CARD */}
        <div
          className="rounded-2xl overflow-hidden bg-neutral-900/70 border border-neutral-800 
          shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          {/* COVER */}
          <div className="relative h-48 bg-neutral-800 overflow-hidden">
            {user.coverImage ? (
              <img
                src={user.coverImage}
                className="w-full h-full object-cover opacity-90"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-700 opacity-60" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent" />
          </div>

          {/* PROFILE HEADER */}
          <div className="px-8 pb-8 pt-16 relative">
            <img
              src={user.avatar}
              className="absolute -top-12 left-8 w-28 h-28 rounded-2xl border-4 border-neutral-900 object-cover shadow-xl"
            />

            <div className="ml-36">
              <h1 className="text-3xl font-bold">{user.fullName}</h1>
              <p className="text-neutral-400 text-lg">@{user.username}</p>
              <span
                className="inline-block mt-3 text-sm text-neutral-300 bg-neutral-800/70 
                border border-neutral-700 px-4 py-1 rounded-lg"
              >
                {user.email}
              </span>
            </div>
          </div>

          {/* DETAILS */}
          <div className="px-8 pb-14 space-y-12">
            {/* USER ID + STATUS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-neutral-400 uppercase font-semibold mb-1">
                  User ID
                </p>
                <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-sm break-all">
                  {user._id}
                </div>
              </div>

              <div>
                <p className="text-xs text-neutral-400 uppercase font-semibold mb-1">
                  Status
                </p>
                <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-400 font-semibold">Active</span>
                </div>
              </div>
            </div>

            {/* QUICK SETTINGS */}
            <div>
              <h2 className="text-xl font-semibold mb-5">Quick Settings</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* SECTION — STATIC COLORS */}

                {/* Edit Profile */}
                <button
                  onClick={() => navigate("/settings/profile")}
                  className="flex gap-4 items-center bg-neutral-900 border border-neutral-800 
                    rounded-xl p-4 hover:bg-neutral-800 hover:border-neutral-700 transition shadow-md"
                >
                  <div className="p-3 bg-neutral-950 border border-neutral-700 rounded-xl">
                    <svg
                      className="w-6 h-6 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.6"
                    >
                      <path d="M4 21v-3.25L14.81 6l3.25 3.25L7.25 21H4z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-semibold text-neutral-200">
                      Edit Profile
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Update name & email
                    </p>
                  </div>
                </button>

                {/* Password */}
                <button
                  onClick={() => navigate("/settings/password")}
                  className="flex gap-4 items-center bg-neutral-900 border border-neutral-800 
                    rounded-xl p-4 hover:bg-neutral-800 hover:border-neutral-700 transition shadow-md"
                >
                  <div className="p-3 bg-neutral-950 border border-neutral-700 rounded-xl">
                    <svg
                      className="w-6 h-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.6"
                    >
                      <path d="M12 17v-5m6 5V9a6 6 0 10-12 0v8h12z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-semibold text-neutral-200">
                      Change Password
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Secure your account
                    </p>
                  </div>
                </button>

                {/* Avatar */}
                <button
                  onClick={() => navigate("/settings/avatar")}
                  className="flex gap-4 items-center bg-neutral-900 border border-neutral-800 
                    rounded-xl p-4 hover:bg-neutral-800 hover:border-neutral-700 transition shadow-md"
                >
                  <div className="p-3 bg-neutral-950 border border-neutral-700 rounded-xl">
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.6"
                    >
                      <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm8 9a8 8 0 10-16 0h16z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-semibold text-neutral-200">
                      Update Avatar
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Update your picture
                    </p>
                  </div>
                </button>

                {/* Cover */}
                <button
                  onClick={() => navigate("/settings/cover")}
                  className="flex gap-4 items-center bg-neutral-900 border border-neutral-800 
                    rounded-xl p-4 hover:bg-neutral-800 hover:border-neutral-700 transition shadow-md"
                >
                  <div className="p-3 bg-neutral-950 border border-neutral-700 rounded-xl">
                    <svg
                      className="w-6 h-6 text-pink-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.6"
                    >
                      <path d="M3 5h18v14H3V5zm5 5l3 4 2-3 4 6H6l2-7z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-semibold text-neutral-200">
                      Change Cover Image
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Customize your header
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* LOGOUT */}
            <div className="flex justify-center">
              <button
                onClick={async () => {
                  await logout();
                  navigate("/login");
                }}
                className="px-10 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold 
                  rounded-lg shadow-md hover:shadow-red-500/30 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
