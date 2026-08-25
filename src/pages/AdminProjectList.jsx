import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdminProjects } from "../store/ProjectSlice";
import projectServices from "../Services/projects.Services";

function AdminProjectList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.ProjectReducer.adminProjects);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (projects && projects.length > 0) {
      setLoading(false);
      return;
    }

    const fetchAdminProjects = async () => {
      setLoading(true);
      try {
        const response = await projectServices.getAllAdminProjects({});

        if (response?.data) {
          dispatch(setAdminProjects(response.data));
        }
      } catch (err) {
        setError("Failed to load projects. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProjects();
  }, [dispatch, projects.length]);

  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project permanently?",
    );
    if (!confirmDelete) return;

    try {
      await projectServices.deleteProject({ id: projectId });

      const updatedProjects = projects.filter(
        (project) => project._id !== projectId,
      );
      dispatch(setAdminProjects(updatedProjects));
    } catch (err) {
      alert("Failed to delete project.");
    }
  };

  const handleToggleStatus = async (projectId, field, currentValue) => {
    try {
      const updatedData = { [field]: !currentValue };

      await projectServices.updateProject({ id: projectId, ...updatedData });

      const updatedProjects = projects.map((project) =>
        project._id === projectId
          ? { ...project, [field]: !currentValue }
          : project,
      );
      dispatch(setAdminProjects(updatedProjects));
    } catch (err) {
      alert(`Failed to update ${field} status.`);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-transparent text-primary-600 dark:text-primary-400 font-black tracking-widest uppercase text-[10px] sm:text-xs transition-colors duration-500">
        <div className="relative flex items-center justify-center w-12 h-12 mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-primary-400 opacity-20 animate-ping"></div>
          <svg
            className="w-8 h-8 animate-spin text-primary-500 opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-100"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        Synchronizing Database...
      </div>
    );

  return (
    <div className="w-full px-4 py-8 mx-auto max-w-7xl animate-[slideDown_0.4s_ease-out]">
      <div className="flex flex-col items-start justify-between gap-6 mb-8 md:flex-row md:items-end">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Project Database
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-lg">
            Manage your portfolio items, toggle visibility status, and assign
            featured highlights to your public interface.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/projects/new")}
          className="flex items-center justify-center w-full md:w-auto px-6 py-3.5 text-xs font-black tracking-widest uppercase text-white bg-primary-500 hover:bg-primary-600 rounded-xl shadow-[0_0_20px_var(--theme-primary-glow)] hover:shadow-[0_0_30px_var(--theme-primary-glow)] transform-gpu hover:-translate-y-0.5 transition-all duration-300 gpu-layer group"
        >
          <svg
            className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Deploy New Asset
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 mb-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl transform-gpu animate-[slideDown_0.3s_ease-out]">
          <svg
            className="w-5 h-5 mt-0.5 shrink-0 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-widest text-red-800 dark:text-red-300 uppercase mb-0.5">
              Database Error
            </span>
            <span className="text-[13px] font-medium text-red-700 dark:text-red-400 leading-snug">
              {error}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col overflow-hidden bg-white/80 dark:bg-[#040405]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none gpu-layer">
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="col-span-5 text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">
            Project Designation
          </div>
          <div className="col-span-3 text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">
            Visibility
          </div>
          <div className="col-span-2 text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase text-center">
            Featured
          </div>
          <div className="col-span-2 text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase text-right">
            Actions
          </div>
        </div>

        <div className="flex flex-col divide-y divide-slate-200/50 dark:divide-slate-800/50">
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <svg
                className="w-10 h-10 mb-4 text-slate-300 dark:text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-sm font-bold tracking-widest text-slate-400 dark:text-slate-600 uppercase">
                No projects in database
              </p>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project._id}
                className="flex flex-col md:grid md:grid-cols-12 gap-4 md:items-center px-6 py-5 hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors duration-300 group"
              >
                <div className="md:col-span-5 flex flex-col items-start">
                  <span className="text-base font-extrabold text-slate-900 dark:text-slate-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </span>
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500 font-mono mt-1">
                    /{project.slug}
                  </span>
                </div>

                <div className="md:col-span-3 flex items-center justify-between md:justify-start w-full md:w-auto mt-2 md:mt-0">
                  <span className="md:hidden text-[11px] font-black tracking-widest text-slate-400 uppercase">
                    Status
                  </span>
                  <button
                    onClick={() =>
                      handleToggleStatus(
                        project._id,
                        "isPublished",
                        project.isPublished,
                      )
                    }
                    className={`inline-flex items-center px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-lg border transition-all duration-300 hover:scale-105 ${
                      project.isPublished
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {project.isPublished ? (
                      <>
                        <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Published
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                        Draft
                      </>
                    )}
                  </button>
                </div>

                <div className="md:col-span-2 flex items-center justify-between md:justify-center w-full md:w-auto mt-2 md:mt-0">
                  <span className="md:hidden text-[11px] font-black tracking-widest text-slate-400 uppercase">
                    Featured
                  </span>
                  <button
                    onClick={() =>
                      handleToggleStatus(
                        project._id,
                        "isFeatured",
                        project.isFeatured,
                      )
                    }
                    className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                      project.isFeatured
                        ? "text-amber-500 bg-amber-50 dark:bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)] dark:shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                        : "text-slate-300 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill={project.isFeatured ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-slate-200 dark:border-slate-800 md:border-t-0">
                  <button
                    onClick={() =>
                      navigate(`/admin/projects/edit/${project._id}`)
                    }
                    className="flex-1 md:flex-none px-4 py-2 text-[11px] font-bold tracking-widest uppercase text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="flex-1 md:flex-none px-4 py-2 text-[11px] font-bold tracking-widest uppercase text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-200/50 dark:border-red-900/50 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProjectList;
