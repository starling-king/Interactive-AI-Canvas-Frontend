// import { create } from 'zustand';
// import workspaceServices from '../Services/workspace.Services.js';

// const useWorkspaceStore = create((set, get) => ({
//     workspaces: [],          
//     currentWorkspace: null, 
//     isLoading: false,       
//     isFetching: false,       
//     error: null,


//     // Matches GET /api/v1/workspaces/getAllAdminWorkspaces
//     fetchAdminWorkspaces: async () => {
//         set({ isFetching: true, error: null });
//         try {
//             const response = await workspaceServices.getAllAdminWorkspaces();
//             if (response?.data) {
//                 set({ workspaces: response.data, isFetching: false });
//             } else {
//                 set({ workspaces: [], isFetching: false });
//             }
//         } catch (error) {
//             set({
//                 error: error.response?.data?.message || "Failed to load workspaces.",
//                 isFetching: false
//             });
//         }
//     },

//     // Fetches a single public workspace by slug
//     fetchPublicWorkspace: async (slug) => {
//         set({ isFetching: true, error: null, currentWorkspace: null });
//         try {
//             const response = await workspaceServices.getPublicWorkspaceBySlug({ slug });
//             if (response?.data) {
//                 set({ currentWorkspace: response.data, isFetching: false });
//                 return true;
//             }
//             return false;
//         } catch (error) {
//             set({
//                 error: error.response?.data?.message || "Workspace is private or not found.",
//                 isFetching: false
//             });
//             return false;
//         }
//     },

//     // Creates a new workspace
//     createWorkspace: async (workspaceData) => {
//         set({ isLoading: true, error: null });
//         try {
//             const response = await workspaceServices.createWorkspace(workspaceData);
//             if (response?.data) {
//                 const currentWorkspaces = get().workspaces;
//                 set({
//                     workspaces: [response.data, ...currentWorkspaces],
//                     isLoading: false
//                 });
//                 return true;
//             }
//             return false;
//         } catch (error) {
//             set({
//                 error: error.response?.data?.message || "Failed to create workspace.",
//                 isLoading: false
//             });
//             return false;
//         }
//     },

//     // Updates an existing workspace
//     updateWorkspace: async (id, updatedData) => {
//         set({ isLoading: true, error: null });
//         try {
//             const response = await workspaceServices.updateWorkspace({ id, ...updatedData });
//             if (response?.data) {
//                 // Update the specific workspace in the local array
//                 const currentWorkspaces = get().workspaces;
//                 const updatedWorkspaces = currentWorkspaces.map(ws =>
//                     ws._id === id ? response.data : ws
//                 );
//                 set({ workspaces: updatedWorkspaces, isLoading: false });
//                 return true;
//             }
//             return false;
//         } catch (error) {
//             set({
//                 error: error.response?.data?.message || "Failed to update workspace.",
//                 isLoading: false
//             });
//             return false;
//         }
//     },

//     // Deletes a workspace
//     deleteWorkspace: async (id) => {
//         set({ isLoading: true, error: null });
//         try {
//             await workspaceServices.deleteWorkspace({ id });
//             // Remove the deleted workspace from the local array
//             const currentWorkspaces = get().workspaces;
//             const filteredWorkspaces = currentWorkspaces.filter(ws => ws._id !== id);
//             set({ workspaces: filteredWorkspaces, isLoading: false });
//             return true;
//         } catch (error) {
//             set({
//                 error: error.response?.data?.message || "Failed to delete workspace.",
//                 isLoading: false
//             });
//             return false;
//         }
//     },

//     clearError: () => set({ error: null })
// }));

// export default useWorkspaceStore;


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