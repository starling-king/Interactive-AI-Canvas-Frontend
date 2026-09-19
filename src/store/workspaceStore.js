import { create } from 'zustand';

export const useWorkspaceStore = create((set) => ({
    // --- 1. GLOBAL STATE ---
    workspaces: [],
    currentWorkspace: null,
    isFetching: false, // Used for the initial page load of the dashboard/public view

    // --- 2. PURE SETTERS ---
    setFetching: (status) => set({ isFetching: status }),
    setWorkspaces: (workspaces) => set({ workspaces }),
    setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),

    // Optimistic UI Updaters
    addWorkspace: (workspace) => set((state) => ({
        workspaces: [workspace, ...state.workspaces]
    })),
    updateWorkspaceInStore: (id, updatedData) => set((state) => ({
        workspaces: state.workspaces.map(ws => ws._id === id ? updatedData : ws)
    })),
    removeWorkspace: (id) => set((state) => ({
        workspaces: state.workspaces.filter(ws => ws._id !== id)
    })),
}));