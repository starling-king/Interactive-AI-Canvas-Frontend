import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProjects: [],
  adminProjects: [],
  activeProjectId: null,
};

const ProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setAllProjects: (state, action) => {
      state.allProjects = action.payload;
    },
    setAdminProjects: (state, action) => {
      state.adminProjects = action.payload;
    },

    setActiveProject: (state, action) => {
      state.activeProjectId = action.payload;
    },

    clearProjects: (state) => {
      state.allProjects = [];
      state.adminProjects = [];
      state.activeProjectId = null;
    },
  },
});

export const {
  setAllProjects,
  setAdminProjects,
  setActiveProject,
  clearProjects,
} = ProjectSlice.actions;
export default ProjectSlice.reducer;
