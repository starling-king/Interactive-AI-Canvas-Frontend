import React from "react";
import ProjectCard from "./ProjectCard";

function ProjectGrid({ projects, targetUser }) {
  return (
    <section className="relative px-4 py-20 sm:py-28 mx-auto max-w-7xl">
      <div className="flex flex-col items-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm gpu-layer cursor-default">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
          <span className="text-[10px] font-bold tracking-widest text-slate-600 dark:text-slate-400 uppercase">
            Portfolio
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight text-center">
          Featured Work
        </h2>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-20 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800/80 rounded-4xl bg-slate-50/50 dark:bg-[#040405]/50 backdrop-blur-sm">
          <svg
            className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          <p className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-500 uppercase">
            No featured projects deployed
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              description={project.description}

              techStack={project.techStack || project.tech_stack}
              category={project.category}
              featuredImage={project.image?.[0]?.imageUrl}
              slug={project.slug}
              username={targetUser}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectGrid;
