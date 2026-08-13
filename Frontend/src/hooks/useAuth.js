import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

// Small wrapper hook so components never import AuthContext + useContext directly
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;