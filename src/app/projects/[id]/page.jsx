"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiPlus, FiAlertCircle} from "react-icons/fi";
import api from "../../../lib/api";
import TaskCard from "../../../components/ui/TaskCard";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
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

  const handleEditTask = async (task) => {
   
    router.push(`/projects/${params.id}/tasks/${task.id}/edit`);
  };

  const handleDeleteTask = async (task) => {
    if (!confirm(`Are you sure you want to delete "${task.title}"?`)) return;
    
    try {
      await api.delete(`/tasks/${task.id}`);
      setTasks(tasks.filter(t => t.id !== task.id));
    } catch (err) {
      console.error("Failed to delete task:", err);
      alert("Failed to delete task. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-medium">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <FiAlertCircle size={48} className="text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Project not found</h3>
          <p className="text-slate-500 mb-6">The project you're looking for doesn't exist or has been deleted.</p>
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <FiArrowLeft size={20} />
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const tasksByStatus = {
    TODO: tasks.filter(t => t.status === 'TODO'),
    IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS'),
    DONE: tasks.filter(t => t.status === 'DONE')
  };

  const completionPercentage = tasks.length > 0 
    ? Math.round((tasksByStatus.DONE.length / tasks.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6">
      
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Tasks</h2>
            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {tasks.length} total
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <FiAlertCircle size={48} className="text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No tasks yet</h3>
              <p className="text-slate-500 mb-6">Adding your first task to this project</p>
             
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  userRole={user.role}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}