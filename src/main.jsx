import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signin from "./pages/Signin.jsx";
import AdminAuthLayout from "./pages/AdminAuthLayout.jsx";
import Admin from "./pages/Admin.jsx";
import ProfileSettings from "./pages/ProfileSettings.jsx";
import CanvasWorkspace from "./pages/CanvasWorkspace.jsx";

const router = createBrowserRouter([
  // --- PUBLIC ROUTES ---
  {
    path: "/",
    element: <App />, // Wraps with Header/Footer
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signin", element: <Signin /> },
    ],
  },

  // --- DASHBOARD ROUTES (Wrapped in App for Header/Footer) ---
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        element: <AdminAuthLayout />, // The Secure Gate
        children: [
          { index: true, element: <Admin /> }, // The Dashboard
          { path: "dashboard", element: <Admin /> },
          { path: "profile", element: <ProfileSettings /> },
        ]
      }
    ]
  },

  // --- FULLSCREEN WORKSPACE (No Header/Footer) ---
  {
    // CRITICAL: We added /:workspaceId to make this a dynamic route
    path: "/workspace/:workspaceId",
    element: <AdminAuthLayout />,
    children: [
      { index: true, element: <CanvasWorkspace /> }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);