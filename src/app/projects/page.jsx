"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import Link from "next/link";
import ProjectCard from "../../components/ui/ProjectCard"


export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("/auth/me");
        setUser(userRes.data.user);

        const projectRes = await api.get("/projects");
        setProjects(projectRes.data.projects);

        const allTasks = [];
        for (let project of projectRes.data.projects) {
          const taskRes = await api.get(`/projects/${project.id}/tasks`);
          allTasks.push(...taskRes.data.tasks);
        }
        setTasks(allTasks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <p className="text-center p-6 text-lg text-gray-500">Loading...</p>;

  return (
    <div className="p-8 bg-white min-h-screen">
      
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 tracking-wide">
          Projects
        </h1>

        {user?.role === "ADMIN" && (
          <Link
            href="/projects/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
          >
            + Add Project
          </Link>
        )}
      </div>

    
      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              tasks={tasks}
            />
          ))}
        </div>
      )}
    </div>
  );
}
