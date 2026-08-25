import React from "react";
import { Link } from "react-router-dom";

function ProjectCard({
  title,
  description,
  techStack,
  tech_stack,
  category,
  featuredImage,
  slug,
  username,
}) {
  const normalizedTechStack = techStack || tech_stack || [];

  return (
    <Link
      to={`/${username}/project/${slug}`}
      className="block h-full group outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-4xl gpu-layer relative"
    >
      <div className="absolute inset-0 rounded-4xl bg-linear-to-br from-primary-500/0 via-slate-400/0 to-primary-500/0 group-hover:from-primary-500/20 group-hover:via-slate-400/10 group-hover:to-primary-500/20 transition-all duration-700 opacity-0 group-hover:opacity-100 blur-[2px]" />

      <div className="relative flex flex-col h-full bg-white/70 dark:bg-[#040405]/80 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.15)] overflow-hidden m-px">
        <div className="relative aspect-16/10 sm:aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-900 m-2 rounded-3xl w-[calc(100%-16px)]">
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-white/95 dark:bg-[#040405]/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl shadow-sm transition-transform duration-500 group-hover:scale-105 gpu-layer">
            <span className="text-primary-500 mr-1.5 animate-pulse inline-block">
              •
            </span>
            {category || "Uncategorized"}
          </div>

          <div className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 bg-slate-900 dark:bg-primary-500 text-white rounded-xl shadow-lg opacity-0 -translate-y-4 translate-x-4 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 gpu-layer">
            <svg
              className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500 delay-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>

          {featuredImage ? (
            <>
              <img
                src={featuredImage}
                alt={title}
                className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-[1.08] group-hover:-rotate-1"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-500 pointer-events-none" />
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-sm font-semibold tracking-wider text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-900/50 uppercase">
              No Image Provided
            </div>
          )}
        </div>

        <div className="relative flex flex-col grow p-5 sm:p-6 sm:pt-4 z-10 overflow-hidden">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 transition-colors duration-300 line-clamp-1">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2 transition-opacity duration-300 group-hover:opacity-0">
            {description}
          </p>

          <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 p-5 sm:p-6 bg-white/95 dark:bg-[#040405]/95 backdrop-blur-md translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
            {normalizedTechStack.map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-lg transition-colors duration-300 group-hover:border-primary-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
