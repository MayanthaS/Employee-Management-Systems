import { Loader2, Save, User } from "lucide-react";
import React, { useState } from "react";

const ProfileForm = ({ initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="card p-5 sm:p-6 mb-6">
      {/* Form fields would go here */}
      <h2 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100 flex items-center gap-2">
        <User className="w-5 h-5 text-slate-500" /> Personal Information
      </h2>
      {error && (
        <div className="bg-rose-100 text-rose-700 p-4 rounded-xl text-sm border border-rose-200 mb-6 flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-rose-600 mt-2 shrnk-0">
            {error}
          </div>
        </div>
      )}
      {message && (
        <div className="bg-emerald-100 text-emerald-700 p-4 rounded-xl text-sm border border-emerald-200 mb-6 flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 shrnk-0">
            {message}
          </div>
        </div>
      )}
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Name
            </label>
            <input
              disabled
              value={`${initialData.firstName} ${initialData.lastName}`}
              className="bg-slate-100 text-slate-400 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Email
            </label>
            <input
              disabled
              value={initialData.email}
              className="bg-slate-100 text-slate-400 cursor-not-allowed"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Position
            </label>
            <input
              disabled
              value={initialData.position}
              className="bg-slate-100 text-slate-900 cursor-not-allowed"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-800 mb-2">
            Bio
          </label>
          <textarea
            disabled={initialData.isDeleted}
            value={initialData.bio}
            name="bio"
            defaultValue={initialData.bio || ""}
            id=""
            placeholder="Write a brief bio about yourself"
            className={`resize-none ${initialData.isDeleted ? " text-slate-400 cursor-not-allowe" : ""}`}
          />
          <p className="text-xs text-slate-400 mt-2">
            This Will be displayed on your profile
          </p>
        </div>
        {initialData.isDeleted ? (
          <div className="pt-2">
            <div className="p-4 bg-rose-100 border border-rose-300  rounded-xl text-center ">
              <p className="text-rose-600 font-mediumtracking-tight">
                Account Deactivated
              </p>
              <p className="text-sm text-rose-500 mt-1">
                You will not be able to access your account until it is
                reactivated.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-end pt-2">
            <button
              type="submit "
              disabled={loading}
              className="btn-primary flex items-center gap-2 justify-center w-full sm:w-auto"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin " />
              ) : (
                <Save className="w-4 h-4" />
              )}{" "}
              Save Changes
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
