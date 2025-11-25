"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../../lib/api"
import Link from "next/link";


export default function EditProjectPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PLANNED");

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data.project);
        setName(res.data.project?.name || "");
        setDescription(res.data.project?.description || "");
        setStatus(res.data.project?.status || "PLANNED");
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

    setSaving(true);
    setError("");
    try {
     
      await api.put(`/projects/update/${id}`, {
        name,
        description,
        status,
      });



      router.push(`/projects`); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold">Project not found</h3>
          <p className="text-sm text-slate-500 mt-2">The requested project does not exist.</p>
          <Link href="/projects" className="inline-block mt-4 text-indigo-600 hover:underline">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Edit Project</h1>
          <Link href={`/projects/${id}`} className="text-sm text-indigo-600 hover:underline">
            View Project
          </Link>
        </div>

        {error && (
          <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Project name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Project description (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="PLANNED">Planned</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <button
                type="submit"
                disabled={saving}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md font-semibold disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

            <div className="text-sm">
              <Link href="/projects" className="text-slate-600 hover:underline">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
