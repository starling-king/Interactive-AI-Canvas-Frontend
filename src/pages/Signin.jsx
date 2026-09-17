import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// 1. Swapped Redux for Zustand Hooks
import { useAuthActions } from "../hooks/useAuthActions.js";
import { useAuthStore } from "../store/authStore.js";

function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Custom success state for your UI checkmark screen
  const [success, setSuccess] = useState(false); 

  const navigate = useNavigate();

  // 2. Connect to the Zustand Brain
  const { isAuthenticated, isInitializing } = useAuthStore();
  const { registerUser, checkAuthSession, isLoading, error, clearError } = useAuthActions();

  // 3. Auto-Routing: If they are already logged in, push them straight to the Workspace
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/workspace", { replace: true });
      return;
    }

    if (isInitializing) {
      checkAuthSession();
    }
  }, [isAuthenticated, isInitializing, navigate, checkAuthSession]);

  // 4. The Registration Handler
  const registerHandler = async (e) => {
    e.preventDefault();
    clearError();

    // Pass the name (username), email, and password to the decoupled action
    const isSuccess = await registerUser(name, email, password);

    // If registration succeeds, trigger your custom success UI
    if (isSuccess) {
      setSuccess(true);
    }
  };

  // 5. Preserved Loading Screen
  if (isInitializing) {
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
        Verifying Secure Handshake...
      </div>
    );
  }

  // 6. Preserved Success Screen (Identity Verified)
  if (success) {
    return (
      <section className="relative flex items-center justify-center min-h-[85vh] px-4 py-16 sm:py-24 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xNSkiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-sm">
          <div className="relative p-8 sm:p-10 bg-white/80 dark:bg-[#040405]/80 backdrop-blur-2xl border border-primary-200/50 dark:border-primary-900/50 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.5)] overflow-hidden transform-gpu animate-[slideDown_0.4s_ease-out] flex flex-col items-center text-center">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary-500 shadow-[0_0_20px_var(--theme-primary-glow)]" />

            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 text-primary-500 bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-3xl shadow-sm gpu-layer transform-gpu scale-100 hover:scale-105 transition-transform duration-500">
              <svg
                className="w-10 h-10"
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
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-3">
              Identity Verified
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 max-w-62.5">
              Master credentials locked into the secure registry.
            </p>

            <button
              onClick={() => navigate("/workspace", { replace: true })}
              className="w-full flex justify-center items-center py-4 px-4 rounded-2xl shadow-lg hover:shadow-[0_0_30px_var(--theme-primary-glow)] hover:-translate-y-0.5 text-[14px] font-black tracking-widest uppercase text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 gpu-layer group/btn"
            >
              <span>Enter Command Center</span>
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // 7. Preserved Main Registration UI
  return (
    <section className="relative flex items-center justify-center min-h-[85vh] px-4 py-16 sm:py-24 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xNSkiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="relative p-8 sm:p-10 bg-white/80 dark:bg-[#040405]/80 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.5)] overflow-hidden transform-gpu transition-all group">
          <div className="absolute -inset-24 bg-linear-to-tr from-primary-500/10 to-transparent blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="flex flex-col items-center mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full bg-primary-50 dark:bg-primary-900/40 border border-primary-200 dark:border-primary-800 shadow-sm gpu-layer cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-primary-700 dark:text-primary-400 uppercase">
                Step 1: Admin Config
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Build Keycard
            </h1>
            <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              Secure your isolated workspace before deploying configuration.
            </p>
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
                <span className="text-[12px] font-medium text-red-700 dark:text-red-400 leading-snug">
                  {error.includes("500") || error.includes("Network Error")
                    ? "Uplink severed. Ensure backend is running."
                    : error}
                </span>
              </div>
            </div>
          )}

          <form onSubmit={registerHandler} className="space-y-6">
            <div className="space-y-1.5 focus-within:text-primary-500 transition-colors">
              <label className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                Master ID
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-slate-50 bg-slate-50/50 dark:bg-[#040405]/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:bg-white dark:focus:bg-[#040405] focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 disabled:opacity-50"
                placeholder="e.g. ayush_master"
              />
            </div>

            <div className="space-y-1.5 focus-within:text-primary-500 transition-colors">
              <label className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                Recovery Link
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-slate-50 bg-slate-50/50 dark:bg-[#040405]/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:bg-white dark:focus:bg-[#040405] focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 disabled:opacity-50"
                placeholder="admin@ayushdev.online"
              />
            </div>

            <div className="space-y-1.5 focus-within:text-primary-500 transition-colors">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                  Passkey
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 pr-12 text-lg font-bold tracking-widest text-slate-900 dark:text-slate-50 bg-slate-50/50 dark:bg-[#040405]/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:bg-white dark:focus:bg-[#040405] focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:tracking-normal placeholder:font-semibold placeholder:text-sm disabled:opacity-50"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-primary-500 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-4 px-4 rounded-2xl shadow-lg hover:shadow-[0_0_30px_var(--theme-primary-glow)] hover:-translate-y-0.5 text-[14px] font-black tracking-widest uppercase text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transform-gpu transition-all duration-300 group/btn"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <span>Initialize Uplink</span>
                    <svg
                      className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
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
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-6 mt-8 border-t border-slate-200/50 dark:border-slate-800/50 text-[12px] font-medium text-center text-slate-500 dark:text-slate-400">
            Already initialized?{" "}
            <Link
              to="/login"
              replace
              className="font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
            >
              Log in here.
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signin;