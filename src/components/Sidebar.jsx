"use client";

import Link from "next/link";
import { FiHome, FiFolder, FiCheckSquare, FiLogOut } from "react-icons/fi";
import axios from "../lib/api";
import { useRouter } from "next/navigation";



export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout"); 
      router.push("/login")
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <aside className="w-85 h-screen bg-indigo-900 text-white flex flex-col shadow-2xl transition-all duration-500 ease-in-out">
      <nav className="flex-1 mt-10 px-3 gap-y-6 flex flex-col">
        <span className="text-xs text-slate-200 uppercase tracking-wider mb-3 px-2">Dashboard</span>
        <SidebarLink href="/dashboard" icon={<FiHome />} label="Dashboard" />
        <SidebarLink href="/projects" icon={<FiFolder />} label="Projects" />
        <SidebarLink href="/tasks" icon={<FiCheckSquare />} label="Tasks" />
      </nav>

      <div className="mb-6 px-3 border-t border-white/10 pt-4 flex flex-col gap-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 rounded-lg transition bg-white/5 hover:bg-white/10 hover:scale-[1.04] hover:shadow-lg text-white text-base font-medium cursor-pointer anim-fade-in"
        >
          <span className="text-xl"><FiLogOut /></span>
          Logout
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ href, icon, label }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 px-4 py-3 rounded-lg transition bg-white/5 hover:bg-white/10 hover:scale-[1.04] hover:shadow-lg text-white text-base font-medium cursor-pointer anim-fade-in"
    >
      <span className="text-xl">{icon}</span>
      {label}
    </Link>
  );
}
