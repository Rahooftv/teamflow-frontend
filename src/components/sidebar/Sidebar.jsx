"use client";

import { useState } from "react";
import { FiHome, FiFolder, FiCheckSquare, FiLogOut } from "react-icons/fi";
import MobileToggle from "./MobileToggle";
import SidebarLink from "./SidebarLink";
import axios from "../../lib/api";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
    
      <MobileToggle isOpen={isMobileOpen} toggle={toggleMobileSidebar} />

   
      {isMobileOpen && (
        <div
          onClick={toggleMobileSidebar}
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-85 h-screen bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 
          text-white flex flex-col shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="px-6 py-8 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
              <FiCheckSquare className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1>
              <p className="text-xs text-indigo-300">Project Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-7 overflow-y-auto">
          

          <SidebarLink
            href="/dashboard"
            icon={<FiHome />}
            label="Dashboard"
            onClick={toggleMobileSidebar}
          />
          <SidebarLink
            href="/projects"
            icon={<FiFolder />}
            label="Projects"
            onClick={toggleMobileSidebar}
          />
          <SidebarLink
            href="/tasks"
            icon={<FiCheckSquare />}
            label="Tasks"
            onClick={toggleMobileSidebar}
          />
        </nav>

        {/* Logout */}
        <div className="px-4 pb-6 border-t border-white/10 pt-4">
          <button
            onClick={() => {
              handleLogout();
              toggleMobileSidebar();
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg 
                     bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-400/30
                     transition-all duration-200 group"
          >
            <FiLogOut className="text-lg group-hover:text-red-400 transition-colors" />
            <span className="font-medium group-hover:text-red-400 transition-colors">
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
