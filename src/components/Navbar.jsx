import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useState, useRef } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(false);
  const closeTimeout = useRef(null);

  const handleOpen = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenDropdown(true);
  };

  const handleClose = () => {
    closeTimeout.current = setTimeout(() => setOpenDropdown(false), 250);
  };

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
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-10 py-5 flex items-center justify-between shadow-xl z-50 select-none">
      {/* LEFT — LOGO */}
      <Link to="/dashboard" className="flex items-center gap-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_6px_#10b981]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.6"
          stroke="currentColor"
        >
          <path d="M12 3L3 9l9 12 9-12-9-6z" />
        </svg>

        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent tracking-wide">
          Prime
        </span>
      </Link>

      {/* CENTER — NAV BUTTONS */}
      {user && (
        <div className="flex items-center gap-20">
          {/* HOME */}
          <div className="flex flex-col items-center group">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 11.5L12 4l9 7.5M5 10v10h14V10"
                />
              </svg>
            </button>
            <span className="text-[12px] text-slate-500 group-hover:text-slate-300 mt-1">
              Home
            </span>
          </div>

          {/* ALERTS — NOW REDIRECTS TO /alerts */}
          <Link
            to="/alerts"
            className="flex flex-col items-center group relative"
          >
            <div className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition relative cursor-pointer">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.4-1.4A2 2 0 0118 14.16V11a6 6 0 00-4-5.66V5a2 2 0 10-4 0v.34A6 6 0 006 11v3.16c0 .54-.21 1.06-.6 1.44L4 17h5m6 0v1a3 3 0 11-6 0v-1"
                />
              </svg>

              {/* Badge */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-xs flex items-center justify-center rounded-full font-semibold">
                3
              </span>
            </div>

            <span className="text-[12px] text-slate-500 group-hover:text-slate-300 mt-1">
              Alerts
            </span>
          </Link>

          {/* SETTINGS */}
          <div
            className="flex flex-col items-center relative"
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
          >
            <button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition">
              {/* ULTRA GEAR V2 */}
              <svg
                className={`w-7 h-7 transition-all duration-300 ${
                  openDropdown ? "rotate-90 drop-shadow-[0_0_8px_#6366f1]" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.7"
                stroke="url(#gearGradient)"
              >
                <defs>
                  <linearGradient id="gearGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="
                    M10.325 4.317a1.724 1.724 0 013.35 0
                    c.197.81.94 1.317 1.676 1.066
                    a1.724 1.724 0 012.42 2.42
                    c-.25.736.256 1.48 1.066 1.676
                    a1.724 1.724 0 010 3.35
                    c-.81.197-1.317.94-1.066 1.676
                    a1.724 1.724 0 01-2.42 2.42
                    c-.736-.25-1.48.256-1.676 1.066
                    a1.724 1.724 0 01-3.35 0
                    c-.197-.81-.94-1.317-1.676-1.066
                    a1.724 1.724 0 01-2.42-2.42
                    c.25-.736-.256-1.48-1.066-1.676
                    a1.724 1.724 0 010-3.35
                    c.81-.197 1.317-.94 1.066-1.676
                    a1.724 1.724 0 012.42-2.42
                    c.736.25 1.48-.256 1.676-1.066z
                  "
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>

            <span className="text-[12px] text-slate-500">Settings</span>

            {/* DROPDOWN */}
            {openDropdown && (
              <div className="absolute top-[125%] right-0 bg-slate-900 border border-slate-700 w-56 rounded-xl shadow-xl py-2 z-50">
                <Link
                  to="/settings/profile"
                  className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Update Profile
                </Link>
                <Link
                  to="/settings/password"
                  className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Change Password
                </Link>
                <Link
                  to="/settings/avatar"
                  className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Update Avatar
                </Link>
                <Link
                  to="/settings/cover"
                  className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Update Cover Image
                </Link>

                <div className="border-t border-slate-700 my-1" />

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-rose-400 hover:bg-rose-600/10 hover:text-rose-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RIGHT — USER AVATAR */}
      {user && (
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            className="w-11 h-11 rounded-2xl border border-slate-700 shadow-md object-cover"
          />
          <span className="text-slate-200 font-semibold">{user.username}</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
