import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  NotebookPen,
  ArrowRight,
} from "lucide-react";

import notesRegisterImage from "../../assets/register-ui.jpg";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
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
  // Handle Registration
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check passwords
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Account created successfully!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-3.5 sm:p-6">

      {/* =====================================================
          MAIN CARD
      ====================================================== */}
      <div className="flex w-full max-w-4xl bg-white rounded-2xl sm:rounded-[28px] shadow-xl overflow-hidden">

        {/* =====================================================
            LEFT SIDE — NOTEBOOK IMAGE
        ====================================================== */}
        <div className="hidden md:block md:w-2/5 relative overflow-hidden bg-indigo-100">

          {/* Main Image */}
          <img
            src={notesRegisterImage}
            alt="Person writing notes in a notebook"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/75 via-indigo-900/20 to-transparent" />

          {/* Logo */}
          <div className="absolute top-8 left-8 flex items-center gap-2 z-10">
            <div className="w-9 h-9 rounded-xl bg-white/95 flex items-center justify-center shadow-lg">
              <NotebookPen
                size={18}
                className="text-indigo-600"
              />
            </div>

            <span className="text-lg font-bold text-white drop-shadow-md">
              NoteFlow
            </span>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-8 left-8 right-8 z-10 text-white">

            <div className="w-10 h-1 rounded-full bg-white/80 mb-4" />

            <h3 className="text-2xl font-bold leading-tight">
              Capture your ideas.
              <br />
              Organize your thoughts.
            </h3>

            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              Create beautiful notes and keep everything you need
              in one simple place.
            </p>

          </div>
        </div>


        {/* =====================================================
            RIGHT SIDE — REGISTER
        ====================================================== */}
        <div className="w-full md:w-3/5 p-5 sm:p-8 lg:p-10 flex flex-col">

          {/* =====================================================
              NOTE FLOW LOGO
          ====================================================== */}
          <div className="flex items-center gap-2 mb-6">

            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <NotebookPen
                size={16}
                className="text-white"
              />
            </div>

            <span className="text-lg font-bold text-slate-900">
              NoteFlow
            </span>

          </div>


          {/* =====================================================
              HEADING
          ====================================================== */}
          <div className="mb-6">

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Create your account ✨
            </h2>

            <p className="text-slate-500 mt-2">
              Start organizing your thoughts with NoteFlow.
            </p>

          </div>


          {/* =====================================================
              REGISTER FORM
          ====================================================== */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* ================= FULL NAME ================= */}
            <div>

              <label className="block mb-2 text-sm font-medium text-slate-700">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                />

              </div>

            </div>


            {/* ================= EMAIL ================= */}
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                />

              </div>

            </div>


            {/* ================= PASSWORD ================= */}
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            {/* ================= CONFIRM PASSWORD ================= */}
            <div>

              <label className="block mb-2 text-sm font-medium text-slate-700">
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            {/* =====================================================
                TERMS
            ====================================================== */}
            <label className="flex items-start gap-2 pt-1 cursor-pointer select-none">

              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="w-4 h-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />

              <span className="text-sm text-slate-600 leading-5">
                I agree to the{" "}
                <span className="text-indigo-600 font-medium hover:underline cursor-pointer">
                  Terms & Privacy Policy
                </span>
              </span>

            </label>


            {/* =====================================================
                CREATE ACCOUNT BUTTON
            ====================================================== */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300"
            >

              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  Create Account
                  <ArrowRight size={17} />
                </>
              )}

            </button>

          </form>


          {/* =====================================================
              LOGIN LINK
          ====================================================== */}
          <p className="text-center mt-5 text-sm text-slate-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;