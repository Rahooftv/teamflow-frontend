"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await api.get("/auth/me");
        setUser(resUser.data.user);

        const resProjects = await api.get("/projects");
        setProjects(resProjects.data.projects);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <p className="p-6 text-gray-600 font-medium text-center text-lg">
        Loading...
      </p>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-green-600 tracking-wide">
          PROJECTS
        </h1>
        {user?.role === "ADMIN" && (
          <Link
            href="/projects/create"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Project
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="bg-white shadow-sm rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <h2 className="text-xl font-bold text-gray-900 truncate">
              {project.name}
            </h2>
            <p className="text-purple-600 mt-3 min-h-[3rem]">
              {project.description || "No description"}
            </p>
            <p className="text-sm text-gray-700 mt-5 italic">
              Created by: {project.created_by || "Unknown"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
