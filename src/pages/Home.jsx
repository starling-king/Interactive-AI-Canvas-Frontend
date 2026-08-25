import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectServices from "../Services/projects.Services.js";
import siteContentServices from "../Services/site_content.Services.js";
import {
  HeroSection,
  ProjectGrid,
  SkillsSection,
  CustomSection,
} from "../components/index.js";

const ComponentMap = {
  hero: HeroSection,
  projects: ProjectGrid,
  skills: SkillsSection,
  custom: CustomSection,
};

function Home() {
  const { username } = useParams();
  const targetUser = username || "ayush";
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [content, setContent] = useState({});

  const [layoutOrder, setLayoutOrder] = useState([
    "hero",
    "skills",
    "projects",
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);
      try {
        const [projectsRes, contentRes] = await Promise.all([
          projectServices.getPublicProjects({
            username: targetUser,
            featured: true,
            cateogary: "",
          }),
          siteContentServices.read({ user: targetUser }).catch(() => null),
        ]);

        setProjects(projectsRes?.data || []);

        const rawContentArray = contentRes?.data;

        if (Array.isArray(rawContentArray) && rawContentArray.length > 0) {
          const contentObj = {};

          rawContentArray.forEach((item) => {
            contentObj[item.sectionKey] = item.contentValue;
          });

          setContent(contentObj);

          if (contentObj.page_layout) {
            setLayoutOrder(JSON.parse(contentObj.page_layout));
          }
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [targetUser]);

  if (loading) {
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
        Synchronizing Portfolio Data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center animate-[slideDown_0.4s_ease-out]">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm gpu-layer">
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
          Identity Not Found
        </h1>
        <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400 max-w-sm">
          The portfolio data for{" "}
          <span className="font-bold text-primary-600 dark:text-primary-400">
            "{targetUser}"
          </span>{" "}
          does not exist in the registry.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-8 px-8 py-3.5 text-[13px] font-black tracking-widest text-white uppercase bg-primary-500 hover:bg-primary-600 rounded-2xl shadow-lg hover:shadow-[0_0_30px_var(--theme-primary-glow)] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 gpu-layer"
        >
          Initialize New Profile
        </button>
      </div>
    );
  }

  const renderComponent = (sectionKey, index) => {
    const baseType = sectionKey.split("_")[0];
    const Component = ComponentMap[baseType];

    if (!Component) return null;

    switch (baseType) {
      case "hero":
        return (
          <Component
            key={index}
            name={content.name}
            role={content.role}
            aboutText={content.aboutText}
            profilePhoto={content.profilePhotoUrl}
            username={targetUser}
          />
        );
      case "projects":
        return (
          <Component key={index} projects={projects} targetUser={targetUser} />
        );

      case "skills":
        const allSkills = projects.flatMap(
          (p) => p.technologies || p.techStack || [],
        );

        let parsedSkills = [];
        allSkills.forEach((skill) => {
          if (typeof skill === "string") {
            parsedSkills.push(...skill.split(",").map((s) => s.trim()));
          } else {
            parsedSkills.push(skill);
          }
        });

        const uniqueSkills = [...new Set(parsedSkills)].filter(Boolean);

        return <Component key={index} skillsArray={uniqueSkills} />;

      case "custom":
        return <Component key={index} htmlContent={content[sectionKey]} />;
      default:
        return null;
    }
  };

  return (
    <main className="w-full flex flex-col relative z-10 transition-colors duration-300 isolate">
      {layoutOrder.map((sectionKey, index) =>
        renderComponent(sectionKey, index),
      )}
    </main>
  );
}

export default Home;
