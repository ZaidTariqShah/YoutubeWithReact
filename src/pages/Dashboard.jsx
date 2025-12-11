import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
          {/* Header */}
          <div className="bg-neutral-800/80 border-b border-neutral-700 px-8 py-8 relative">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-24 h-24 rounded-xl border-2 border-neutral-600 object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-neutral-100 leading-tight mb-1 truncate">
                  {user.fullName}
                </h1>
                <p className="text-neutral-400 text-lg mb-4">
                  @{user.username}
                </p>
                <p className="text-neutral-400 text-sm bg-neutral-700/50 px-4 py-1 rounded-lg inline-block max-w-max">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
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

            <div className="pt-8 border-t border-neutral-700">
              <p className="text-center text-neutral-400 text-sm py-4 bg-neutral-800/50 rounded-lg">
                Authentication verified
              </p>
            </div>

            {/* Logout Button */}
            <div className="pt-4 flex justify-center">
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
