import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import projectServices from "../Services/projects.Services";
import { ProjectCard } from "../components/index.js";
import { useProjectStore } from "../store/projectStore.js";

function Projects() {
  const { username } = useParams();
  const targetUser = username || "ayush";
  const { allProjects: storedProjects, setAllProjects } = useProjectStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (storedProjects && storedProjects.length > 0) {
      setLoading(false);
      return;
    }

    const fetchAllProjects = async () => {
      setLoading(true);
      try {
        const response = await projectServices.getPublicProjects({
          username: targetUser,
          featured: "",
          cateogary: "",
        });

        if (response?.data) {
          setAllProjects(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch projects", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, [targetUser, setAllProjects, storedProjects.length]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] bg-transparent text-primary-600 dark:text-primary-400 font-black tracking-widest uppercase text-[10px] sm:text-xs transition-colors duration-500">
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
        Accessing Data Archive...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center animate-[slideDown_0.4s_ease-out]">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 text-red-500 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-900/50 rounded-3xl shadow-sm gpu-layer">
          <svg
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Archive Corrupted
        </h1>
        <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400 max-w-sm">
          Failed to establish a secure connection to the primary database.
        </p>
      </div>
    );

  return (
    <section className="relative min-h-screen px-4 pt-10 pb-16 sm:pt-12 sm:pb-24 overflow-hidden transition-colors duration-300 isolate">
      <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xNSkiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] mask-[radial-gradient(ellipse_100%_100%_at_50%_0%,#000_30%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl animate-[slideDown_0.5s_ease-out]">
        <Link
          to={`/${targetUser}`}
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase hover:text-primary-600 dark:hover:text-primary-400 transition-colors group gpu-layer"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Return to Hub
        </Link>

        <div className="flex flex-col items-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm gpu-layer cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>

            <span className="text-[10px] font-bold tracking-widest text-slate-600 dark:text-slate-400 uppercase">
              Full Archive
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight text-center">
            All Projects
          </h1>
          <p className="mt-4 text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400 max-w-xl text-center">
            The complete history of deployed systems, experiments, and active
            repositories.
          </p>
        </div>

        {!storedProjects || storedProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full py-24 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800/80 rounded-[2.5rem] bg-white/50 dark:bg-[#040405]/50 backdrop-blur-xl shadow-sm">
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
            <p className="text-sm font-bold tracking-widest text-slate-500 dark:text-slate-500 uppercase text-center">
              No project records found in the archive
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {storedProjects.map((project) => (
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
      </div>
    </section>
  );
}

export default Projects;
