"use client"

import "./globals.css";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function RootLayout({ children }) {
  const pathname = usePathname();


  const showLayout = pathname !== "/login";

  return (
    <html lang="en">
      <body className="h-full m-0 p-0 overflow-hidden flex">
        {showLayout && <Sidebar />}
        <div className="flex-1 flex flex-col">
          {showLayout && <Header />}
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
