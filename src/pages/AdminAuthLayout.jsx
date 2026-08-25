import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import adminServices from "../Services/admin_users.Services.js";
import { login, logout } from "../store/AuthSlice.js";
import projectServices from "../Services/projects.Services.js";
import { setAdminProjects } from "../store/ProjectSlice.js";

function AdminAuthLayout() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const authStatus = useSelector((state) => state.AuthReducer.status);

  useEffect(() => {
    if (!authStatus) {
      adminServices
        .getCurrentUser()
        .then((userData) => {
          if (userData) {
            const pureUser = userData?.data?.user || userData?.data || userData;
            dispatch(login(pureUser));
          } else {
            dispatch(logout());
          }
        })
        .catch(() => {
          dispatch(logout());
        })
        .finally(() => setLoading(false));
    } else {
      projectServices
        .getAllAdminProjects({})
        .then((res) => {
          if (res?.data) {
            dispatch(setAdminProjects(res.data));
          }
        })
        .catch((err) => {
          console.error("Failed to preload admin projects", err);
          if (err?.response?.status === 401 || err?.message?.includes("401")) {
            dispatch(logout());
          }
        })
        .finally(() => setLoading(false));
    }
  }, [authStatus, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-indigo-600 font-medium tracking-wide">
        <svg
          className="w-5 h-5 mr-3 animate-spin text-indigo-600"
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
        Authenticating System Admin...
      </div>
    );
  }

  if (!authStatus) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default AdminAuthLayout;
