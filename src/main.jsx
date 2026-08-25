import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  Signin,
  Home,
  Projects,
  ProjectDetail,
  Contact,
  ResumeView,
  AdminAuthLayout,
  AdminProjectList,
  ProjectEditorForm,
  AdminInbox,
  Admin,
  ProfileSettings,
  ContentManager,
  AdminResumePage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "project/:slug", element: <ProjectDetail /> },
      { path: "contact", element: <Contact /> },
      { path: "resume", element: <ResumeView /> },

      { path: "login", element: <Login /> },
      { path: "signin", element: <Signin /> },

      {
        path: "admin",
        element: <AdminAuthLayout />,
        children: [
          { index: true, element: <Admin /> },

          { path: "dashboard", element: <Admin /> },
          { path: "profile", element: <ProfileSettings /> },
          { path: "builder", element: <ContentManager /> },
          { path: "resume", element: <AdminResumePage /> },

          {
            path: "projects",
            children: [
              { index: true, element: <AdminProjectList /> },
              { path: "new", element: <ProjectEditorForm /> },
              { path: "edit/:id", element: <ProjectEditorForm /> },
            ],
          },

          { path: "messages", element: <AdminInbox /> },
        ],
      },

      { path: ":username", element: <Home /> },
      { path: ":username/projects", element: <Projects /> },
      { path: ":username/project/:slug", element: <ProjectDetail /> },
      { path: ":username/contact", element: <Contact /> },
      { path: ":username/resume", element: <ResumeView /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
