"use client";

import Link from "next/link";
import StatusBadge from "./StatusBadge";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";



export default function ProjectCard({ project, tasks, userRole, onEdit, onDelete }) {
  const router = useRouter();
  const projectTasks = tasks.filter((t) => t.project_id === project.id);

  const completed = projectTasks.filter((t) => t.status === "DONE").length;

  const progress =
    projectTasks.length > 0 ? (completed / projectTasks.length) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300">

 
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-slate-800">{project.name}</h3>
        <StatusBadge status={project.status} />
      </div>

      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
        {project.description || "No description"}
      </p>

     
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 font-medium">Progress</span>
          <span className="text-slate-800 font-bold">{Math.round(progress)}%</span>
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
         <button
            onClick={() => router.push(`/projects/${project.id}`)}
            className="text-sm text-indigo-600 flex items-center gap-2 bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 rounded-lg py-2 px-3 font-medium"
          >
            View Tasks
          </button>
      </div>


      {userRole === "ADMIN" && (
        <div className="flex gap-3 mt-4 pt-3 border-t border-slate-200">

          <button
            onClick={() => router.push(`/projects/${project.id}`)}
            className="text-sm text-indigo-600 flex items-center gap-2 bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 rounded-lg py-2 px-3 font-medium"
          >
            View Tasks
          </button>
          <button
            onClick={() => onEdit(project)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 rounded-lg py-2 text-sm font-medium"
          >
            <FiEdit2 size={14} />
            Edit
          </button>
          

          <button
            onClick={() => onDelete(project)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-lg py-2 text-sm font-medium"
          >
            <FiTrash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
