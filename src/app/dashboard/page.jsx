"use client";

import { useEffect, useState } from "react";
import axios from "../../lib/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get("/auth/me");
        setUser(userRes.data.user);

        const projectRes = await axios.get("/projects");
        setProjects(projectRes.data.projects);

        const allTasks = [];
        for (let project of projectRes.data.projects) {
          const taskRes = await axios.get(`/projects/${project.id}/tasks`);
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
    return (
      <div className="p-6 text-gray-500 text-center text-lg">
        Loading dashboard...
      </div>
    );

  const statusCount = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { TODO: 0, IN_PROGRESS: 0, DONE: 0 }
  );

  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-green-600 tracking-wide">
        {user.role} DASHBOARD
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-sm font-semibold text-gray-700 uppercase mb-2">
            Total Projects
          </h2>
          <p className="text-3xl font-extrabold text-orange-500">{projects.length}</p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-sm font-semibold text-gray-700 uppercase mb-2">
            Total Tasks
          </h2>
          <p className="text-3xl font-extrabold text-purple-600">{tasks.length}</p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-sm font-semibold text-gray-700 uppercase mb-4">
            Tasks by Status
          </h2>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-600 rounded-lg p-4 flex flex-col items-center justify-center shadow-md">
              <p className="text-xs font-semibold uppercase text-white mb-1">
                TODO
              </p>
              <p className="text-2xl font-bold text-white">{statusCount.TODO}</p>
            </div>
            <div className="bg-yellow-400 rounded-lg p-4 flex flex-col items-center justify-center shadow-md">
              <p className="text-xs font-semibold uppercase text-black mb-1">
                In Progress
              </p>
              <p className="text-2xl font-bold text-black">{statusCount.IN_PROGRESS}</p>
            </div>
            <div className="bg-green-500 rounded-lg p-4 flex flex-col items-center justify-center shadow-md">
              <p className="text-xs font-semibold uppercase text-white mb-1">
                Done
              </p>
              <p className="text-2xl font-bold text-white">{statusCount.DONE}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-indigo-600 tracking-wide">
          Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-bold text-red-600 mb-2">{project.name}</h3>
              <p className="text-gray-800 mb-4">{project.description}</p>
              <p className="text-sm text-gray-600 font-medium">
                Tasks: {tasks.filter((t) => t.project_id === project.id).length}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
