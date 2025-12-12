import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AvatarUpdate from "../components/AvatarUpdate";
import CoverImage from "../components/CoverImage";
import UpdateAccountForm from "../components/UpdateAccountForm";

const Dashboard = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  // ------------------ LOADING SKELETON ------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-neutral-800/50 border border-neutral-700/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden p-8">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-neutral-700 rounded-xl animate-pulse"></div>

              <div className="flex-1 space-y-4">
                <div className="h-6 w-40 bg-neutral-700 rounded-lg animate-pulse"></div>
                <div className="h-4 w-24 bg-neutral-700 rounded-lg animate-pulse"></div>
                <div className="h-4 w-32 bg-neutral-700 rounded-lg animate-pulse"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="h-20 bg-neutral-700 rounded-lg animate-pulse"></div>
              <div className="h-20 bg-neutral-700 rounded-lg animate-pulse"></div>
            </div>

            <div className="mt-8 h-12 bg-neutral-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------ IF NO USER FOUND ------------------
  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center text-xl">
        Session expired — please login again.
      </div>
    );
  }

  // ------------------ MAIN UI ------------------
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-neutral-800/50 border border-neutral-700/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          {/* ----------------- COVER IMAGE ----------------- */}
          <div className="relative h-40 bg-neutral-800/40 border-b border-neutral-700 overflow-hidden">
            {user.coverImage ? (
              <img
                src={user.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 opacity-60" />
            )}
          </div>

          {/* ----------------- HEADER CONTENT ----------------- */}
          <div className="px-8 pb-8 pt-12 relative">
            {/* Avatar Overlapping */}
            <div className="absolute -top-12 left-8">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-24 h-24 rounded-xl border-4 border-neutral-900 object-cover shadow-xl"
              />
            </div>

            {/* User Info */}
            <div className="ml-36 pt-1">
              <h1 className="text-3xl font-bold text-neutral-100 leading-tight mb-1 truncate">
                {user.fullName}
              </h1>
              <p className="text-neutral-400 text-lg mb-4">@{user.username}</p>

              <p className="text-neutral-400 text-sm bg-neutral-700/50 px-4 py-1 rounded-lg inline-block max-w-max">
                {user.email}
              </p>
            </div>
          </div>

          {/* ----------------- CONTENT BOX ----------------- */}
          <div className="p-8 space-y-10">
            {/* User ID + Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  User ID
                </label>
                <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 font-mono text-sm break-all">
                  {user._id}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Status
                </label>
                <div className="flex items-center justify-center h-12 bg-neutral-800 border border-neutral-700 rounded-lg">
                  <span className="text-emerald-400 font-semibold text-sm">
                    Active Session
                  </span>
                </div>
              </div>
            </div>

            {/* ----------------- PROFILE SETTINGS ----------------- */}
            <div className="pt-6 border-t border-neutral-700">
              <h2 className="text-neutral-300 text-lg font-semibold mb-6">
                Profile Settings
              </h2>

              {/* Cover Image Update */}
              <CoverImage />

              {/* Avatar Update */}
              <AvatarUpdate />

              {/* Account Details Form */}
              <UpdateAccountForm />
            </div>

            {/* ------------------ Logout Button ------------------ */}
            <div className="pt-6 flex justify-center">
              <button
                onClick={handleLogout}
                className="w-40 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded-lg transition-all shadow-md hover:shadow-red-500/30"
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
