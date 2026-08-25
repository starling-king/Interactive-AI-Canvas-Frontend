import React, { useState, useEffect } from "react";

export default function ServerWakeupBanner() {
  const [isWaking, setIsWaking] = useState(false);

  useEffect(() => {
    const handleWaking = () => setIsWaking(true);
    const handleAwake = () => setIsWaking(false);

    window.addEventListener("server-waking", handleWaking);
    window.addEventListener("server-awake", handleAwake);

    return () => {
      window.removeEventListener("server-waking", handleWaking);
      window.removeEventListener("server-awake", handleAwake);
    };
  }, []);

  if (!isWaking) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm gpu-layer">
      <div className="relative flex items-center gap-4 p-4 bg-white/90 dark:bg-[#040405]/90 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)] overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary-500/5 dark:via-primary-500/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />

        <div className="relative flex items-center justify-center w-10 h-10 shrink-0 bg-primary-50 dark:bg-primary-900/20 rounded-full border border-primary-200 dark:border-primary-800/50 shadow-[0_0_15px_var(--theme-primary-glow)]">
          <svg
            className="w-5 h-5 text-primary-600 dark:text-primary-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
        </div>

        <div className="flex flex-col relative z-10">
          <span className="text-[10px] font-black tracking-widest text-primary-600 dark:text-primary-400 uppercase mb-0.5 animate-pulse">
            System Boot Sequence
          </span>
          <span className="text-[12px] font-semibold leading-snug text-slate-600 dark:text-slate-400">
            Waking core backend services from standby mode. Establishing
            connection...
          </span>
        </div>
      </div>
    </div>
  );
}
