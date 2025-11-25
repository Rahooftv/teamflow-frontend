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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statusCount = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { TODO: 0, IN_PROGRESS: 0, DONE: 0 }
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
    
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                Welcome back!
              </h1>
              <p className="text-slate-600 text-lg">
                <span className="font-semibold text-blue-600">{user?.role}</span> Dashboard
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-3">
             
            </div>
          </div>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         
          <div className="bg-orange-300 rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-1">
              Total Projects
            </h3>
            <p className="text-4xl font-bold text-slate-800">{projects.length}</p>
          </div>

   
          <div className="bg-purple-300 rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-1">
              Total Tasks
            </h3>
            <p className="text-4xl font-bold text-slate-800">{tasks.length}</p>
          </div>

          <div className="bg-yellow-100 rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300 md:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
              Task Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">To Do</span>
                </div>
                <span className="text-xl font-bold text-slate-800">{statusCount.TODO}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">In Progress</span>
                </div>
                <span className="text-xl font-bold text-amber-600">{statusCount.IN_PROGRESS}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Done</span>
                </div>
                <span className="text-xl font-bold text-green-600">{statusCount.DONE}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}