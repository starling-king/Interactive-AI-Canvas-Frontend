// import React, { useState, useEffect } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import userServices from "../Services/user.Services.js"; // Replaces adminServices
// import workspaceServices from "../Services/workspace.Services.js"; // Replaces projectServices
// import { useAuthStore } from "../store/authStore.js";
// import { useWorkspaceStore } from "../store/workspaceStore.js";

// function AdminAuthLayout() {
//   // 1. Replaces: const [loading, setLoading] = useState(true);
//   const [loading, setLoading] = useState(true);

//   const { checkAuthSession } = useAuthActions();
//   // 2. Replaces: const authStatus = useSelector((state) => state.AuthReducer.status);
//   const { isAuthenticated, isInitializing } = useAuthStore();
  
//   // 3. Replaces: const dispatch = useDispatch();
//   const setAuthData = useAuthStore((state) => state.setAuthData);
//   const clearAuthData = useAuthStore((state) => state.clearAuthData);
//   const setWorkspaces = useWorkspaceStore((state) => state.setWorkspaces);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       // Step A: Not authenticated yet? Ask the server who we are.
//       userServices
//         .getCurrentUser()
//         .then((userData) => {
//           if (userData) {
//             const pureUser = userData?.data?.user || userData?.data || userData;
//             setAuthData(pureUser); // Triggers re-render, firing Step B
//           } else {
//             clearAuthData();
//           }
//         })
//         .catch(() => {

//           console.error("Security Bounce: Token rejected or refresh failed", err);

//           clearAuthData();
//         })
//         .finally(() => setLoading(false));
//     } else {
//       // Step B: Authenticated? Download the workspaces.
//       workspaceServices
//         .getAllAdminWorkspaces({})
//         .then((res) => {
//           if (res?.data) {
//             setWorkspaces(res.data);
//           }
//         })
//         .catch((err) => {
//           console.error("Failed to preload workspaces", err);
//           if (err?.response?.status === 401 || err?.message?.includes("401")) {
//             clearAuthData();
//           }
//         })
//         .finally(() => setLoading(false));
//     }
//   }, [isAuthenticated, setAuthData, clearAuthData, setWorkspaces]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh] text-indigo-600 font-medium tracking-wide">
//         <svg
//           className="w-5 h-5 mr-3 animate-spin text-indigo-600"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//         </svg>
//         Authenticating System Admin...
//       </div>
//     );
//   }

//   if (!isAuthenticated) return <Navigate to="/login" replace />;

//   return <Outlet />;
// }

// export default AdminAuthLayout;

import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthActions } from "../hooks/useAuthActions.js";
import { useAuthStore } from "../store/authStore.js";
import workspaceServices from "../Services/workspace.Services.js";
import { useWorkspaceStore } from "../store/workspaceStore.js";

function AdminAuthLayout() {
  const { checkAuthSession } = useAuthActions();
  
  const { isAuthenticated, isInitializing } = useAuthStore();
  const clearAuthData = useAuthStore((state) => state.clearAuthData);
  
  const setWorkspaces = useWorkspaceStore((state) => state.setWorkspaces);
  const [loading, setLoading] = useState(true);

  // 1. Initial Handshake Check
  useEffect(() => {
    if (!isAuthenticated) {
      checkAuthSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Fetch Data & Ruthless Interceptor Catch
  useEffect(() => {
    if (!isInitializing) {
      if (isAuthenticated) {
        setLoading(true);
        workspaceServices
          .getAllAdminWorkspaces()
          .then((res) => {
            if (res?.data) {
              setWorkspaces(res.data);
            }
          })
          .catch((err) => {
            console.error("Security Bounce: Token rejected or refresh failed", err);
            // Instant RAM Wipe. This catches the 401 AND the interceptor's 404 cascade.
            // When clearAuthData runs, isAuthenticated instantly becomes false.
            clearAuthData(); 
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }
  }, [isAuthenticated, isInitializing, setWorkspaces, clearAuthData]);

  // 3. The Block
  if (isInitializing || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-indigo-600 font-medium tracking-wide">
        <svg className="w-5 h-5 mr-3 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Authenticating System Admin...
      </div>
    );
  }

  // 4. The Vault Door
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AdminAuthLayout;