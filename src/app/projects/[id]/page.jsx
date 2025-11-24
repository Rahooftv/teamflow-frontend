"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../lib/api";
import TaskCard from "./components/TaskCard";

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await api.get("/auth/me");
        setUser(resUser.data.user);

        const resProject = await api.get(`/projects/${params.id}`);
        setProject(resProject.data.project);

        const resTasks = await api.get(`/projects/${params.id}/tasks`);
        setTasks(resTasks.data.tasks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!project) return <p className="p-6">Project not found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-500 mb-4">TASKS</h2>
      <h1 className="text-xl font-bold mb-2">{project.name}</h1>
      <p className="text-gray-800 font-semibold mb-6">{project.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} userRole={user.role} />
        ))}
      </div>
    </div>
  );
}
