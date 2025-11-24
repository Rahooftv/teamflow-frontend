"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLink({ href, icon, label, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center space-x-3 px-4 py-3 rounded-lg
        transition-all duration-200 group relative overflow-hidden
        ${
          isActive
            ? "bg-white/15 text-white shadow-lg border border-white/20"
            : "bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10"
        }
      `}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-r-full" />
      )}

      <span
        className={`text-lg transition-transform duration-200 ${
          isActive ? "scale-110" : "group-hover:scale-110"
        }`}
      >
        {icon}
      </span>

      <span className="font-medium">{label}</span>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </Link>
  );
}
