import { LockIcon, Loader2, X } from "lucide-react";
import React, { useState } from "react";

const ChangePasswordModal = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", Text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="text-lg font-medium text-slate-900 flex items-center gap-2 ">
            <LockIcon className="w- h-5 text-slate-400" />
            Change Paassword
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-800"
          >
            <X className="w-5 h-5 " />
          </button>
        </div>
        <form action="" className="p-6 space-y-5" onSubmit={handleSubmit}>
          {message.Text && (
            <div
              className={`p-3 rounded-xl text-sm flex items-start gap-3 border ${message.type === "success" ? "bg-green-100 text-green-700 border-green-200" : "bg-rose-100 text-rose-700 border-rose-200"}`}
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 shrink-0 ${message.type === "success" ? "bg-green-500" : "bg-rose-500"}`}
              />
              {message.Text}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              className="border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              className="border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex items-center justify-center gap-2 px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center justify-center gap-2 px-4 py-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
