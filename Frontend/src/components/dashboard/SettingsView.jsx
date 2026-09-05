import { useEffect, useMemo, useRef, useState } from "react";
import { Moon, SunMedium, ShieldCheck, ArrowRight, Camera, Trash2, Loader2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth.js";
import useTheme from "../../hooks/useTheme.js";
import ChangePasswordModal from "./ChangePasswordModal.jsx";
import ConfirmModal from "../common/ConfirmModal.jsx";
import { compressAndCropAvatar } from "../../utils/imageUtils.js";

const languageOptions = [{ value: "en", label: "English" }];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // Up to 15MB raw input photos supported (compressed on client)
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const SettingsView = ({ onLogout, onDeleteAccount }) => {
  const { user, updateProfile, changePassword } = useAuth();
  const { isDark, setTheme } = useTheme();
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
  const [compressedData, setCompressedData] = useState(null);
  const [compressionStats, setCompressionStats] = useState(null);

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

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Invalid file type. Please select a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 15MB limit.");
      return;
    }

    const toastId = toast.loading("Optimizing photo...");
    try {
      // Instant client-side center-crop and canvas compression
      const result = await compressAndCropAvatar(file, { maxSize: 384, quality: 0.85 });
      setPreviewUrl(result.base64);
      setCompressedData(result.base64);
      setCompressionStats({
        originalKB: result.originalSizeKB,
        compressedKB: result.sizeKB,
      });
      toast.success(
        `Optimized! Reduced from ${result.originalSizeKB > 1024 ? (result.originalSizeKB / 1024).toFixed(1) + "MB" : result.originalSizeKB + "KB"} to ~${result.sizeKB}KB`,
        { id: toastId }
      );
    } catch (err) {
      toast.error("Failed to process photo. Please try another.", { id: toastId });
    }
  };

  const handleCancelPreview = () => {
    setPreviewUrl(null);
    setCompressedData(null);
    setCompressionStats(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Upload optimized lightweight Base64 string
  const handleSaveAvatar = async () => {
    if (!compressedData) return;

    setUploadingAvatar(true);
    try {
      await updateProfile({
        avatar: compressedData,
      });

      toast.success("Profile picture updated instantly!");
      handleCancelPreview();
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
      <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>
    </div>
  );

  const activeAvatarUrl = previewUrl || user?.avatar;

  return (
    <div className="space-y-6 max-w-4xl">
      <section className="bg-white dark:bg-slate-900/80 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">Profile</p>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Personal Information</h2>
          </div>

          <button
            type="button"
            onClick={handleSaveProfile}
            disabled={savingProfile}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
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
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5 sm:p-6 flex flex-col items-center justify-center text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="relative group">
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-4 border-white dark:border-slate-800 shadow-md bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-3xl sm:text-4xl">
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
                className="absolute bottom-0 right-0 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                title="Upload Photo"
              >
                <Camera size={16} />
              </button>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">Profile Picture</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">JPG, PNG, or WEBP. Automatically optimized for ultra-fast load.</p>

            {compressionStats && (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <Sparkles size={12} className="text-emerald-500" />
                <span>Compressed to {compressionStats.compressedKB} KB</span>
              </div>
            )}

            <div className="mt-4 w-full space-y-2">
              {compressedData ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={handleSaveAvatar}
                    disabled={uploadingAvatar}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {uploadingAvatar ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Photo"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelPreview}
                    disabled={uploadingAvatar}
                    className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
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
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                  >
                    Upload Photo
                  </button>

                  {user?.avatar && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      disabled={uploadingAvatar}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors disabled:opacity-50"
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

      <section className="bg-white dark:bg-slate-900/80 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 sm:p-6 lg:p-8">
        {renderSectionHeader("Appearance", "Choose your preferred theme.")}

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              setForm((prev) => ({ ...prev, darkMode: false }));
              setTheme("light");
            }}
            className={`rounded-2xl sm:rounded-3xl border p-4 sm:p-5 text-left transition-all duration-200 ${
              !isDark
                ? "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 text-slate-900 dark:text-white shadow-sm ring-1 ring-indigo-500"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                <SunMedium size={18} />
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base">Light Mode</p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Bright app layout with a clean background.</p>
              </div>
            </div>
            {!isDark && <span className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">● Active</span>}
          </button>

          <button
            type="button"
            onClick={() => {
              setForm((prev) => ({ ...prev, darkMode: true }));
              setTheme("dark");
            }}
            className={`rounded-2xl sm:rounded-3xl border p-4 sm:p-5 text-left transition-all duration-200 ${
              isDark
                ? "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 text-slate-900 dark:text-white shadow-sm ring-1 ring-indigo-500"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                <Moon size={18} />
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base">Dark Mode</p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Soft contrast for low-light environments.</p>
              </div>
            </div>
            {isDark && <span className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">● Active</span>}
          </button>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900/80 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 sm:p-6 lg:p-8">
        {renderSectionHeader("Language & Region", "Choose your preferred language and timezone.")}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Language</label>
            <select
              value={form.language}
              onChange={(e) => setForm((prev) => ({ ...prev, language: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Time Zone</label>
            <select
              value={form.timezone}
              onChange={(e) => setForm((prev) => ({ ...prev, timezone: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
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

      <section className="bg-white dark:bg-slate-900/80 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 sm:p-6 lg:p-8">
        {renderSectionHeader("Notifications", "Manage your notification preferences.")}

        <div className="space-y-3 sm:space-y-4">
          <label className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3.5 sm:p-4 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/70 transition-colors">
            <input
              type="checkbox"
              checked={form.emailNotification}
              onChange={(e) => setForm((prev) => ({ ...prev, emailNotification: e.target.checked }))}
              className="mt-1 h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <p className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">Email Notifications</p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Receive note and account updates by email.</p>
            </div>
          </label>

          <label className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3.5 sm:p-4 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/70 transition-colors">
            <input
              type="checkbox"
              checked={form.reminderNotification}
              onChange={(e) => setForm((prev) => ({ ...prev, reminderNotification: e.target.checked }))}
              className="mt-1 h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <p className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">Reminder Notifications</p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Get reminders about pinned and upcoming notes.</p>
            </div>
          </label>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900/80 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">Security</p>
            <h3 className="mt-1 text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">Password management</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Update your password to keep your account secure.</p>
          </div>

          <button
            type="button"
            onClick={() => setPasswordModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 shadow-xs"
          >
            <ShieldCheck size={16} />
            Change Password
          </button>
        </div>
      </section>

      <section className="rounded-2xl sm:rounded-3xl border border-red-200 dark:border-red-900/60 bg-red-50/70 dark:bg-red-950/20 p-4 sm:p-6 lg:p-8">
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
          <div className="rounded-2xl bg-red-100 dark:bg-red-900/50 p-2.5 sm:p-3 text-red-600 dark:text-red-400 shrink-0">
            <ArrowRight size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-slate-900 dark:text-white">Danger Zone</p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Permanently delete your account and all associated notes. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onLogout}
            className="flex-1 rounded-xl border border-red-400 dark:border-red-800 bg-white dark:bg-slate-900 px-5 py-3 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors duration-200"
          >
            Logout
          </button>

          <button
            type="button"
            onClick={() => setConfirmDeleteOpen(true)}
            className="flex-1 rounded-xl border border-red-500 bg-red-600 dark:bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors duration-200 shadow-xs"
          >
            Delete Account
          </button>
        </div>

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