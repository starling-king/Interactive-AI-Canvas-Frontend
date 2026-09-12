import { create } from 'zustand';

export const useVersionStore = create((set) => ({
    // --- GLOBAL STATE ---
    history: [],         // Holds lightweight logs from getWorkspaceVersionHistory
    previewData: null,   // Holds a single heavy snapshot from getSingleVersionPreview
    isFetching: false,   // Initial load state for the history sidebar

    // --- PURE SETTERS ---
    setFetching: (status) => set({ isFetching: status }),
    setHistory: (history) => set({ history }),
    addVersion: (version) => set((state) => ({ history: [version, ...state.history] })),
    setPreview: (previewData) => set({ previewData })
}));