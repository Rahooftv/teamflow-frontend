"use client";

import { useEffect, useState } from "react";
import axios from "../lib/api"; 


export default function Header() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <header className="bg-black shadow-lg px-8 py-5 flex justify-between items-center ">

      <div className="flex items-center gap-3">
       
        <h1 className="text-2xl font-extrabold text-white tracking-tight select-none">TeamFlow</h1>
      </div>

     
      <div className="flex items-center space-x-4">
        {loading ? (
          <span className="text-gray-400 animate-pulse">Loading...</span>
        ) : user ? (
          <div className="flex items-center gap-3">
          
            <div className="flex flex-col items-start">
              <span className="text-white font-semibold">Name: {user.name}</span>
            
            </div>
          </div>
        ) : (
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 hover:scale-105 transition-all duration-150"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
