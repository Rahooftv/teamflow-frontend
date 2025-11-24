export default function TaskCard({ task, userRole }) {

  const statusColors = {
    TODO: "bg-blue-500 text-white",
    IN_PROGRESS: "bg-yellow-400 text-black",
    DONE: "bg-green-500 text-white",
  };

 
  const priorityColors = {
    low: "bg-green-300 text-green-800",
    medium: "bg-yellow-300 text-yellow-800",
    high: "bg-red-400 text-red-900",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 flex flex-col space-y-3 hover:shadow-lg transition-shadow duration-300">
      <h3 className="font-semibold text-xl text-gray-900">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>

      <div className="flex flex-wrap gap-3 mt-2">
        <p
          className={`px-3 py-1 rounded-full text-sm font-semibold uppercase ${statusColors[task.status] || "bg-gray-300 text-gray-800"}`}
        >
          {task.status}
        </p>

        <p
          className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
            priorityColors[task.priority?.toLowerCase()] || "bg-gray-300 text-gray-800"
          }`}
        >
          Priority: {task.priority}
        </p>
      </div>

      <p className="text-sm text-gray-500">
        Assigned to: <span className="font-medium">{task.assignee_id || "Unassigned"}</span>
      </p>

      {userRole === "ADMIN" && (
        <div className="flex gap-3 mt-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded px-4 py-1 transition">
            Edit
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-1 transition">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
