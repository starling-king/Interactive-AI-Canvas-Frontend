import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userServices from "../Services/user.Services.js";
import { useAuthStore } from "../store/authStore.js";
import { useAuthActions } from "../hooks/useAuthActions.js";
import { useWorkspaceStore } from "../store/workspaceStore.js"; // Ensure we clear workspaces on logout

// Our SSOT UI Arsenal
import { GlassCard, GlassInput, ElectricButton } from "../components/index.js";

export default function ProfileSettings() {
    const { user: currentUser, clearAuthData } = useAuthStore();
    const { updateUserDetails, logoutUser } = useAuthActions();
    const setWorkspaces = useWorkspaceStore((state) => state.setWorkspaces); // Needed to clear RAM
    const navigate = useNavigate();

    // Component States
    const [adminForm, setAdminForm] = useState({
        username: currentUser?.username || "",
        email: currentUser?.email || "",
    });

    const [passwordForm, setPasswordForm] = useState({
        oldpassword: "",
        newpassword: "",
    });

    const [status, setStatus] = useState({ type: "", message: "", loading: false });
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Sync state if global user changes
    useEffect(() => {
        if (currentUser?.username) {
            setAdminForm({
                username: currentUser.username,
                email: currentUser.email,
            });
        }
    }, [currentUser]);

    // Flash Messages
    const showToast = (type, message) => {
        setStatus({ type, message, loading: false });
        setTimeout(() => setStatus({ type: "", message: "", loading: false }), 4000);
    };

    // --- Handlers ---
    const handleAdminSubmit = async (e) => {
        e.preventDefault();
        setStatus({ ...status, loading: true });

        const success = await updateUserDetails(adminForm.username, adminForm.email);
        if (success) {
            showToast("success", "Administrative credentials synchronized.");
        } else {
            showToast("error", "Failed to update account.");
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setStatus({ ...status, loading: true });

        try {
            await userServices.changeCurrentPassword(passwordForm);
            showToast("success", "Security token updated. Password changed.");
            setPasswordForm({ oldpassword: "", newpassword: "" });
        } catch (error) {
            showToast("error", error.message || "Incorrect current password.");
        }
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logoutUser();
        } catch (err) {
            console.log("Backend session already cleared.");
        } finally {
            // Immediate RAM flush
            setWorkspaces([]);
            clearAuthData();
            navigate("/login", { replace: true });
        }
    };

    return (
        <div className="relative w-full px-4 pt-12 pb-24 mx-auto max-w-4xl transition-all duration-500 isolate animate-[slideDown_0.4s_ease-out]">

            {/* Toast Notification (Floating Glass Pill) */}
            <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${status.message ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}>
                {status.message && (
                    <div className={`flex items-center gap-3 px-6 py-3 rounded-xl shadow-2xl backdrop-blur-xl border ${status.type === "error" ? "bg-rose-500/10 border-rose-500/50 text-rose-400" : "bg-electric/10 border-electric/50 text-electric"
                        }`}>
                        <span className="text-xs font-bold tracking-widest uppercase">
                            {status.message}
                        </span>
                    </div>
                )}
            </div>

            {/* Page Header */}
            <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-moon-900 border border-moon-800 shadow-sm cursor-default">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse shadow-[0_0_10px_var(--color-electric-glow)]" />
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                        System Parameters
                    </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
                    Profile Command Console
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                    Manage administrative credentials and security tokens.
                </p>
            </div>

            {/* Grid Layout for Forms */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                {/* Account Credentials Card */}
                <GlassCard padding="lg" className="flex flex-col h-full">
                    <h2 className="text-[11px] font-black tracking-widest text-slate-500 uppercase mb-6 pb-4 border-b border-moon-800">
                        Account Credentials
                    </h2>
                    <form onSubmit={handleAdminSubmit} className="space-y-6 flex-1 flex flex-col">
                        <GlassInput
                            label="Master Username"
                            name="username"
                            value={adminForm.username}
                            onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
                            required
                        />
                        <GlassInput
                            label="Recovery Email"
                            type="email"
                            name="email"
                            value={adminForm.email}
                            onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                            required
                        />
                        <div className="mt-auto pt-6 flex justify-end">
                            <ElectricButton
                                type="submit"
                                isLoading={status.loading && !passwordForm.oldpassword}
                                className="w-full sm:w-auto"
                            >
                                Update Identity
                            </ElectricButton>
                        </div>
                    </form>
                </GlassCard>

                {/* Security Card */}
                <GlassCard padding="lg" className="flex flex-col h-full">
                    <h2 className="text-[11px] font-black tracking-widest text-slate-500 uppercase mb-6 pb-4 border-b border-moon-800">
                        Security Hash
                    </h2>
                    <form onSubmit={handlePasswordSubmit} className="space-y-6 flex-1 flex flex-col">
                        <GlassInput
                            label="Current Passkey"
                            type="password"
                            name="oldpassword"
                            value={passwordForm.oldpassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, oldpassword: e.target.value })}
                            required
                        />
                        <GlassInput
                            label="New Passkey"
                            type="password"
                            name="newpassword"
                            value={passwordForm.newpassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newpassword: e.target.value })}
                            required
                        />
                        <div className="mt-auto pt-6 flex justify-end">
                            <ElectricButton
                                type="submit"
                                variant="secondary"
                                isLoading={status.loading && passwordForm.oldpassword}
                                className="w-full sm:w-auto"
                            >
                                Commit Hash
                            </ElectricButton>
                        </div>
                    </form>
                </GlassCard>
            </div>

            {/* Danger Zone (The relocated Logout Button) */}
            <div className="mt-12 pt-8 border-t border-moon-800">
                <GlassCard padding="lg" className="border-rose-900/30">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-lg font-bold text-rose-400">Terminate Session</h3>
                            <p className="text-sm text-slate-400 mt-1">
                                Close the secure uplink and clear the local cache. You will need to re-authenticate to access the architecture workspace.
                            </p>
                        </div>
                        <ElectricButton
                            variant="danger"
                            onClick={handleLogout}
                            isLoading={isLoggingOut}
                            className="w-full sm:w-auto shrink-0"
                        >
                            Sign Out
                            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </ElectricButton>
                    </div>
                </GlassCard>
            </div>

        </div>
    );
}