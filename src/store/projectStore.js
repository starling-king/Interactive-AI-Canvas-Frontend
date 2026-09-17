import { create } from "zustand";

export const useProjectStore = create((set) => ({
    allProjects: [],
    adminProjects: [],
    activeProject: null,
    setAllProjects: (allProjects) => set({ allProjects }),
    setAdminProjects: (adminProjects) => set({ adminProjects }),
    setActiveProject: (activeProject) => set({ activeProject }),
    clearProjects: () => set({ allProjects: [], adminProjects: [], activeProject: null }),
}));
