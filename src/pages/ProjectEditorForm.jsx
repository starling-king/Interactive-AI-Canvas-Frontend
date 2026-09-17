import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectServices from "../Services/projects.Services";
import projectImagesServices from "../Services/project_images.Services";
import { useProjectStore } from "../store/projectStore.js";

function ProjectEditorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const { adminProjects, setAdminProjects } = useProjectStore();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    problem: "",
    approach: "",
    solution: "",
    result: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
    isFeatured: false,
    isPublished: false,
    images: [],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ type: "", message: "", visible: false });
  const [deletePrompt, setDeletePrompt] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 4000);
  };

  useEffect(() => {
    if (isEditMode) {
      const existingProject = adminProjects.find((p) => p._id === id);

      if (existingProject) {
        populateForm(existingProject);
        setFetching(false);
      } else {
        projectServices
          .getAdminProjectByID({ id })
          .then((res) => {
            if (res.data) populateForm(res.data);
          })
          .catch((err) => setError("Failed to load project details."))
          .finally(() => setFetching(false));
      }
    }
  }, [id, isEditMode, adminProjects]);

  const populateForm = (data) => {
    setFormData({
      title: data.title || "",
      category: data.category || "",
      description: data.description || "",
      problem: data.problem || "",
      approach: data.approach || "",
      solution: data.solution || "",
      result: data.result || "",
      techStack: Array.isArray(data.techStack)
        ? data.techStack.join(", ")
        : data.techStack || "",
      githubLink: data.githubLink || "",
      liveLink: data.liveLink || "",
      isFeatured: data.isFeatured || false,
      isPublished: data.isPublished || false,
      images: data.images || data.image || [],
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const techStackArray = formData.techStack
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech !== "");

      const payload = { ...formData, techStack: techStackArray };

      if (isEditMode) {
        await projectServices.updateProject({ id, ...payload });

        const freshData = await projectServices.getAllAdminProjects({});
        if (freshData?.data) setAdminProjects(freshData.data);

        showToast("success", "Project configuration saved successfully.");
        setTimeout(() => navigate("/admin/projects"), 1000);
      } else {
        const response = await projectServices.createProject(payload);

        const freshData = await projectServices.getAllAdminProjects({});
        if (freshData?.data) setAdminProjects(freshData.data);

        const newProjectId = response?.data?._id;
        if (newProjectId) {
          navigate(`/admin/projects/edit/${newProjectId}`);
          showToast(
            "success",
            "Project initialized. Upload media assets below.",
          );
        } else {
          navigate("/admin/projects");
        }
      }
    } catch (err) {
      setError(err.message || "Failed to save project.");
      showToast("error", err.message || "Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploadingImages(true);
    setError("");

    try {
      await projectImagesServices.CreateImageCollectionOfProject({
        projectId: id,
        imageFiles: selectedFiles,
      });

      showToast("success", "Media assets successfully uploaded.");
      setSelectedFiles([]);

      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      showToast("error", "Failed to transmit assets to cloud storage.");
    } finally {
      setUploadingImages(false);
    }
  };

  const executeDeleteImage = async (imageId) => {
    try {
      await projectImagesServices.DeleteImages({ projectId: id, imageId });

      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img._id !== imageId),
      }));
      setDeletePrompt(null);
      showToast("success", "Asset successfully purged from storage.");
    } catch (err) {
      showToast("error", "Failed to delete asset.");
      setDeletePrompt(null);
    }
  };

  const inputClass =
    "w-full px-5 py-4 text-sm font-semibold text-slate-900 dark:text-slate-50 bg-slate-50/80 dark:bg-[#0a0a0c]/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl focus:bg-white dark:focus:bg-[#040405] focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-300 shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-600";

  if (fetching)
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
        Decrypting Project Matrix...
      </div>
    );

  return (
    <div className="relative w-full px-4 pt-12 pb-12 mx-auto max-w-5xl transition-all duration-500 isolate">
      <div
        className={`fixed top-28 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}
      >
        {toast.message && (
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
              toast.type === "error"
                ? "bg-red-500/90 border-red-400 text-white"
                : toast.type === "warning"
                  ? "bg-amber-500/90 border-amber-400 text-white"
                  : "bg-emerald-500/90 border-emerald-400 text-white"
            }`}
          >
            {toast.type === "success" && (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            {toast.type === "error" && (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            {toast.type === "warning" && (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            )}
            <span className="text-sm font-bold tracking-wide">
              {toast.message}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start justify-between gap-6 mb-10 md:flex-row md:items-end">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 shadow-sm gpu-layer cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-primary-700 dark:text-primary-400 uppercase">
              {isEditMode ? "Asset Configuration" : "New Asset Deployment"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            {isEditMode
              ? "Modify Project Parameters"
              : "Initialize New Project"}
          </h1>
        </div>
        <button
          onClick={() => navigate("/admin/projects")}
          className="flex items-center px-4 py-2 text-xs font-black tracking-widest uppercase text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1.5"
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
          Abort Mission
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 mb-8 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl transform-gpu animate-[slideDown_0.3s_ease-out]">
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
              System Alert
            </span>
            <span className="text-[13px] font-medium text-red-700 dark:text-red-400 leading-snug">
              {error}
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">
        <div className="p-8 sm:p-12 bg-white/80 dark:bg-[#040405]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none gpu-layer">
          <h2 className="text-[11px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-8 pb-4 border-b border-slate-200 dark:border-slate-800/80">
            Core Identity
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative group">
              <label className="block text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. Genesis Protocol"
              />
            </div>
            <div className="relative group">
              <label className="block text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. Full-Stack Application"
              />
            </div>
          </div>

          <div className="mt-8 relative group">
            <label className="block text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
              Short Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              required
              rows="2"
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} resize-y leading-relaxed`}
              placeholder="A brief executive summary of the project..."
            ></textarea>
          </div>
        </div>

        <div className="p-8 sm:p-12 bg-white/80 dark:bg-[#040405]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none gpu-layer">
          <h2 className="text-[11px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-8 pb-4 border-b border-slate-200 dark:border-slate-800/80">
            Deep Narrative
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative group">
              <label className="block text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
                Problem Statement
              </label>
              <textarea
                name="problem"
                rows="3"
                value={formData.problem}
                onChange={handleChange}
                className={`${inputClass} resize-y leading-relaxed`}
              ></textarea>
            </div>
            <div className="relative group">
              <label className="block text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
                Approach
              </label>
              <textarea
                name="approach"
                rows="3"
                value={formData.approach}
                onChange={handleChange}
                className={`${inputClass} resize-y leading-relaxed`}
              ></textarea>
            </div>
            <div className="relative group">
              <label className="block text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
                Solution
              </label>
              <textarea
                name="solution"
                rows="3"
                value={formData.solution}
                onChange={handleChange}
                className={`${inputClass} resize-y leading-relaxed`}
              ></textarea>
            </div>
            <div className="relative group">
              <label className="block text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
                Result
              </label>
              <textarea
                name="result"
                rows="3"
                value={formData.result}
                onChange={handleChange}
                className={`${inputClass} resize-y leading-relaxed`}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12 bg-white/80 dark:bg-[#040405]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none gpu-layer">
          <h2 className="text-[11px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-8 pb-4 border-b border-slate-200 dark:border-slate-800/80">
            Metadata & Uplinks
          </h2>

          <div className="relative group mb-8">
            <label className="block text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
              Tech Stack Array
            </label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, MongoDB, Tailwind CSS"
              className={inputClass}
            />
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase pt-2">
              Separate parameters with commas
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-10">
            <div className="relative group">
              <label className="block text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
                GitHub Repository
              </label>
              <input
                type="url"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className={inputClass}
              />
            </div>
            <div className="relative group">
              <label className="block text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
                Live Deployment URL
              </label>
              <input
                type="url"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
                placeholder="https://..."
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-8 border-t border-slate-200 dark:border-slate-800/80">
            <label className="flex items-center gap-4 cursor-pointer group">
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-lg border transition-all duration-300 ${formData.isPublished ? "bg-emerald-500 border-emerald-500" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-emerald-400"}`}
              >
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                />
                {formData.isPublished && (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm font-extrabold tracking-wide text-slate-700 dark:text-slate-300 select-none">
                Set to Published
              </span>
            </label>

            <label className="flex items-center gap-4 cursor-pointer group">
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-lg border transition-all duration-300 ${formData.isFeatured ? "bg-amber-500 border-amber-500" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-amber-400"}`}
              >
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                />
                {formData.isFeatured && (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm font-extrabold tracking-wide text-slate-700 dark:text-slate-300 select-none">
                Mark as Featured
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full sm:w-auto px-10 py-4 text-[13px] font-black tracking-widest uppercase text-white bg-primary-500 hover:bg-primary-600 rounded-2xl shadow-[0_0_20px_var(--theme-primary-glow)] hover:shadow-[0_0_30px_var(--theme-primary-glow)] transform-gpu hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed gpu-layer"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="4"
                    className="opacity-25"
                  ></circle>
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    className="opacity-75"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : isEditMode ? (
              "Save Configuration"
            ) : (
              "Initialize & Proceed to Media"
            )}
          </button>
        </div>
      </form>

      {isEditMode ? (
        <div className="p-8 sm:p-12 mt-10 bg-white/80 dark:bg-[#040405]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none gpu-layer animate-[slideDown_0.4s_ease-out]">
          <h2 className="text-[11px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-8 pb-4 border-b border-slate-200 dark:border-slate-800/80">
            Media Assets
          </h2>

          {formData.images.length > 0 && (
            <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 md:grid-cols-3">
              {formData.images.map((img) => (
                <div
                  key={img._id}
                  className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-video bg-slate-100 dark:bg-slate-900 shadow-sm gpu-layer isolate"
                >
                  <img
                    src={img.image_url || img.imageUrl}
                    alt="Project asset"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />

                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/60 backdrop-blur-sm ${deletePrompt === img._id ? "opacity-100 z-20" : "opacity-0 group-hover:opacity-100 z-10"}`}
                  >
                    {deletePrompt === img._id ? (
                      <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center">
                        <span className="text-[10px] font-black tracking-widest uppercase text-white mb-3">
                          Confirm Deletion?
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => executeDeleteImage(img._id)}
                            className="px-3 py-1.5 text-[10px] font-black tracking-widest uppercase text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors"
                          >
                            Yes, Purge
                          </button>
                          <button
                            onClick={() => setDeletePrompt(null)}
                            className="px-3 py-1.5 text-[10px] font-black tracking-widest uppercase text-white bg-slate-600 hover:bg-slate-500 rounded-md transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletePrompt(img._id)}
                        className="px-4 py-2 text-[10px] font-black tracking-widest uppercase text-white bg-red-600/90 hover:bg-red-500 rounded-lg shadow-lg transform-gpu hover:scale-105 transition-all duration-300"
                      >
                        Delete Asset
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="relative">
            <label className="flex flex-col items-center justify-center w-full p-10 sm:p-16 border-2 border-dashed rounded-4xl border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0a0a0c]/50 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-all duration-300 cursor-pointer group">
              <div className="p-5 mb-5 rounded-full bg-slate-200/50 dark:bg-slate-800/50 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transform-gpu group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-[0_10px_20px_-10px_var(--theme-primary-glow)]">
                <svg
                  className="w-8 h-8 text-slate-400 dark:text-slate-500 group-hover:text-primary-500 transition-colors duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>

              <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-1 transition-colors">
                Click to browse or drag assets here
              </span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                Supports High-Res JPG, PNG, WEBP
              </span>

              <input
                type="file"
                multiple
                accept="image/*"
                title=""
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const incomingFiles = Array.from(e.target.files);
                  setSelectedFiles((prevFiles) => {
                    const combinedFiles = [...prevFiles, ...incomingFiles];
                    const existingDBImages = formData.images.length;
                    const slotsLeft = 5 - existingDBImages;
                    if (combinedFiles.length > slotsLeft) {
                      showToast(
                        "warning",
                        `Limit enforced: Only room for ${slotsLeft} more image(s).`,
                      );
                      return combinedFiles.slice(0, slotsLeft);
                    }
                    return combinedFiles;
                  });
                }}
              />
            </label>

            {selectedFiles.length > 0 && (
              <div className="flex flex-col items-center mt-8 animate-[slideDown_0.3s_ease-out]">
                <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                  {selectedFiles.map((file, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 rounded-lg"
                    >
                      Asset Selected
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleImageUpload}
                  disabled={uploadingImages}
                  className="px-10 py-4 text-[13px] font-black tracking-widest uppercase text-white bg-emerald-600 hover:bg-emerald-500 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transform-gpu hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
                >
                  {uploadingImages
                    ? "Transmitting to Cloud..."
                    : `Confirm Upload (${selectedFiles.length} Assets)`}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 mt-10 text-center bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl">
          <svg
            className="w-12 h-12 mb-4 text-slate-300 dark:text-slate-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h3 className="text-sm font-bold tracking-widest text-slate-600 dark:text-slate-400 uppercase">
            Media Module Locked
          </h3>
          <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-500 max-w-sm">
            Core configuration must be saved to the database before asset upload
            channels are opened.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProjectEditorForm;
