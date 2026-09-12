// // import { create } from 'zustand';
// // import userServices from '../Services/user.Services.js';

// // const useAuthStore = create((set) => ({
// //     // 1. Initial State
// //     user: null,
// //     isAuthenticated: false,
// //     isLoading: false,
// //     error: null,

// //     // 2. Actions (The Logic)
// //     loginUser: async (email, password) => {
// //         set({ isLoading: true, error: null });
// //         try {
// //             // Calls your clean service layer
// //             const data = await userServices.login({ email, passwordHash: password });
// //             set({
// //                 user: data.data.user,
// //                 isAuthenticated: true,
// //                 isLoading: false
// //             });
// //             return true; // Return true so the Page knows it succeeded
// //         } catch (error) {
// //             set({
// //                 error: error.response?.data?.message || "Login failed",
// //                 isLoading: false
// //             });
// //             return false;
// //         }
// //     },

// //     logoutUser: async () => {
// //         set({ isLoading: true });
// //         try {
// //             await userServices.logoutUser();
// //             set({ user: null, isAuthenticated: false, isLoading: false });
// //         } catch (error) {
// //             set({ isLoading: false });
// //         }
// //     },

// //     checkAuthSession: async () => {
// //         try {
// //             const data = await userServices.getCurrentUser();
// //             set({ user: data.data, isAuthenticated: true });
// //         } catch (error) {
// //             set({ user: null, isAuthenticated: false });
// //         }
// //     }
// // }));

// // export default useAuthStore;

// import { create } from 'zustand';
// import userServices from '../Services/user.Services.js';

// const useAuthStore = create((set) => ({
//     user: null,             
//     isAuthenticated: false,  
//     isInitializing: true,    
//     isLoading: false,       
//     error: null,             

   

//     // Fetches current user on app load (Matches GET /api/v1/users/getCurrentUser)
//     checkAuthSession: async () => {
//         set({ isInitializing: true, error: null });
//         try {
//             const response = await userServices.getCurrentUser();

//             if (response?.data) {
//                 set({ user: response.data, isAuthenticated: true, isInitializing: false });
//             } else {
//                 set({ user: null, isAuthenticated: false, isInitializing: false });
//             }

//         } catch (error) {
//             set({ user: null, isAuthenticated: false, isInitializing: false });
//         }
//     },

//     // Handles login (Matches POST /api/v1/users/login)
//     loginUser: async (email, username, passwordHash) => {

//         set({ isLoading: true, error: null });

//         try {
//             const response = await userServices.login({ email, username, passwordHash });

//             if (response?.data?.user) {
//                 set({ user: response.data.user, isAuthenticated: true, isLoading: false });
//                 return true;
//             }
//             return false;
            
//         } catch (error) {
//             set({
//                 error: error.response?.data?.message || "Login failed. Please check credentials.",
//                 isLoading: false
//             });
//             return false;
//         }
//     },

//     // Handles registration (Matches POST /api/v1/users/register)
//     registerUser: async (username, email, passwordHash) => {
//         set({ isLoading: true, error: null });
//         try {
//             const response = await userServices.registerUser({ username, email, passwordHash });
//             if (response?.data) {
//                 set({ user: response.data, isAuthenticated: true, isLoading: false });
//                 return true; 
//             }
//             return false;
//         } catch (error) {
//             set({
//                 error: error.response?.data?.message || "Registration failed.",
//                 isLoading: false
//             });
//             return false;
//         }
//     },

//     // Handles logout (Matches POST /api/v1/users/logout)
//     logoutUser: async () => {
//         set({ isLoading: true, error: null });
//         try {
//             await userServices.logoutUser();
//         } catch (err) {
//             console.error("Logout failed on backend", err);
//         } finally {
//             set({ user: null, isAuthenticated: false, isLoading: false });
//         }
//     },

//     // Updates user profile details (Matches POST /api/v1/users/updateAdminDetails)
//     updateUserDetails: async (username, email) => {
//         set({ isLoading: true, error: null });
//         try {
//             const response = await userServices.updateAdminDetails({ username, email });
//             if (response?.data) {
//                 set({ user: response.data, isLoading: false });
//                 return true;
//             }
//             return false;
//         } catch (error) {
//             set({
//                 error: error.response?.data?.message || "Update failed.",
//                 isLoading: false
//             });
//             return false;
//         }
//     },


//     // Clears errors when navigating between pages
//     clearError: () => set({ error: null })
// }));

// export default useAuthStore;

import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    // --- 1. GLOBAL STATE ---
    user: null,
    isAuthenticated: false,
    isInitializing: true, // Needs to be global so AdminAuthLayout can show the initial spinner

    // --- 2. PURE SETTERS (No API logic here) ---
    setAuthData: (user) => set({ user, isAuthenticated: true, isInitializing: false }),
    clearAuthData: () => set({ user: null, isAuthenticated: false, isInitializing: false }),
    setInitializing: (status) => set({ isInitializing: status }),
}));