"use client";

export default function StatusBadge({ status }) {
  const colors = {
    PLANNED: "bg-yellow-100 text-yellow-700",
    ACTIVE: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colors[status]}`}
    >
      {status}
    </span>
  );
}
