import { useState } from 'react';
import userServices from '../Services/user.Services.js';
import { useAuthStore } from '../store/authStore.js';

export const useAuthActions = () => {
    // Local, garbage-collected states!
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Connect to the global brain
    const { setAuthData, clearAuthData, setInitializing } = useAuthStore();

    const clearError = () => setError(null);

    // Matches GET /api/v1/users/getCurrentUser
    const checkAuthSession = async () => {
        setInitializing(true);
        try {
            const response = await userServices.getCurrentUser();
            if (response?.data) {
                setAuthData(response.data);
            } else {
                clearAuthData();
            }
        } catch (err) {
            clearAuthData();
        }
    };

    // Matches POST /api/v1/users/login
    const loginUser = async (email, username, passwordHash) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await userServices.login({ email, username, passwordHash });
            if (response?.data?.user) {
                setAuthData(response.data.user);
                return true;
            }
            return false;
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please check credentials.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Matches POST /api/v1/users/register
    const registerUser = async (username, email, passwordHash) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await userServices.registerUser({ username, email, passwordHash });
            if (response?.data) {
                setAuthData(response.data);
                return true;
            }
            return false;
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Matches POST /api/v1/users/logout
    const logoutUser = async () => {
        setIsLoading(true);
        try {
            await userServices.logoutUser();
        } catch (err) {
            console.error("Logout failed on backend", err);
        } finally {
            clearAuthData();
            setIsLoading(false);
        }
    };

    // Matches POST /api/v1/users/updateAdminDetails
    const updateUserDetails = async (username, email) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await userServices.updateAdminDetails({ username, email });
            if (response?.data) {
                setAuthData(response.data); // Update global memory with new details
                return true;
            }
            return false;
        } catch (err) {
            setError(err.response?.data?.message || "Update failed.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Return the tools so any component can use them
    return {
        checkAuthSession,
        loginUser,
        registerUser,
        logoutUser,
        updateUserDetails,
        isLoading,
        error,
        clearError
    };
};