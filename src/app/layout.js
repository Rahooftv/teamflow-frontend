"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Sidebar from "../components/sidebar/Sidebar";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showLayout = pathname !== "/login";

  return (
    <html lang="en">
      <body className="h-screen m-0 p-0 flex overflow-hidden">
        {showLayout && <Sidebar />}
        <div className="flex-1 flex flex-col h-full">
          {showLayout && <Header />}
          <main className="flex-1 overflow-y-auto p-6 bg-white">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
