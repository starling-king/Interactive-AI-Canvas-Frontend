import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { useProjectStore } from "../store/projectStore.js";

function Admin() {
  const currentUser = useAuthStore((state) => state.user);
  const adminProjects = useProjectStore((state) => state.adminProjects);

  const username = currentUser?.username || "ayush";

  const totalProjects = adminProjects.length;
  const featuredProjects = adminProjects.filter(
    (project) => project.isFeatured,
  ).length;
  const publishedProjects = adminProjects.filter(
    (project) => project.isPublished,
  ).length;

  const allSkills = adminProjects.flatMap((project) => project.techStack || []);
  const uniqueSkills = [...new Set(allSkills)];

  const [copied, setCopied] = useState(false);
  const portfolioUrl = `https://www.ayushdev.online/${username}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full px-4 py-8 mx-auto max-w-7xl animate-[slideDown_0.4s_ease-out]">
      <div className="flex flex-col items-start justify-between gap-6 mb-10 md:flex-row md:items-end">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 shadow-sm gpu-layer cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-primary-700 dark:text-primary-400 uppercase">
              System Dashboard
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-primary-400">
              {username}
            </span>
            ! 👋
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Live overview of your system telemetry and deployed portfolio
            assets.
          </p>
        </div>

        <div className="flex items-center p-1.5 bg-white/60 dark:bg-[#040405]/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm gpu-layer">
          <span className="hidden px-4 text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 sm:block truncate max-w-50 lg:max-w-75">
            {portfolioUrl}
          </span>
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#040405] shadow-sm hover:-translate-y-0.5 gpu-layer ${
              copied
                ? "bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                : "bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500 shadow-[0_0_20px_var(--theme-primary-glow)] opacity-90 hover:opacity-100"
            }`}
          >
            {copied ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative p-6 bg-white/60 dark:bg-[#040405]/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-1 group overflow-hidden gpu-layer">
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500/20 group-hover:bg-blue-500 transition-colors duration-500" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">
              Total Projects
            </h3>
            <div className="p-2.5 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 rounded-xl transition-colors duration-500 group-hover:bg-blue-500 group-hover:text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-black text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {totalProjects}
          </p>
        </div>

        <div className="relative p-6 bg-white/60 dark:bg-[#040405]/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-1 group overflow-hidden gpu-layer">
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors duration-500" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">
              Published
            </h3>
            <div className="p-2.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl transition-colors duration-500 group-hover:bg-emerald-500 group-hover:text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-black text-slate-900 dark:text-slate-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
            {publishedProjects}
          </p>
        </div>

        <div className="relative p-6 bg-white/60 dark:bg-[#040405]/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)] transition-all duration-500 hover:-translate-y-1 group overflow-hidden gpu-layer">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500/20 group-hover:bg-amber-500 transition-colors duration-500" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">
              Featured
            </h3>
            <div className="p-2.5 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 rounded-xl transition-colors duration-500 group-hover:bg-amber-500 group-hover:text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-black text-slate-900 dark:text-slate-50 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
            {featuredProjects}
          </p>
        </div>

        <div className="relative p-6 bg-slate-900 dark:bg-[#0a0a0c] border border-slate-800 rounded-3xl shadow-lg flex flex-col justify-between overflow-hidden gpu-layer">
          <div className="absolute inset-0 bg-linear-to-tr from-primary-500/10 to-transparent opacity-50" />
          <h3 className="relative z-10 text-[11px] font-black tracking-widest text-slate-400 uppercase mb-4">
            Command Center
          </h3>
          <div className="relative z-10 flex gap-3 mt-auto">
            <Link
              to="/admin/projects/new"
              className="flex-1 flex items-center justify-center py-2.5 text-xs font-bold tracking-widest uppercase text-white bg-primary-500 hover:bg-primary-600 rounded-xl shadow-[0_0_15px_var(--theme-primary-glow)] opacity-90 hover:opacity-100 hover:-translate-y-0.5 transition-all duration-300"
            >
              + Deploy
            </Link>
            <Link
              to="/admin/messages"
              className="flex-1 flex items-center justify-center py-2.5 text-xs font-bold tracking-widest uppercase text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Inbox
            </Link>
          </div>
        </div>
      </div>

      <div className="p-8 bg-white/60 dark:bg-[#040405]/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm gpu-layer">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-2">
          Aggregated Tech Stack
        </h2>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 max-w-2xl">
          Automatically extracted array of unique skills across all deployed
          projects. Modify your individual project configurations to expand this
          matrix.
        </p>

        {uniqueSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {uniqueSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-block transform-gpu hover:-translate-y-1 px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary-500/50 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-[#040405]/50">
            <svg
              className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <p className="text-sm font-bold tracking-wider uppercase text-slate-400 dark:text-slate-600">
              No parameters detected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
