import { create } from 'zustand';

export const useAiStore = create((set) => ({
    // --- GLOBAL STATE ---
    activeJobId: null, // The orchestrationId ticket
    jobStatus: 'idle', // 'idle' | 'queued' | 'processing' | 'completed' | 'failed'

    // --- PURE SETTERS ---
    setActiveJob: (id) => set({ activeJobId: id }),
    setJobStatus: (status) => set({ jobStatus: status }),
    resetAiState: () => set({ activeJobId: null, jobStatus: 'idle' })
}));