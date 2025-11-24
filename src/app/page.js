"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../lib/api"

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("/auth/me");
        const user = res.data.user;

        if (user) {
          router.push("/dashboard"); 
        } else {
          router.push("/login");
        }
      } catch (err) {
        router.push("/login"); 
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <p className="text-gray-500">Checking authentication...</p>
      ) : null}
    </div>
  );
}
