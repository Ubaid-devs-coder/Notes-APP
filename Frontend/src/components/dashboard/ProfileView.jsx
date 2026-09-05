import { useEffect, useState, useMemo, useRef } from "react";
import { User, ShieldCheck, Settings, Pin, Archive, Trash2, Camera, Loader2, Sparkles, Upload } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth.js";
import useNotes from "../../hooks/useNotes.js";
import StatCard from "./StatCard.jsx";
import ChangePasswordModal from "./ChangePasswordModal.jsx";
import { compressAndCropAvatar } from "../../utils/imageUtils.js";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 15 * 1024 * 1024;

const ProfileView = ({ onLogout, onChangeView }) => {
  const { user, updateProfile, changePassword } = useAuth();
  const { stats } = useNotes();
  const fileInputRef = useRef(null);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", bio: "" });
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (!user) return;

    setForm({
      fullName: user.fullName || "",
      phone: user.phone || "",
      bio: user.bio || "",
    });
  }, [user]);

  const joinedDate = useMemo(() => {
    if (!user?.createdAt) return "Unknown";
    return new Date(user.createdAt).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [user]);

  const lastUpdated = useMemo(() => {
    if (!user?.updatedAt) return "Unknown";
    return new Date(user.updatedAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [user]);

  const handleSaveChanges = async () => {
    setSaving(true);

    try {
      await updateProfile({
        fullName: form.fullName,
        phone: form.phone,
        bio: form.bio,
      });
      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save profile");
    } finally {
      setSaving(false);
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

  const handleAvatarSelect = async (e) => {
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

    setUploadingAvatar(true);
    const toastId = toast.loading("Optimizing and saving photo...");

    try {
      const result = await compressAndCropAvatar(file, { maxSize: 384, quality: 0.85 });
      await updateProfile({ avatar: result.base64 });
      toast.success("Profile photo updated instantly!", { id: toastId });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile photo", { id: toastId });
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveAvatar = async () => {
    setUploadingAvatar(true);
    try {
      await updateProfile({ avatar: "" });
      toast.success("Profile photo removed");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove profile photo");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const profileAvatar =
    user?.avatar ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      user?.fullName || "User"
    )}`;

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleAvatarSelect}
        className="hidden"
      />

      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <img
                src={profileAvatar}
                alt="Profile avatar"
                className="h-28 w-28 rounded-3xl border border-slate-200 object-cover shadow-sm"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                title="Change Photo"
              >
                {uploadingAvatar ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
              </button>
            </div>

            <div>
              <p className="text-sm text-slate-500">👤 Profile</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">{user?.fullName || "Your Name"}</h1>
              <p className="mt-2 text-sm text-slate-500 max-w-xl">{user?.bio || "Your profile summary will appear here once you add a bio."}</p>
              <p className="mt-4 text-sm font-medium text-slate-600">Joined {joinedDate}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors duration-200"
            >
              <Settings size={16} />
              Edit Profile
            </button>

            <button
              type="button"
              onClick={() => setPasswordModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors duration-200"
            >
              <ShieldCheck size={16} />
              Change Password
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.85fr]">
        <div className="space-y-6">
          <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Personal Information</p>
                <p className="text-sm text-slate-500 mt-1">View and update your profile details.</p>
              </div>
              <button
                type="button"
                onClick={() => setEditMode((prev) => !prev)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  readOnly={!editMode}
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 outline-none shadow-sm transition-all duration-200 ${
                    editMode ? "border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white" : "border-slate-200 bg-slate-100"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  readOnly={!editMode}
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 outline-none shadow-sm transition-all duration-200 ${
                    editMode ? "border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white" : "border-slate-200 bg-slate-100"
                  }`}
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
                  readOnly={!editMode}
                  rows={4}
                  className={`w-full rounded-3xl border px-4 py-3 text-sm text-slate-900 outline-none shadow-sm transition-all duration-200 resize-none ${
                    editMode ? "border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white" : "border-slate-200 bg-slate-100"
                  }`}
                />
              </div>
            </div>

            {editMode && (
              <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={saving}
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Account Information</p>
                <p className="text-sm text-slate-500 mt-1">Core details about your account.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-700">User ID</p>
                <p className="mt-3 break-all text-sm text-slate-900">{user?._id || "-"}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-700">Account Status</p>
                <p className="mt-3 text-sm text-emerald-600 font-semibold">Active</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-700">Email Verified</p>
                <p className="mt-3 text-sm text-slate-900">{user?.email ? "Yes" : "No"}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-700">Last Updated</p>
                <p className="mt-3 text-sm text-slate-900">{lastUpdated}</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Preferences</p>
                <p className="text-sm text-slate-500 mt-1">Your saved app preferences.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-700">Language</p>
                <p className="mt-3 text-sm text-slate-900">{user?.language || "English"}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-700">Time Zone</p>
                <p className="mt-3 text-sm text-slate-900">{user?.timezone || "UTC"}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-700">Dark Mode</p>
                <p className="mt-3 text-sm text-slate-900">{user?.darkMode ? "Enabled" : "Disabled"}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-700">Email Notifications</p>
                <p className="mt-3 text-sm text-slate-900">{user?.emailNotification ? "On" : "Off"}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:col-span-2">
                <p className="text-sm font-semibold text-slate-700">Reminder Notifications</p>
                <p className="mt-3 text-sm text-slate-900">{user?.reminderNotification ? "On" : "Off"}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Profile Picture</p>
                <p className="text-sm text-slate-500 mt-1">Upload a personalized avatar optimized for ultra-fast load.</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <img
                  src={profileAvatar}
                  alt="Profile avatar"
                  className="h-20 w-20 rounded-2xl border border-slate-200 object-cover shadow-sm"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {user?.avatar ? "Custom Photo" : "Default Avatar"}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Auto-compressed to ~30KB for lightning-fast sync.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50"
                >
                  {uploadingAvatar ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Upload Photo
                    </>
                  )}
                </button>

                {user?.avatar && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    disabled={uploadingAvatar}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors duration-200 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <div>
              <p className="text-sm font-semibold text-slate-900">Statistics</p>
              <p className="text-sm text-slate-500 mt-1">Quick view of your note activity.</p>
            </div>

            <div className="mt-6 grid gap-4">
              <StatCard
                title="Total Notes"
                value={stats.totalNotes}
                icon={User}
                iconColor="text-indigo-600"
                iconBg="bg-indigo-50"
                onClick={() => onChangeView("all")}
              />
              <StatCard
                title="Pinned Notes"
                value={stats.pinnedNotes}
                icon={Pin}
                iconColor="text-amber-600"
                iconBg="bg-amber-50"
                onClick={() => onChangeView("pinned")}
              />
              <StatCard
                title="Archived Notes"
                value={stats.archivedNotes}
                icon={Archive}
                iconColor="text-emerald-600"
                iconBg="bg-emerald-50"
                onClick={() => onChangeView("archived")}
              />
              <StatCard
                title="Trash Notes"
                value={stats.trashedNotes}
                icon={Trash2}
                iconColor="text-red-600"
                iconBg="bg-red-50"
                onClick={() => onChangeView("trash")}
              />
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <div>
              <p className="text-sm font-semibold text-slate-900">Quick Actions</p>
              <p className="text-sm text-slate-500 mt-1">Jump to any dashboard section instantly.</p>
            </div>

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={() => onChangeView("all")}
                className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                Go to All Notes
              </button>
              <button
                type="button"
                onClick={() => onChangeView("pinned")}
                className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                Go to Pinned Notes
              </button>
              <button
                type="button"
                onClick={() => onChangeView("archived")}
                className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                Go to Archived
              </button>
              <button
                type="button"
                onClick={() => onChangeView("trash")}
                className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                Go to Trash
              </button>
              <button
                type="button"
                onClick={() => onChangeView("settings")}
                className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors duration-200"
              >
                Settings
              </button>
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <div>
              <p className="text-sm font-semibold text-slate-900">Security</p>
              <p className="text-sm text-slate-500 mt-1">Manage your account access safely.</p>
            </div>

            <button
              type="button"
              onClick={() => setPasswordModalOpen(true)}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors duration-200"
            >
              <ShieldCheck size={16} />
              Change Password
            </button>
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Logout</p>
                <p className="text-sm text-slate-500 mt-1">End your session securely.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="mt-6 w-full rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </section>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSubmit={handleChangePassword}
        loading={changingPassword}
      />
    </div>
  );
};

export default ProfileView;
