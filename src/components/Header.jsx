"use client";

import { useEffect, useState } from "react";
import { FiBell, FiSearch, FiChevronDown } from "react-icons/fi";
import axios from "../lib/api";

export default function Header() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30 backdrop-blur-sm bg-white/95">
      <div className="px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Left Section - Search */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
        <h1 className="text-2xl font-extrabold text-black tracking-tight select-none">TeamFlow</h1>
        </div>

        {/* Right Section - User Actions */}
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
              <div className="w-20 h-4 bg-slate-200 rounded animate-pulse"></div>
            </div>
          ) : user ? (
            <>
              {/* Notifications */}
              <button className="relative p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200">
                <FiBell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-semibold text-slate-800">
                      {user.name}
                    </span>
                    <span className="text-xs text-slate-500 capitalize">
                      {user.role}
                    </span>
                  </div>
                  <FiChevronDown
                    className={`text-slate-400 transition-transform duration-200 ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                    size={16}
                  />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowDropdown(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-20">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-800">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                          Profile Settings
                        </button>
                       
                        <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                          Help & Support
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}