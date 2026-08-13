import { useEffect, useMemo, useRef, useState } from "react";
import { Moon, SunMedium, ShieldCheck, ArrowRight, Camera, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth.js";
import ChangePasswordModal from "./ChangePasswordModal.jsx";
import ConfirmModal from "../common/ConfirmModal.jsx";

const languageOptions = [{ value: "en", label: "English" }];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 2 MB recommended for Base64 strings
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// Helper function to convert File to Base64 Data URL
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const SettingsView = ({ onLogout, onDeleteAccount }) => {
  const { user, updateProfile, changePassword } = useAuth();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    bio: "",
    darkMode: false,
    language: "en",
    timezone: "",
    emailNotification: false,
    reminderNotification: false,
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const currentTimezone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch {
      return "UTC";
    }
  }, []);

  const timezoneOptions = useMemo(() => {
    const list = [currentTimezone, "UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];
    return Array.from(new Set(list));
  }, [currentTimezone]);

  useEffect(() => {
    if (!user) return;

    setForm({
      fullName: user.fullName || "",
      phone: user.phone || "",
      bio: user.bio || "",
      darkMode: Boolean(user.darkMode),
      language: user.language || "en",
      timezone: user.timezone || currentTimezone,
      emailNotification: Boolean(user.emailNotification),
      reminderNotification: Boolean(user.reminderNotification),
    });
  }, [user, currentTimezone]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Invalid file type. Please select a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 2MB limit.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
  };

  const handleCancelPreview = () => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Convert image file to Base64 string and send as `{ avatar: base64String }`
  const handleSaveAvatar = async () => {
    if (!selectedFile) return;

    setUploadingAvatar(true);
    try {
      const base64Avatar = await convertFileToBase64(selectedFile);

      await updateProfile({
        avatar: base64Avatar,
      });

      toast.success("Profile picture updated successfully");
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload profile picture");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setUploadingAvatar(true);
    try {
      await updateProfile({ avatar: "" });
      handleCancelPreview();
      toast.success("Profile picture removed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove profile picture");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);

    try {
      await updateProfile({
        fullName: form.fullName,
        phone: form.phone,
        bio: form.bio,
        darkMode: form.darkMode,
        language: form.language,
        timezone: form.timezone,
        emailNotification: form.emailNotification,
        reminderNotification: form.reminderNotification,
      });
      toast.success("Profile saved successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async ({ currentPassword, newPassword }) => {
    setChangingPassword(true);

    try {
      await changePassword({ currentPassword, newPassword });
      toast.success("Password changed successfully");
      setPasswordModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  const renderSectionHeader = (title, description) => (
    <div className="mb-4">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </div>
  );

  const activeAvatarUrl = previewUrl || user?.avatar;

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Profile</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">Personal Information</h2>
          </div>

          <button
            type="button"
            onClick={handleSaveProfile}
            disabled={savingProfile}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {savingProfile ? "Saving..." : "Save Profile"}
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm text-slate-500 outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
                rows={4}
                className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all duration-200 resize-none"
                placeholder="Write a short bio"
              />
            </div>
          </div>

          {/* PROFILE PICTURE SECTION */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 flex flex-col items-center justify-center text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="relative group">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-md bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-4xl">
                {activeAvatarUrl ? (
                  <img
                    src={activeAvatarUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{user?.fullName?.charAt(0).toUpperCase() || "U"}</span>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                title="Upload Photo"
              >
                <Camera size={16} />
              </button>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-900">Profile Picture</p>
            <p className="mt-1 text-xs text-slate-500">JPG, PNG, or WEBP up to 10MB.</p>

            <div className="mt-4 w-full space-y-2">
              {selectedFile ? (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSaveAvatar}
                    disabled={uploadingAvatar}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {uploadingAvatar ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Save Photo"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelPreview}
                    disabled={uploadingAvatar}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingAvatar}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50"
                  >
                    Upload Photo
                  </button>

                  {user?.avatar && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      disabled={uploadingAvatar}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={14} />
                      Remove Photo
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        {renderSectionHeader("Appearance", "Choose your preferred theme.")}

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, darkMode: false }))}
            className={`rounded-3xl border p-5 text-left transition-all duration-200 ${!form.darkMode ? "border-indigo-500 bg-indigo-50 text-slate-900" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <SunMedium size={18} className="text-indigo-600" />
              <div>
                <p className="font-semibold">Light Mode</p>
                <p className="text-sm text-slate-500">Bright app layout with a clean background.</p>
              </div>
            </div>
            {!form.darkMode && <span className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700">Active</span>}
          </button>

          <button
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, darkMode: true }))}
            className={`rounded-3xl border p-5 text-left transition-all duration-200 ${form.darkMode ? "border-indigo-500 bg-indigo-50 text-slate-900" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Moon size={18} className="text-indigo-600" />
              <div>
                <p className="font-semibold">Dark Mode</p>
                <p className="text-sm text-slate-500">Soft contrast for low-light environments.</p>
              </div>
            </div>
            {form.darkMode && <span className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700">Active</span>}
          </button>
        </div>
      </section>

      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        {renderSectionHeader("Language", "Choose your preferred language.")}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Language</label>
            <select
              value={form.language}
              onChange={(e) => setForm((prev) => ({ ...prev, language: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Time Zone</label>
            <select
              value={form.timezone}
              onChange={(e) => setForm((prev) => ({ ...prev, timezone: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            >
              {timezoneOptions.map((timezone) => (
                <option key={timezone} value={timezone}>
                  {timezone}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        {renderSectionHeader("Notifications", "Manage your notification preferences.")}

        <div className="space-y-4">
          <label className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 cursor-pointer">
            <input
              type="checkbox"
              checked={form.emailNotification}
              onChange={(e) => setForm((prev) => ({ ...prev, emailNotification: e.target.checked }))}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <p className="font-semibold text-slate-900">Email Notifications</p>
              <p className="text-sm text-slate-500">Receive note and account updates by email.</p>
            </div>
          </label>

          <label className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 cursor-pointer">
            <input
              type="checkbox"
              checked={form.reminderNotification}
              onChange={(e) => setForm((prev) => ({ ...prev, reminderNotification: e.target.checked }))}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <p className="font-semibold text-slate-900">Reminder Notifications</p>
              <p className="text-sm text-slate-500">Get reminders about pinned and upcoming notes.</p>
            </div>
          </label>
        </div>
      </section>

      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Security</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">Password management</h3>
            <p className="text-sm text-slate-500 mt-1">Update your password to keep your account secure.</p>
          </div>

          <button
            type="button"
            onClick={() => setPasswordModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 transition-colors duration-200"
          >
            <ShieldCheck size={16} />
            Change Password
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-3xl bg-red-100 p-3 text-red-600">
            <ArrowRight size={20} />
          </div>
          <div className="flex-1">
            <p className="text-base font-semibold text-slate-900">Danger Zone</p>
            <p className="text-sm text-slate-600 mt-1">
              Permanently delete your account and all associated notes. This action cannot be undone.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="mt-6 w-full rounded-xl border border-red-500 bg-white px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          Logout
        </button>

        <button
          type="button"
          onClick={() => setConfirmDeleteOpen(true)}
          className="mt-4 w-full rounded-xl border border-red-500 bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors duration-200"
        >
          Delete Account
        </button>

        <ConfirmModal
          open={confirmDeleteOpen}
          title="Permanently delete account"
          message="Are you sure you want to permanently delete your account? This will remove all notes and cannot be undone."
          confirmLabel="Delete Permanently"
          cancelLabel="Cancel"
          onConfirm={async () => {
            setConfirmDeleteOpen(false);
            await onDeleteAccount?.();
          }}
          onCancel={() => setConfirmDeleteOpen(false)}
        />
      </section>

      <ChangePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSubmit={handleChangePassword}
        loading={changingPassword}
      />
    </div>
  );
};

export default SettingsView;