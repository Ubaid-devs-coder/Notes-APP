import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  NotebookPen,
  ArrowRight,
} from "lucide-react";

import loginNotesImage from "../../assets/login-ui.jpg";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // =========================
  // Handle Input Changes
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // Handle Login
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 sm:p-6">
      <div className="flex w-full max-w-4xl min-h-[600px] bg-white rounded-[28px] shadow-xl overflow-hidden">
        {/* ================================================= */}
        {/* LEFT SIDE — NOTEBOOK IMAGE */}
        {/* ================================================= */}
        <div className="hidden md:flex md:w-2/5 relative overflow-hidden">
          {/* Background Image */}
          <img
            src={loginNotesImage}
            alt="Person writing notes in a notebook"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-indigo-950/30" />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-indigo-950/20 to-transparent" />

          {/* Left Side Content */}
          <div className="relative z-10 mt-auto p-8 text-white">
            {/* Logo Icon */}
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center mb-5">
              <NotebookPen size={21} className="text-white" />
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold leading-tight">
              Capture your ideas.
            </h3>

            <p className="mt-3 text-sm lg:text-base text-white/85 leading-relaxed max-w-xs">
              Write down your thoughts, organize your ideas, and keep
              everything in one beautiful place.
            </p>

            {/* Small Decorative Line */}
            <div className="mt-6 flex items-center gap-2">
              <div className="w-8 h-1 rounded-full bg-white" />
              <div className="w-2 h-1 rounded-full bg-white/50" />
              <div className="w-2 h-1 rounded-full bg-white/30" />
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE — LOGIN FORM */}
        {/* ================================================= */}
        <div className="w-full md:w-3/5 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
              <NotebookPen size={18} className="text-white" />
            </div>

            <span className="text-lg font-bold text-slate-900">
              NoteFlow
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Welcome Back 👋
          </h2>

          <p className="text-slate-500 mt-2 mb-7">
            Sign in to continue to your notes
          </p>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />

                <span className="text-sm text-slate-600">
                  Remember me
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Sign In
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Sign Up */}
          <p className="text-center mt-7 text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;