import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white/70 dark:bg-[#040405]/80 border-t border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300 mt-auto">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          <div className="shrink-0">
            <Link
              to="/"
              className="flex items-center gap-3 group outline-none gpu-layer"
            >
              <div className="flex items-center justify-center w-9 h-9 text-white transition-all duration-300 ease-out bg-slate-900 dark:bg-slate-800 rounded-xl shadow-sm group-hover:scale-105 group-hover:shadow-md group-active:scale-95 gpu-layer">
                <span className="font-mono text-base font-bold tracking-tighter">
                  {">_"}
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 transition-colors">
                Aayush
                <span className="text-slate-400 dark:text-slate-500">.dev</span>
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-16">
            <div>
              <h2 className="mb-6 text-xs font-bold tracking-widest uppercase text-slate-900 dark:text-slate-100">
                Resources
              </h2>
              <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                <li>
                  <Link
                    to="/"
                    className="inline-block hover:text-slate-900 dark:hover:text-white transition-all duration-300 outline-none hover:-translate-y-0.5 gpu-layer"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="inline-block hover:text-slate-900 dark:hover:text-white transition-all duration-300 outline-none hover:-translate-y-0.5 gpu-layer"
                  >
                    Projects
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-xs font-bold tracking-widest uppercase text-slate-900 dark:text-slate-100">
                Connect
              </h2>
              <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                <li>
                  <a
                    href="https://github.com/starling-king"
                    className="inline-block hover:text-slate-900 dark:hover:text-white transition-all duration-300 outline-none hover:-translate-y-0.5 gpu-layer"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/ayushmishra6518"
                    className="inline-block hover:text-slate-900 dark:hover:text-white transition-all duration-300 outline-none hover:-translate-y-0.5 gpu-layer"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-slate-200/60 dark:border-slate-800/60 sm:mx-auto" />

        <div className="flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">
          <span className="text-sm text-slate-500 dark:text-slate-500 text-center font-medium">
            © {new Date().getFullYear()} Aayush.dev. All Rights Reserved.
          </span>

          <div className="flex space-x-6">
            <a
              href="https://github.com/starling-king"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 outline-none hover:-translate-y-0.5 gpu-layer"
              aria-label="GitHub"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href="https://x.com/ayush6518"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 outline-none hover:-translate-y-0.5 gpu-layer"
              aria-label="X (Twitter)"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/ayushmishra6518/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 outline-none hover:-translate-y-0.5 gpu-layer"
              aria-label="LinkedIn"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
