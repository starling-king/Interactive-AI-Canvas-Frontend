import { useState } from 'react';
import workspaceServices from '../Services/workspace.Services.js';
import { useWorkspaceStore } from '../store/workspaceStore.js';

export const useWorkspaceActions = () => {
    // Local, garbage-collected states for mutations
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Connect to the lean global memory
    const {
        setFetching,
        setWorkspaces,
        setCurrentWorkspace,
        addWorkspace,
        updateWorkspaceInStore,
        removeWorkspace
    } = useWorkspaceStore();

    const clearError = () => setError(null);

    // Fetches all workspaces for the logged-in admin
    const fetchAdminWorkspaces = async () => {
        setFetching(true);
        setError(null);
        try {
            const response = await workspaceServices.getAllAdminWorkspaces();
            if (response?.data) {
                setWorkspaces(response.data);
            } else {
                setWorkspaces([]);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load workspaces.");
        } finally {
            setFetching(false);
        }
    };

    // Fetches a single public workspace by slug
    const fetchPublicWorkspace = async (slug) => {
        setFetching(true);
        setError(null);
        setCurrentWorkspace(null);
        try {
            const response = await workspaceServices.getPublicWorkspaceBySlug({ slug });
            if (response?.data) {
                setCurrentWorkspace(response.data);
                return true;
            }
            return false;
        } catch (err) {
            setError(err.response?.data?.message || "Workspace is private or not found.");
            return false;
        } finally {
            setFetching(false);
        }
    };

    const createWorkspace = async (workspaceData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await workspaceServices.createWorkspace(workspaceData);
            const newWorkspace = response?.data?.data || response?.data;
            if (newWorkspace) {
                addWorkspace(newWorkspace); 
                return newWorkspace._id;
            }
            return null;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create workspace.");
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // Updates an existing workspace
    const updateWorkspace = async (id, updatedData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await workspaceServices.updateWorkspace({ id, ...updatedData });
            if (response?.data) {
                updateWorkspaceInStore(id, response.data); // Optimistic UI update
                return true;
            }
            return false;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update workspace.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Deletes a workspace
    const deleteWorkspace = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            await workspaceServices.deleteWorkspace({ id });
            removeWorkspace(id); // Instantly drop from memory
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete workspace.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        fetchAdminWorkspaces,
        fetchPublicWorkspace,
        createWorkspace,
        updateWorkspace,
        deleteWorkspace,
        isLoading,
        error,
        clearError
    };
};