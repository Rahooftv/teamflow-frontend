"use client";

import { FiMenu, FiX } from "react-icons/fi";

export default function MobileToggle({ isOpen, toggle }) {
  return (
    <button
      onClick={toggle}
      className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
    >
      {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
    </button>
  );
}
