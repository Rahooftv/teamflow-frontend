"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/auth/login", { email, password });
      router.push("/dashboard"); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center  px-4">
      <div className="bg-white  rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-wide select-none">
          Welcome Back
        </h2>
        {error && (
          <p className="text-red-600 text-center mb-6 font-semibold">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-bold py-3 rounded-xl shadow-md shadow-blue-400/50"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500 text-sm select-none">
          Don’t have an account?{" "}
          <a
           
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
