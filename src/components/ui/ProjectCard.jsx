"use client";

import Link from "next/link";
import StatusBadge from "./StatusBadge";

export default function ProjectCard({ project, tasks }) {
  const projectTasks = tasks.filter((t) => t.project_id === project.id);

  const completed = projectTasks.filter((t) => t.status === "DONE").length;

  const progress =
    projectTasks.length > 0
      ? (completed / projectTasks.length) * 100
      : 0;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 block"
    >
  
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-slate-800">
          {project.name}
        </h3>

        <StatusBadge status={project.status} />
      </div>

  
      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
        {project.description || "No description"}
      </p>

  
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 font-medium">Progress</span>
          <span className="text-slate-800 font-bold">
            {Math.round(progress)}%
          </span>
        </div>

      
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <span className="text-xs text-slate-500 font-medium">
            {projectTasks.length} tasks
          </span>
          <span className="text-xs text-green-600 font-semibold">
            {completed} completed
          </span>
        </div>
      </div>
    </Link>
  );
}
