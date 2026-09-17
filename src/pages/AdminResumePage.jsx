import { useState, useEffect } from "react";
import resumeBuilderSurvice from "../Services/resume.services.js";
import { ResumePreview } from "../components/index.js";
import { useAuthStore } from "../store/authStore.js";

function AdminResumePage() {
  const currentUser = useAuthStore((state) => state.user);

  const [title, setTitle] = useState("Full Stack Engineer");
  const [targetKeywords, setTargetKeywords] = useState(
    "React.js, Node.js, MongoDB Atlas, Docker, AWS",
  );
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

  const [generating, setGenerating] = useState(false);
  const [currentResume, setCurrentResume] = useState(null);

  const [toast, setToast] = useState({ type: "", message: "", visible: false });

  const showToast = (type, message) => {
    setToast({ type, message, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 4000);
  };

  useEffect(() => {
    const fetchExisting = async () => {
      if (currentUser?.username) {
        try {
          const res = await resumeBuilderSurvice.ReadResume(
            currentUser.username,
          );
          if (res?.data) setCurrentResume(res.data);
        } catch (e) {
          console.log("No existing resume to pre-load");
        }
      }
    };
    fetchExisting();
  }, [currentUser]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);

    const keywordsArray = targetKeywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    const customLinks = { linkedin, github };

    try {
      const res = await resumeBuilderSurvice.CreateAiResume(
        title,
        keywordsArray,
        customLinks,
      );
      if (res?.data) {
        setCurrentResume(res.data);
        showToast("success", "Neural generation complete. ATS Resume saved.");
      }
    } catch (err) {
      showToast("error", "System failure: Cannot generate ATS Document.");
    } finally {
      setGenerating(false);
    }
  };

  const inputClass =
    "w-full px-5 py-4 text-sm font-semibold text-slate-900 dark:text-slate-50 bg-slate-50/80 dark:bg-[#0a0a0c]/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl focus:bg-white dark:focus:bg-[#040405] focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-300 shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-600";

  return (
    <div className="relative w-full px-4 pt-12 pb-24 mx-auto max-w-5xl transition-all duration-500 isolate">
      <div
        className={`fixed top-28 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}
      >
        {toast.message && (
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
              toast.type === "error"
                ? "bg-red-500/90 border-red-400 text-white"
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
            <span className="text-sm font-bold tracking-wide">
              {toast.message}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-6 mb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 shadow-sm gpu-layer cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-primary-700 dark:text-primary-400 uppercase">
              Document Synthesis
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            AI Resume Engine
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-2xl">
            Customize target keywords and generate an ATS-optimized document
            directly from your database payload.
          </p>
        </div>
      </div>

      <div className="p-8 sm:p-12 bg-white/80 dark:bg-[#040405]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none gpu-layer mb-12">
        <form onSubmit={handleGenerate} className="space-y-8">
          <div className="relative group">
            <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
              Target Designation (Title) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div className="relative group">
            <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
              Target Keywords (Comma Separated)
            </label>
            <input
              type="text"
              value={targetKeywords}
              onChange={(e) => setTargetKeywords(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
                LinkedIn Uplink
              </label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="linkedin.com/in/username"
                className={inputClass}
              />
            </div>
            <div className="relative group">
              <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
                GitHub Uplink
              </label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="github.com/username"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800/80">
            <button
              type="submit"
              disabled={generating}
              className="flex items-center justify-center w-full sm:w-auto px-10 py-4 text-[13px] font-black tracking-widest uppercase text-white bg-primary-500 hover:bg-primary-600 rounded-2xl shadow-[0_0_20px_var(--theme-primary-glow)] hover:shadow-[0_0_30px_var(--theme-primary-glow)] transform-gpu hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed gpu-layer"
            >
              {generating ? (
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
                  Synthesizing Document...
                </span>
              ) : (
                "Initialize AI Generation"
              )}
            </button>
          </div>
        </form>
      </div>

      {currentResume && (
        <div className="animate-[slideDown_0.5s_ease-out]">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
            <h2 className="text-[11px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase px-4">
              Live ATS Preview
            </h2>
            <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
          </div>

          <div className="relative rounded-4xl overflow-hidden border border-slate-200 dark:border-slate-800/80 shadow-2xl">
            <ResumePreview resumeData={currentResume} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminResumePage;
