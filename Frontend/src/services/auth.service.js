import axiosInstance from "./axios.js";

// Register a new user
const register = async (formData) => {
  const response = await axiosInstance.post("/auth/register", formData);
  return response.data;
};

// Login an existing user
const login = async (formData) => {
  const response = await axiosInstance.post("/auth/login", formData);
  return response.data;
};

// Get the logged-in user's profile
const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};

// Update the logged-in user's profile
const updateProfile = async (formData) => {
  const response = await axiosInstance.put("/auth/profile", formData);
  return response.data;
};

// Change password
const changePassword = async (formData) => {
  const response = await axiosInstance.put(
    "/auth/change-password",
    formData
  );
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

// Delete user account
const deleteAccount = async () => {
  const response = await axiosInstance.delete("/auth/delete-account");
  return response.data;
};

const authService = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  logout,
};

export default authService;