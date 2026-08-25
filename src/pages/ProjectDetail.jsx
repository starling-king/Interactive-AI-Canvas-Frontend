import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveProject } from "../store/ProjectSlice";
import projectServices from "../Services/projects.Services";

function ProjectDetail() {
  const { username, slug } = useParams();
  const targetUser = username || "ayush";
  const dispatch = useDispatch();

  const allProjects = useSelector((state) => state.ProjectReducer.allProjects);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadProjectData = async () => {
      setLoading(true);

      const cachedProject = allProjects.find((p) => p.slug === slug);

      if (cachedProject) {
        setProject(cachedProject);
        dispatch(setActiveProject(cachedProject._id));
        setLoading(false);
      } else {
        try {
          const response = await projectServices.getProjectBySlug({
            username: targetUser,
            slug,
          });
          if (response?.data) {
            setProject(response.data);
            dispatch(setActiveProject(response.data._id));
          }
        } catch (error) {
          console.error("Error fetching project details", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProjectData();
  }, [slug, targetUser, allProjects, dispatch]);

  useEffect(() => {
    if (!project?.image || project.image.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === project.image.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [project?.image]);

  const nextImage = () => {
    if (project?.image) {
      setCurrentImageIndex((prev) =>
        prev === project.image.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (project?.image) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? project.image.length - 1 : prev - 1,
      );
    }
  };

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
        Decrypting Project Data...
      </div>
    );

  if (!project)
    return (
      <div className="flex items-center justify-center min-h-[75vh]">
        <div className="p-8 text-center bg-white/60 dark:bg-[#040405]/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Project Null
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            This asset does not exist or has been archived.
          </p>
          <Link
            to={`/${targetUser}/projects`}
            className="inline-block mt-6 px-6 py-2.5 text-sm font-bold text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-colors"
          >
            Return to Grid
          </Link>
        </div>
      </div>
    );

  return (
    <section className="relative min-h-screen px-4 pt-6 pb-24 mx-auto max-w-7xl transition-colors duration-300">
      <Link
        to={`/${targetUser}/projects`}
        className="inline-flex items-center gap-2 mb-6 ml-2 text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase hover:text-primary-600 dark:hover:text-primary-400 transition-colors group gpu-layer"
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
        Return to Grid
      </Link>

      <div className="relative w-full rounded-4xl sm:rounded-[2.5rem] overflow-hidden shadow-lg bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 aspect-16/10 md:aspect-2.5/1 group isolate gpu-layer">
        {project.image && project.image.length > 0 ? (
          <>
            {project.image.map((img, idx) => (
              <img
                key={idx}
                src={img.imageUrl}
                alt={img.altText || `Slide ${idx}`}
                className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${
                  idx === currentImageIndex
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
              />
            ))}

            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent z-10 pointer-events-none" />

            {project.image.length > 1 && (
              <div className="absolute inset-0 z-20 flex items-center justify-between px-4 sm:px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <button
                  onClick={prevImage}
                  className="flex items-center justify-center w-12 h-12 text-white bg-black/20 hover:bg-black/40 backdrop-blur-xl border border-white/20 rounded-full transform-gpu hover:scale-110 transition-all duration-300 pointer-events-auto focus:outline-none shadow-lg"
                >
                  <svg
                    className="w-5 h-5 mr-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="flex items-center justify-center w-12 h-12 text-white bg-black/20 hover:bg-black/40 backdrop-blur-xl border border-white/20 rounded-full transform-gpu hover:scale-110 transition-all duration-300 pointer-events-auto focus:outline-none shadow-lg"
                >
                  <svg
                    className="w-5 h-5 ml-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}

            {project.image && project.image.length > 1 && (
              <div className="absolute flex gap-2 bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20">
                {project.image.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === currentImageIndex
                        ? "w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 font-bold tracking-widest uppercase text-sm">
            No Image Data
          </div>
        )}
      </div>

      <div className="relative z-30 mx-auto max-w-6xl px-4 sm:px-8 -mt-16 sm:-mt-24 md:-mt-32">
        <div className="p-8 sm:p-12 md:p-16 bg-white/95 dark:bg-[#060608]/95 backdrop-blur-3xl border border-slate-200/80 dark:border-slate-800/80 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] gpu-layer">
          <div className="flex flex-col items-start gap-4 mb-10">
            <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-black tracking-widest uppercase bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 rounded-lg shadow-sm">
              {project.category || "Uncategorized"}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
              {project.title}
            </h1>
          </div>

          <hr className="my-10 border-slate-200 dark:border-slate-800/80" />

          <div className="grid grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed">
                <h2>Project Overview</h2>
                <p>{project.description}</p>

                {project.problem && (
                  <>
                    <h2 className="mt-12">The Challenge</h2>
                    <p>{project.problem}</p>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-4">
              <div className="flex flex-col gap-10">
                {project.techStack && project.techStack.length > 0 && (
                  <div>
                    <h3 className="text-[11px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-4">
                      Technology Matrix
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary-500/50 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-[11px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-4">
                    Project Uplinks
                  </h3>
                  <div className="flex flex-col gap-3">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-between py-4 px-6 rounded-2xl shadow-lg hover:shadow-[0_0_20px_var(--theme-primary-glow)] hover:-translate-y-0.5 text-[12px] font-black tracking-widest uppercase text-white bg-primary-500 hover:bg-primary-600 transition-all duration-300 gpu-layer group"
                      >
                        <span>View Live Build</span>
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}

                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-between py-4 px-6 rounded-2xl text-[12px] font-black tracking-widest uppercase text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-300 gpu-layer group"
                      >
                        <span>Source Code</span>
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
