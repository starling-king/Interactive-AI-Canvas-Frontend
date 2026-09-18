// import { useState, useEffect } from "react";
// import adminServices from "../Services/admin_users.Services.js";
// import siteContentServices from "../Services/site_content.Services.js";
// import { useAuthStore } from "../store/authStore.js";

// function ProfileSettings() {
//   const { user: currentUser, setAuthData } = useAuthStore();

//   const [adminForm, setAdminForm] = useState({
//     username: currentUser?.username || "",
//     email: currentUser?.email || "",
//   });

//   useEffect(() => {
//     if (currentUser?.username) {
//       setAdminForm({
//         username: currentUser.username || "",
//         email: currentUser.email || "",
//       });
//     }
//   }, [currentUser]);

//   const [adminStatus, setAdminStatus] = useState({
//     loading: false,
//     error: "",
//     success: "",
//   });

//   const [portfolioForm, setPortfolioForm] = useState({
//     name: "",
//     role: "",
//     aboutText: "",
//     profilePhotoUrl: "",
//   });
//   const [portfolioStatus, setPortfolioStatus] = useState({
//     loading: false,
//     error: "",
//     success: "",
//   });
//   const [initialFetchLoading, setInitialFetchLoading] = useState(true);

//   const [passwordForm, setPasswordForm] = useState({
//     oldpassword: "",
//     newpassword: "",
//   });
//   const [passwordStatus, setPasswordStatus] = useState({
//     loading: false,
//     error: "",
//     success: "",
//   });
//   const [showPasswords, setShowPasswords] = useState(false);

//   const [toast, setToast] = useState({ type: "", message: "", visible: false });

//   const showToast = (type, message) => {
//     setToast({ type, message, visible: true });
//     setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 4000);
//   };

//   useEffect(() => {
//     const loadSiteContent = async () => {
//       try {
//         if (currentUser?.username) {
//           const res = await siteContentServices.read({
//             user: currentUser.username,
//           });
//           if (res?.data && Array.isArray(res.data)) {
//             const contentObj = {};
//             res.data.forEach((item) => {
//               contentObj[item.sectionKey] = item.contentValue;
//             });

//             setPortfolioForm({
//               name: contentObj.name || "",
//               role: contentObj.role || "",
//               aboutText: contentObj.aboutText || "",
//               profilePhotoUrl: contentObj.profilePhotoUrl || "",
//             });
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch public profile data:", error);
//       } finally {
//         setInitialFetchLoading(false);
//       }
//     };
//     loadSiteContent();
//   }, [currentUser?.username]);

//   const handleAdminSubmit = async (e) => {
//     e.preventDefault();
//     setAdminStatus({ loading: true, error: "", success: "" });
//     try {
//       const response = await adminServices.updateAdminDetails({
//         name: adminForm.username,
//         email: adminForm.email,
//       });

//       if (response?.data) {
//         setAuthData(response.data);
//         setAdminStatus({
//           loading: false,
//           error: "",
//           success: "Account details updated successfully!",
//         });
//         showToast("success", "Administrative credentials synchronized.");
//         setTimeout(
//           () => setAdminStatus((prev) => ({ ...prev, success: "" })),
//           3000,
//         );
//       }
//     } catch (error) {
//       setAdminStatus({
//         loading: false,
//         error: error.message || "Failed to update account.",
//         success: "",
//       });
//       showToast("error", error.message || "Failed to update account.");
//     }
//   };

//   const handlePortfolioSubmit = async (e) => {
//     e.preventDefault();
//     setPortfolioStatus({ loading: true, error: "", success: "" });
//     try {
//       const keysToUpdate = [
//         {
//           sectionKey: "name",
//           contentValue: portfolioForm.name,
//           contentType: "text",
//         },
//         {
//           sectionKey: "role",
//           contentValue: portfolioForm.role,
//           contentType: "text",
//         },
//         {
//           sectionKey: "aboutText",
//           contentValue: portfolioForm.aboutText,
//           contentType: "text",
//         },
//         {
//           sectionKey: "profilePhotoUrl",
//           contentValue: portfolioForm.profilePhotoUrl,
//           contentType: "url",
//         },
//       ];

//       const promises = keysToUpdate.map((item) =>
//         siteContentServices.writeContent(item),
//       );
//       await Promise.all(promises);

//       setPortfolioStatus({
//         loading: false,
//         error: "",
//         success: "Public portfolio updated successfully!",
//       });
//       showToast("success", "Public hero parameters deployed to live site.");
//       setTimeout(
//         () => setPortfolioStatus((prev) => ({ ...prev, success: "" })),
//         3000,
//       );
//     } catch (error) {
//       setPortfolioStatus({
//         loading: false,
//         error: error.message || "Failed to update portfolio.",
//         success: "",
//       });
//       showToast("error", error.message || "Failed to update portfolio.");
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setPasswordStatus({ loading: true, error: "", success: "" });
//     try {
//       await adminServices.changeCurrentPassword({
//         oldpassword: passwordForm.oldpassword,
//         newpassword: passwordForm.newpassword,
//       });
//       setPasswordStatus({
//         loading: false,
//         error: "",
//         success: "Password changed securely!",
//       });
//       showToast("success", "Security token updated. Password changed.");
//       setPasswordForm({ oldpassword: "", newpassword: "" });
//       setTimeout(
//         () => setPasswordStatus((prev) => ({ ...prev, success: "" })),
//         3000,
//       );
//     } catch (error) {
//       setPasswordStatus({
//         loading: false,
//         error: error.message || "Incorrect old password.",
//         success: "",
//       });
//       showToast("error", error.message || "Incorrect current password.");
//     }
//   };

//   const handleAdminChange = (e) =>
//     setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
//   const handlePortfolioChange = (e) =>
//     setPortfolioForm({ ...portfolioForm, [e.target.name]: e.target.value });
//   const handlePasswordChange = (e) =>
//     setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

//   const inputClass =
//     "w-full px-5 py-4 text-sm font-semibold text-slate-900 dark:text-slate-50 bg-slate-50/80 dark:bg-[#0a0a0c]/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl focus:bg-white dark:focus:bg-[#040405] focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-300 shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-600";

//   if (initialFetchLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[70vh] bg-transparent text-primary-600 dark:text-primary-400 font-black tracking-widest uppercase text-[10px] sm:text-xs transition-colors duration-500">
//         <div className="relative flex items-center justify-center w-12 h-12 mb-6">
//           <div className="absolute inset-0 rounded-full border-2 border-primary-400 opacity-20 animate-ping"></div>
//           <svg
//             className="w-8 h-8 animate-spin text-primary-500 opacity-80"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-20"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-100"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//         </div>
//         Decrypting Profile Parameters...
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full px-4 pt-12 pb-24 mx-auto max-w-5xl transition-all duration-500 isolate">
//       <div
//         className={`fixed top-28 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}
//       >
//         {toast.message && (
//           <div
//             className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
//               toast.type === "error"
//                 ? "bg-red-500/90 border-red-400 text-white"
//                 : "bg-emerald-500/90 border-emerald-400 text-white"
//             }`}
//           >
//             {toast.type === "success" && (
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2.5"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             )}
//             {toast.type === "error" && (
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2.5"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             )}
//             <span className="text-sm font-bold tracking-wide">
//               {toast.message}
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col items-start gap-6 mb-10">
//         <div className="space-y-3">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 shadow-sm gpu-layer cursor-default">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
//             </span>
//             <span className="text-[10px] font-bold tracking-widest text-primary-700 dark:text-primary-400 uppercase">
//               System Parameters
//             </span>
//           </div>
//           <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
//             Profile Command Console
//           </h1>
//           <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-2xl">
//             Manage administrative access credentials, security tokens, and
//             public portfolio hero parameters.
//           </p>
//         </div>
//       </div>

//       <div className="p-8 sm:p-12 bg-white/80 dark:bg-[#040405]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none gpu-layer mb-10">
//         <h2 className="text-[11px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-8 pb-4 border-b border-slate-200 dark:border-slate-800/80">
//           Public Hero Persona
//         </h2>

//         {portfolioStatus.error && (
//           <div className="flex items-start gap-3 p-4 mb-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl animate-[slideDown_0.3s_ease-out]">
//             <svg
//               className="w-5 h-5 mt-0.5 shrink-0 text-red-600 dark:text-red-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2.5}
//                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//               />
//             </svg>
//             <span className="text-xs font-medium text-red-700 dark:text-red-400">
//               {portfolioStatus.error}
//             </span>
//           </div>
//         )}

//         <form onSubmit={handlePortfolioSubmit} className="space-y-8">
//           <div className="flex flex-col gap-8 md:flex-row items-center md:items-start">
//             <div className="flex flex-col items-center gap-4 shrink-0 mb-4 md:mb-0">
//               <div className="relative w-40 h-52 sm:w-48 sm:h-64 rounded-3xl p-1.5 bg-white dark:bg-[#060608] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800 gpu-layer">
//                 <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
//                   <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary-500 rounded-tl-sm z-10 pointer-events-none"></div>

//                   {portfolioForm.profilePhotoUrl ? (
//                     <img
//                       src={portfolioForm.profilePhotoUrl}
//                       alt="Profile Preview"
//                       className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
//                     />
//                   ) : (
//                     <svg
//                       className="absolute w-12 h-12 text-slate-400 dark:text-slate-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="1.5"
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       />
//                     </svg>
//                   )}
//                 </div>

//                 <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#0a0a0c] border border-slate-100 dark:border-slate-800 rounded-full shadow-lg z-20">
//                   <svg
//                     className="w-3.5 h-3.5 text-primary-500"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <span className="text-[10px] font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase">
//                     Verified
//                   </span>
//                 </div>
//               </div>
//               <span className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mt-2">
//                 Home Page Replica
//               </span>
//             </div>

//             <div className="grow space-y-6 w-full">
//               <div className="relative group">
//                 <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
//                   Display Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={portfolioForm.name}
//                   onChange={handlePortfolioChange}
//                   className={inputClass}
//                   placeholder="e.g. Ayush"
//                 />
//               </div>

//               <div className="relative group">
//                 <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
//                   Role / Tagline
//                 </label>
//                 <input
//                   type="text"
//                   name="role"
//                   value={portfolioForm.role}
//                   onChange={handlePortfolioChange}
//                   className={inputClass}
//                   placeholder="e.g. Full Stack Developer"
//                 />
//               </div>

//               <div className="relative group">
//                 <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
//                   Profile Asset URL (Cloudinary, GitHub, Imgur)
//                 </label>
//                 <input
//                   type="url"
//                   name="profilePhotoUrl"
//                   value={portfolioForm.profilePhotoUrl}
//                   onChange={handlePortfolioChange}
//                   className={inputClass}
//                   placeholder="https://..."
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="relative group">
//             <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
//               Bio / Executive Summary
//             </label>
//             <textarea
//               name="aboutText"
//               value={portfolioForm.aboutText}
//               onChange={handlePortfolioChange}
//               rows="3"
//               className={`${inputClass} resize-y leading-relaxed`}
//               placeholder="Short high-impact description displayed on the landing page..."
//             ></textarea>
//           </div>

//           <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800/80">
//             <button
//               type="submit"
//               disabled={portfolioStatus.loading}
//               className="flex items-center justify-center w-full sm:w-auto px-10 py-4 text-[13px] font-black tracking-widest uppercase text-white bg-primary-500 hover:bg-primary-600 rounded-2xl shadow-[0_0_20px_var(--theme-primary-glow)] hover:shadow-[0_0_30px_var(--theme-primary-glow)] transform-gpu hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed gpu-layer"
//             >
//               {portfolioStatus.loading ? (
//                 <span className="flex items-center">
//                   <svg
//                     className="w-4 h-4 mr-2 animate-spin"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                   >
//                     <circle
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       strokeWidth="4"
//                       className="opacity-25"
//                     ></circle>
//                     <path
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       className="opacity-75"
//                     ></path>
//                   </svg>
//                   Updating...
//                 </span>
//               ) : (
//                 "Deploy Public Persona"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>

//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <div className="p-8 sm:p-10 bg-white/80 dark:bg-[#040405]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none gpu-layer">
//           <h2 className="text-[11px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-8 pb-4 border-b border-slate-200 dark:border-slate-800/80">
//             Account Credentials
//           </h2>

//           {adminStatus.error && (
//             <div className="flex items-start gap-3 p-4 mb-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl animate-[slideDown_0.3s_ease-out]">
//               <svg
//                 className="w-5 h-5 mt-0.5 shrink-0 text-red-600 dark:text-red-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2.5}
//                   d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                 />
//               </svg>
//               <span className="text-xs font-medium text-red-700 dark:text-red-400">
//                 {adminStatus.error}
//               </span>
//             </div>
//           )}

//           <form onSubmit={handleAdminSubmit} className="space-y-6">
//             <div className="relative group">
//               <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
//                 Master Username
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 value={adminForm.username}
//                 onChange={handleAdminChange}
//                 className={inputClass}
//                 required
//               />
//             </div>

//             <div className="relative group">
//               <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
//                 Recovery Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={adminForm.email}
//                 onChange={handleAdminChange}
//                 className={inputClass}
//                 required
//               />
//             </div>

//             <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800/80">
//               <button
//                 type="submit"
//                 disabled={adminStatus.loading}
//                 className="w-full sm:w-auto px-8 py-3.5 text-[11px] font-black tracking-widest uppercase text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-xl transition-all duration-300 disabled:opacity-50 gpu-layer"
//               >
//                 {adminStatus.loading ? "Updating..." : "Update Master Account"}
//               </button>
//             </div>
//           </form>
//         </div>

//         <div className="p-8 sm:p-10 bg-white/80 dark:bg-[#040405]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none gpu-layer">
//           <h2 className="text-[11px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-8 pb-4 border-b border-slate-200 dark:border-slate-800/80">
//             Security & Authentication
//           </h2>

//           {passwordStatus.error && (
//             <div className="flex items-start gap-3 p-4 mb-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl animate-[slideDown_0.3s_ease-out]">
//               <svg
//                 className="w-5 h-5 mt-0.5 shrink-0 text-red-600 dark:text-red-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2.5}
//                   d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                 />
//               </svg>
//               <span className="text-xs font-medium text-red-700 dark:text-red-400">
//                 {passwordStatus.error}
//               </span>
//             </div>
//           )}

//           <form onSubmit={handlePasswordSubmit} className="space-y-6">
//             <div className="relative group">
//               <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
//                 Current Security Password
//               </label>
//               <input
//                 type={showPasswords ? "text" : "password"}
//                 name="oldpassword"
//                 value={passwordForm.oldpassword}
//                 onChange={handlePasswordChange}
//                 className={inputClass}
//                 required
//                 placeholder="••••••••"
//               />
//             </div>

//             <div className="relative group">
//               <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
//                 New Security Password
//               </label>
//               <input
//                 type={showPasswords ? "text" : "password"}
//                 name="newpassword"
//                 value={passwordForm.newpassword}
//                 onChange={handlePasswordChange}
//                 className={inputClass}
//                 required
//                 placeholder="••••••••"
//               />
//             </div>

//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
//               <label className="flex items-center gap-3 cursor-pointer group">
//                 <div
//                   className={`relative flex items-center justify-center w-6 h-6 rounded-md border transition-all duration-300 ${showPasswords ? "bg-primary-500 border-primary-500" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-primary-400"}`}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={showPasswords}
//                     onChange={() => setShowPasswords(!showPasswords)}
//                     className="absolute opacity-0 w-full h-full cursor-pointer"
//                   />
//                   {showPasswords && (
//                     <svg
//                       className="w-4 h-4 text-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="3"
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   )}
//                 </div>
//                 <span className="text-xs font-extrabold tracking-wide text-slate-600 dark:text-slate-400 select-none">
//                   Reveal Passwords
//                 </span>
//               </label>

//               <button
//                 type="submit"
//                 disabled={passwordStatus.loading}
//                 className="w-full sm:w-auto px-8 py-3.5 text-[11px] font-black tracking-widest uppercase text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-xl transition-all duration-300 disabled:opacity-50 gpu-layer"
//               >
//                 {passwordStatus.loading ? "Updating..." : "Commit Password"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfileSettings;
