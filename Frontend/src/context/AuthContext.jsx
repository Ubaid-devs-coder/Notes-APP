import { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service.js";

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Derived value — true whenever we have a logged-in user
  const isAuthenticated = !!user;

  // Check if the user is already logged in (runs once on app load)
  const getProfile = async () => {
    try {
      const data = await authService.getProfile();
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem("token"); // expired/invalid token — stop sending it
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Register a new user. Stores the token client-side so it can be sent as
  // an Authorization header — the cookie alone isn't reliable cross-site
  // (see axios.js request interceptor for why).
  const register = async (formData) => {
    const data = await authService.register(formData);
    if (data.token) localStorage.setItem("token", data.token);
    setUser(data.user);
    return data;
  };

  // Login an existing user. Same token-storage reasoning as register().
  const login = async (formData) => {
    const data = await authService.login(formData);
    if (data.token) localStorage.setItem("token", data.token);
    setUser(data.user);
    return data;
  };

  // Update the logged-in user's profile
  const updateProfile = async (formData) => {
    const data = await authService.updateProfile(formData);
    setUser(data.user);
    return data;
  };

  // Change the logged-in user's password
  const changePassword = async (formData) => {
    const data = await authService.changePassword(formData);
    return data;
  };

  // Logout the current user
  const logout = async () => {
    await authService.logout();
    localStorage.removeItem("token");
    setUser(null);
  };

  // Permanently delete the current user account
  const deleteAccount = async () => {
    const data = await authService.deleteAccount();
    localStorage.removeItem("token");
    setUser(null);
    return data;
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    deleteAccount,
    getProfile,
    updateProfile,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
