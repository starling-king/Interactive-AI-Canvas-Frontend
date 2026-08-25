import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, LogoutBtn } from "..";
import useDarkMode from "../../hooks/useDarkMode";

export default function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isDark, toggleDarkMode } = useDarkMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminNavItems = [
    { name: "Dashboard", url: "/admin/dashboard" },
    { name: "Projects", url: "/admin/projects" },
    { name: "Inbox", url: "/admin/messages" },
    { name: "Builder", url: "/admin/builder" },
    { name: "Resume", url: "/admin/resume" },
    { name: "Profile", url: "/admin/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 dark:bg-[#040405]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm dark:shadow-none transition-colors duration-300 gpu-layer">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 outline-none group gpu-layer"
          >
            <div className="flex items-center justify-center px-2.5 py-1.5 text-[10px] sm:text-xs font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase bg-primary-50 dark:bg-primary-500/10 rounded-lg border border-primary-200 dark:border-primary-500/20 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 transition-colors duration-300">
              <span className="sm:hidden">Admin</span>
              <span className="hidden sm:inline">Admin Mode</span>
            </div>
            <span className="hidden text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 lg:block group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
              System Control
            </span>
          </Link>

          <nav className="hidden md:flex flex-1 items-center justify-end gap-1.5 ml-6">
            {adminNavItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.url)}
                  className={`px-3 lg:px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 whitespace-nowrap outline-none gpu-layer ${
                    isActive
                      ? "text-slate-900 dark:text-white bg-slate-100/80 dark:bg-slate-800/80 shadow-sm ring-1 ring-slate-200/50 dark:ring-slate-700/50"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:-translate-y-0.5"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2 ml-auto md:ml-4 md:pl-4 md:border-l border-slate-200 dark:border-slate-800 shrink-0">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 outline-none hover:-translate-y-0.5 gpu-layer group"
              aria-label="Toggle Dark Mode"
            >
              <div className="transition-transform duration-500 group-hover:rotate-12 group-active:rotate-0">
                {isDark ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a6 6 0 11-12 0 6 6 0 0112 0z"
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
                      strokeWidth="1.5"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </div>
            </button>

            <div className="hidden md:block">
              <LogoutBtn />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl outline-none transition-all duration-300 active:scale-95 gpu-layer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      <div
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-in-out bg-white/95 dark:bg-[#040405]/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50 shadow-lg ${
          mobileMenuOpen
            ? "max-h-150 opacity-100 border-b"
            : "max-h-0 opacity-0 pointer-events-none border-b-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {adminNavItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.url);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 outline-none ${
                  isActive
                    ? "text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:pl-6"
                }`}
              >
                {item.name}
              </button>
            );
          })}

          <div className="h-px w-full bg-slate-200 dark:bg-slate-800 my-3"></div>

          <div className="flex justify-start px-2">
            <LogoutBtn />
          </div>
        </div>
      </div>
    </header>
  );
}
