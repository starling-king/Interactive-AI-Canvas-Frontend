// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useWorkspaceStore } from "../store/workspaceStore.js";
// // import workspaceServices from "../Services/workspace.Services.js";

// // // Import your custom enterprise UI components
// // import GlassCard from "../components/ui/GlassCard.jsx";
// // import ElectricButton from "../components/ui/ElectricButton.jsx";
// // import SkeletonLoader from "../components/ui/SkeletonLoader.jsx";
// // import GlassInput from "../components/ui/GlassInput.jsx";
// // import GlassSelect from "../components/ui/GlassSelect.jsx";

// // export default function Admin() {
// //   const navigate = useNavigate();

// //   // Read the lightweight metadata array from Zustand
// //   const workspaces = useWorkspaceStore((state) => state.workspaces);

// //   // In a real app, this loading state would come from AdminAuthLayout's initial fetch
// //   const isLoading = false;

// //   // State for the Genesis Flow (New Workspace Creation)
// //   const [isCreating, setIsCreating] = useState(false);
// //   const [newTitle, setNewTitle] = useState("");
// //   const [newDesc, setNewDesc] = useState("");
// //   const [newType, setNewType] = useState("flowchart");

// //   // The Genesis Flow Execution
// //   const handleCreateWorkspace = async (e) => {
// //     e.preventDefault();
// //     setIsCreating(true);

// //     try {
// //       // Tell the backend to create the metadata AND an empty CanvasGraph document
// //       const response = await workspaceServices.createAdminWorkspace({
// //         title: newTitle,
// //         description: newDesc,
// //         diagramType: newType,
// //         isPublished: false
// //       });

// //       if (response?.data?._id) {
// //         // Instantly teleport the user into the newly created, blank workspace
// //         navigate(`/workspace/${response.data._id}`);
// //       }
// //     } catch (error) {
// //       console.error("Failed to initialize workspace:", error);
// //     } finally {
// //       setIsCreating(false);
// //     }
// //   };

// //   return (
// //     <section className="min-h-[85vh] bg-abstract-glow px-4 py-12 sm:px-6 lg:px-8">
// //       <div className="max-w-7xl mx-auto space-y-12">

// //         {/* Header Section */}
// //         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
// //           <div>
// //             <h1 className="text-4xl font-display text-white tracking-tight">Command Center</h1>
// //             <p className="text-slate-400 mt-2 text-sm">Manage your interactive architectures and AI flows.</p>
// //           </div>
// //         </div>

// //         {/* The Genesis Form (New Workspace) */}
// //         <GlassCard padding="md" variant="default" className="max-w-3xl border-electric/20">
// //           <h2 className="text-xl font-display text-white mb-6 flex items-center gap-2">
// //             <span className="text-electric">⚡</span> Initialize New Uplink
// //           </h2>

// //           <form onSubmit={handleCreateWorkspace} className="space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <GlassInput
// //                 label="Project Title"
// //                 required
// //                 value={newTitle}
// //                 onChange={(e) => setNewTitle(e.target.value)}
// //                 placeholder="e.g. AWS Payment Gateway"
// //               />
// //               <GlassSelect
// //                 label="Architecture Type"
// //                 value={newType}
// //                 onChange={(e) => setNewType(e.target.value)}
// //                 options={[
// //                   { label: "Flowchart", value: "flowchart" },
// //                   { label: "Database Schema (ERD)", value: "erd" },
// //                   { label: "Cloud Infrastructure", value: "infrastructure" },
// //                 ]}
// //               />
// //             </div>
// //             <GlassInput
// //               label="Brief Description"
// //               value={newDesc}
// //               onChange={(e) => setNewDesc(e.target.value)}
// //               placeholder="Describe the system purpose..."
// //             />
// //             <div className="flex justify-end pt-2">
// //               <ElectricButton type="submit" isLoading={isCreating}>
// //                 Initialize Workspace
// //               </ElectricButton>
// //             </div>
// //           </form>
// //         </GlassCard>

// //         {/* The Grid Section */}
// //         <div className="space-y-6">
// //           <h3 className="text-sm font-bold tracking-widest uppercase text-slate-500">Active Uplinks</h3>

// //           {isLoading ? (
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               <SkeletonLoader count={3} type="card" />
// //             </div>
// //           ) : workspaces?.length > 0 ? (
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {workspaces.map((ws) => (
// //                 <Link key={ws._id} to={`/workspace/${ws._id}`}>
// //                   <GlassCard variant="interactive" padding="md" className="h-full flex flex-col justify-between">
// //                     <div>
// //                       <div className="flex justify-between items-start mb-4">
// //                         <div className="px-2.5 py-1 rounded-md bg-moon-800 text-[10px] font-bold tracking-widest uppercase text-electric">
// //                           {ws.diagramType || 'Canvas'}
// //                         </div>
// //                         <div className={`w-2 h-2 rounded-full ${ws.isPublished ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-slate-600'}`} />
// //                       </div>
// //                       <h4 className="text-xl font-display text-white mb-2 line-clamp-1">{ws.title}</h4>
// //                       <p className="text-sm text-slate-400 line-clamp-2">{ws.description || 'No description provided.'}</p>
// //                     </div>

// //                     <div className="mt-6 pt-4 border-t border-moon-800 flex justify-between items-center text-xs text-slate-500 font-mono">
// //                       <span>ID: {ws._id.slice(-6)}</span>
// //                       <span>{new Date(ws.updatedAt).toLocaleDateString()}</span>
// //                     </div>
// //                   </GlassCard>
// //                 </Link>
// //               ))}
// //             </div>
// //           ) : (
// //             <GlassCard padding="lg" className="text-center border-dashed border-moon-800">
// //               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-moon-800/50 text-slate-500 mb-4">
// //                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
// //                 </svg>
// //               </div>
// //               <h4 className="text-lg font-display text-white mb-2">No Active Uplinks</h4>
// //               <p className="text-slate-400 text-sm max-w-md mx-auto">You haven't initialized any interactive architectures yet. Use the form above to deploy your first workspace.</p>
// //             </GlassCard>
// //           )}
// //         </div>

// //       </div>
// //     </section>
// //   );
// // }


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useWorkspaceStore } from "../store/workspaceStore.js";
// import workspaceServices from "../Services/workspace.Services.js";

// // Import your custom enterprise UI components
// import GlassCard from "../components/ui/GlassCard.jsx";
// import ElectricButton from "../components/ui/ElectricButton.jsx";
// import SkeletonLoader from "../components/ui/SkeletonLoader.jsx";
// import GlassInput from "../components/ui/GlassInput.jsx";
// import GlassSelect from "../components/ui/GlassSelect.jsx";

// export default function Admin() {
//   const navigate = useNavigate();

//   // Read the lightweight metadata array from Zustand
//   const workspaces = useWorkspaceStore((state) => state.workspaces);

//   // In a real app, this loading state would come from AdminAuthLayout's initial fetch
//   const isLoading = false;

//   // State for the Genesis Flow (New Workspace Creation)
//   const [isCreating, setIsCreating] = useState(false);
//   const [newTitle, setNewTitle] = useState("");
//   const [newDesc, setNewDesc] = useState("");
//   const [newType, setNewType] = useState("flowchart"); // Defaults to a valid enum

//   // The Genesis Flow Execution
//   const handleCreateWorkspace = async (e) => {
//     e.preventDefault();
//     setIsCreating(true);

//     try {
//       // 1. FIX: Changed to createWorkspace (verify this name in workspace.Services.js!)
//       const response = await workspaceServices.createWorkspace({
//         title: newTitle,
//         description: newDesc,
//         diagramType: newType,
//         isPublished: false
//       });

//       if (response?.data?._id) {
//         // Instantly teleport the user into the newly created, blank workspace
//         navigate(`/workspace/${response.data._id}`);
//       }
//     } catch (error) {
//       console.error("Failed to initialize workspace:", error);
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   return (
//     <section className="min-h-[85vh] bg-abstract-glow px-4 py-12 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto space-y-12">

//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//           <div>
//             <h1 className="text-4xl font-display text-white tracking-tight">Command Center</h1>
//             <p className="text-slate-400 mt-2 text-sm">Manage your interactive architectures and AI flows.</p>
//           </div>
//         </div>

//         {/* The Genesis Form (New Workspace) */}
//         <GlassCard padding="md" variant="default" className="max-w-3xl border-electric/20">
//           <h2 className="text-xl font-display text-white mb-6 flex items-center gap-2">
//             <span className="text-electric">⚡</span> Initialize New Uplink
//           </h2>

//           <form onSubmit={handleCreateWorkspace} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <GlassInput
//                 label="Project Title"
//                 required
//                 value={newTitle}
//                 onChange={(e) => setNewTitle(e.target.value)}
//                 placeholder="e.g. AWS Payment Gateway"
//               />
//               {/* 2. FIX: Mapped options perfectly to Workspace.model.js enum */}
//               <GlassSelect
//                 label="Architecture Type"
//                 value={newType}
//                 onChange={(e) => setNewType(e.target.value)}
//                 options={[
//                   { label: "Flowchart", value: "flowchart" },
//                   { label: "Simulation Tree", value: "simulationTree" },
//                   { label: "Tracking Gauge", value: "trackingGauge" },
//                   { label: "Code Logic", value: "codeLogic" },
//                 ]}
//               />
//             </div>
//             <GlassInput
//               label="Brief Description"
//               value={newDesc}
//               onChange={(e) => setNewDesc(e.target.value)}
//               placeholder="Describe the system purpose..."
//             />
//             <div className="flex justify-end pt-2">
//               <ElectricButton type="submit" isLoading={isCreating}>
//                 Initialize Workspace
//               </ElectricButton>
//             </div>
//           </form>
//         </GlassCard>

//         {/* The Grid Section */}
//         <div className="space-y-6">
//           <h3 className="text-sm font-bold tracking-widest uppercase text-slate-500">Active Uplinks</h3>

//           {isLoading ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <SkeletonLoader count={3} type="card" />
//             </div>
//           ) : workspaces?.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {workspaces.map((ws) => (
//                 <Link key={ws._id} to={`/workspace/${ws._id}`}>
//                   <GlassCard variant="interactive" padding="md" className="h-full flex flex-col justify-between">
//                     <div>
//                       <div className="flex justify-between items-start mb-4">
//                         <div className="px-2.5 py-1 rounded-md bg-moon-800 text-[10px] font-bold tracking-widest uppercase text-electric">
//                           {ws.diagramType || 'Canvas'}
//                         </div>
//                         <div className={`w-2 h-2 rounded-full ${ws.isPublished ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-slate-600'}`} />
//                       </div>
//                       <h4 className="text-xl font-display text-white mb-2 line-clamp-1">{ws.title}</h4>
//                       <p className="text-sm text-slate-400 line-clamp-2">{ws.description || 'No description provided.'}</p>
//                     </div>

//                     <div className="mt-6 pt-4 border-t border-moon-800 flex justify-between items-center text-xs text-slate-500 font-mono">
//                       <span>ID: {ws._id.slice(-6)}</span>
//                       <span>{new Date(ws.updatedAt).toLocaleDateString()}</span>
//                     </div>
//                   </GlassCard>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <GlassCard padding="lg" className="text-center border-dashed border-moon-800">
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-moon-800/50 text-slate-500 mb-4">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//               </div>
//               <h4 className="text-lg font-display text-white mb-2">No Active Uplinks</h4>
//               <p className="text-slate-400 text-sm max-w-md mx-auto">You haven't initialized any interactive architectures yet. Use the form above to deploy your first workspace.</p>
//             </GlassCard>
//           )}
//         </div>

//       </div>
//     </section>
//   );
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWorkspaceStore } from "../store/workspaceStore.js";

// 1. FIX: Imported the dedicated action hook
import { useWorkspaceActions } from "../hooks/useWorkspaceActions.js";

// Custom UI Components
import GlassCard from "../components/ui/GlassCard.jsx";
import ElectricButton from "../components/ui/ElectricButton.jsx";
import SkeletonLoader from "../components/ui/SkeletonLoader.jsx";
import GlassInput from "../components/ui/GlassInput.jsx";
import GlassSelect from "../components/ui/GlassSelect.jsx";

export default function Admin() {
  const navigate = useNavigate();

  // Read the metadata array from Zustand
  const workspaces = useWorkspaceStore((state) => state.workspaces);

  // 2. FIX: Destructure the heavy lifting from your hook
  const { createWorkspace, isLoading: isCreating, error } = useWorkspaceActions();

  // In a real app, this loading state would come from AdminAuthLayout's initial fetch
  const isFetchingWorkspaces = false;

  // Local form state
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newType, setNewType] = useState("flowchart");

  // The Genesis Flow Execution
  const handleCreateWorkspace = async (e) => {
    e.preventDefault();

    // 3. FIX: Hook handles the try/catch, loading states, and Zustand memory injection
    const newWorkspaceId = await createWorkspace({
      title: newTitle,
      description: newDesc,
      diagramType: newType,
      isPublished: false
    });

    if (newWorkspaceId) {
      // Instantly teleport the user into the newly created, blank workspace
      navigate(`/workspace/${newWorkspaceId}`);
    }
  };

  return (
    <section className="min-h-[85vh] bg-abstract-glow px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-display text-white tracking-tight">Command Center</h1>
            <p className="text-slate-400 mt-2 text-sm">Manage your interactive architectures and AI flows.</p>
          </div>
        </div>

        {/* The Genesis Form (New Workspace) */}
        <GlassCard padding="md" variant="default" className="max-w-3xl border-electric/20">
          <h2 className="text-xl font-display text-white mb-6 flex items-center gap-2">
            <span className="text-electric">⚡</span> Initialize New Uplink
          </h2>

          <form onSubmit={handleCreateWorkspace} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassInput
                label="Project Title"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. AWS Payment Gateway"
              />

              <GlassSelect
                label="Architecture Type"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                options={[
                  { label: "Flowchart", value: "flowchart" },
                  { label: "Simulation Tree", value: "simulationTree" },
                  { label: "Tracking Gauge", value: "trackingGauge" },
                  { label: "Code Logic", value: "codeLogic" },
                ]}
              />
            </div>

            <GlassInput
              label="Brief Description"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Describe the system purpose..."
            />

            {/* Display hook-level errors if backend rejects creation */}
            {error && <p className="text-rose-400 text-sm font-semibold">{error}</p>}

            <div className="flex justify-end pt-2">
              <ElectricButton type="submit" isLoading={isCreating}>
                Initialize Workspace
              </ElectricButton>
            </div>
          </form>
        </GlassCard>

        {/* The Grid Section */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold tracking-widest uppercase text-slate-500">Active Uplinks</h3>

          {isFetchingWorkspaces ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonLoader count={3} type="card" />
            </div>
          ) : workspaces?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspaces.map((ws) => (
                <Link key={ws._id} to={`/workspace/${ws._id}`}>
                  <GlassCard variant="interactive" padding="md" className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="px-2.5 py-1 rounded-md bg-moon-800 text-[10px] font-bold tracking-widest uppercase text-electric">
                          {ws.diagramType || 'Canvas'}
                        </div>
                        <div className={`w-2 h-2 rounded-full ${ws.isPublished ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-slate-600'}`} />
                      </div>
                      <h4 className="text-xl font-display text-white mb-2 line-clamp-1">{ws.title}</h4>
                      <p className="text-sm text-slate-400 line-clamp-2">{ws.description || 'No description provided.'}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-moon-800 flex justify-between items-center text-xs text-slate-500 font-mono">
                      <span>ID: {ws._id.slice(-6)}</span>
                      <span>{new Date(ws.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          ) : (
            <GlassCard padding="lg" className="text-center border-dashed border-moon-800">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-moon-800/50 text-slate-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h4 className="text-lg font-display text-white mb-2">No Active Uplinks</h4>
              <p className="text-slate-400 text-sm max-w-md mx-auto">You haven't initialized any interactive architectures yet. Use the form above to deploy your first workspace.</p>
            </GlassCard>
          )}
        </div>

      </div>
    </section>
  );
}