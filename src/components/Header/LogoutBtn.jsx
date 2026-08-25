import React, { useState } from "react";
import { useDispatch } from "react-redux";
import adminServices from "../../Services/admin_users.Services.js";
import { logout } from "../../store/AuthSlice.js";
import { clearProjects } from "../../store/ProjectSlice.js";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setIsLoggingOut(true);
    try {
      await adminServices.logoutUser();
    } catch (error) {
      console.log("Backend session already cleared or unavailable.");
    } finally {
      dispatch(clearProjects());
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  };

  return (
    <button
      onClick={logoutHandler}
      disabled={isLoggingOut}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 transition-all duration-300 rounded-xl outline-none hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:hover:bg-transparent gpu-layer group"
      title="Terminate Session"
    >
      {isLoggingOut ? (
        <span className="flex items-center gap-2">
          <svg
            className="w-4 h-4 animate-spin text-red-500"
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
          <span className="animate-pulse text-red-600 dark:text-red-400 font-semibold">
            Exiting...
          </span>
        </span>
      ) : (
        <>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="hidden sm:inline">Logout</span>
        </>
      )}
    </button>
  );
}

export default LogoutBtn;
