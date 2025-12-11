import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!", {
      style: {
        background: "#0f172a",
        color: "#a7f3d0",
        border: "1px solid #10b981",
        borderRadius: "10px",
      },
    });
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-2xl border-b border-slate-800/50 px-8 py-5 flex items-center justify-between shadow-2xl z-50">
      {/* Logo */}
      <Link
        to="/dashboard"
        className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent hover:from-emerald-300 hover:to-teal-400 transition-all duration-300 flex items-center gap-2 group"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" />
        MyApp
      </Link>

      {/* RIGHT SIDE */}
      {user ? (
        <div className="flex items-center gap-6">
          {/* Notifications Badge */}
          <div className="relative group">
            <button className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-xl transition-all duration-200 relative">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-xs rounded-full flex items-center justify-center text-white font-bold">
                3
              </span>
            </button>
          </div>

          {/* Avatar Container */}
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-2xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 object-cover shadow-xl hover:border-emerald-400/50 hover:shadow-emerald-500/10 transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-3 border-slate-900 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>

            {/* Username */}
            <div className="hidden md:block">
              <span className="text-slate-200 font-semibold text-sm tracking-wide truncate max-w-28">
                {user.username}
              </span>
              <div className="w-3 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mt-1 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-rose-500/25 active:scale-95 transition-all duration-200 border border-rose-600/30 flex items-center gap-1.5"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-5 py-2.5 text-slate-300 hover:text-white font-medium text-sm rounded-xl hover:bg-slate-800/50 border border-slate-700/50 hover:border-slate-500/50 transition-all duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-emerald-500/25 active:scale-[0.97] transition-all duration-200 border border-emerald-500/30"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
