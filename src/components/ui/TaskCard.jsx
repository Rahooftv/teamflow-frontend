import { FiClock, FiUser, FiEdit2, FiTrash2, FiCheckCircle, FiCircle } from "react-icons/fi";

export default function TaskCard({ task, userRole, onEdit, onDelete }) {
  const statusConfig = {
    TODO: {
      bg: "bg-slate-100",
      text: "text-slate-700",
      icon: <FiCircle size={14} />,
      label: "To Do"
    },
    IN_PROGRESS: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      icon: <FiClock size={14} />,
      label: "In Progress"
    },
    DONE: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: <FiCheckCircle size={14} />,
      label: "Done"
    }
  };

  const priorityConfig = {
    LOW: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      dot: "bg-blue-500"
    },
    MEDIUM: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      dot: "bg-amber-500"
    },
    HIGH: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      dot: "bg-red-500"
    }
  };

  const status = statusConfig[task.status] || statusConfig.TODO;
  const priority = priorityConfig[task.priority?.toLowerCase()] || priorityConfig.LOW;

  return (
    <div className="bg-purple-100 border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1 pr-2">
          {task.title}
        </h3>
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${status.bg} ${status.text}`}>
          {status.icon}
          {status.label}
        </span>
      </div>

      
      <p className="text-slate-600 text-sm mb-4 line-clamp-3">
        {task.description}
      </p>

  
      <div className="flex items-center gap-2 mb-4">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${priority.bg} ${priority.border}`}>
          <div className={`w-2 h-2 rounded-full ${priority.dot}`}></div>
          <span className={`text-xs font-semibold uppercase ${priority.text}`}>
            {task.priority}
          </span>
        </div>
      </div>

  
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mb-4">
        <FiUser size={14} className="text-slate-400" />
        <span className="text-xs text-slate-600">
          {task.assignee_id ? (
            <span className="font-medium text-slate-800">{task.assignee_id}</span>
          ) : (
            <span className="italic text-slate-400">Unassigned</span>
          )}
        </span>
      </div>

  
      {userRole === "ADMIN" && (
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onEdit?.(task)}
            className="flex-1 flex items-center justify-center text-blue-500 gap-2 px-3 py-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300  hover:text-blue-600 rounded-lg text-sm font-medium transition-all duration-200"
          >
            <FiEdit2 size={14} />
            Edit
          </button>
          <button
            onClick={() => onDelete?.(task)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 text-red-500 hover:text-red-600 rounded-lg text-sm font-medium transition-all duration-200"
          >
            <FiTrash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}