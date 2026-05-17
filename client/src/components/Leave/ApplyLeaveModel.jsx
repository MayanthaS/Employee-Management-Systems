import React, { useState } from "react";
import { CalendarDays, FileText, Loader2, Send, X } from "lucide-react";

const ApplyLeaveModel = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handelSubmit = async (e) => {
    e.preventDefault();
  };
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop:blur-sm "
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl  shadow-2xl w-full max-w-lg animate-fade-in "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 p-6 pb-0 ">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 ">
              Apply for Leave
            </h2>
            <p className="text-slate-600  mt-0.5">
              Fill out the form below to submit your leave application.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* form */}
        <form onSubmit={handelSubmit} className="p-6 space-y-5">
          {/* Form fields would go here */}
          {/* leave type */}
          <div>
            <label className="flex items-center gap-2 tex-sm font-medium text-slaye-700 mb-2">
              <FileText className="w-4 h-4 text-slate-500 " />
              Leave Type
            </label>
            <select
              name="type"
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              required
            >
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="ANNUAL">Annual Leave</option>
            </select>
          </div>
          {/* duration */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slaye-700 mb-2">
              <CalendarDays className="w-4 h-4 text-slate-500 " />
              Duration
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs text-slate-400 mb-1 ">Form</span>
                <input type="date" name="startDate" min={minDate} required />
              </div>
              <div>
                <span className="block text-xs text-slate-400 mb-1 ">To</span>
                <input type="date" name="endDate" min={minDate} required />
              </div>
            </div>
          </div>
          {/* reason */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <FileText className="w-4 h-4 text-slate-500 " />
              Reason
            </label>
            <textarea
              name="reason"
              rows={3}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              required
              placeholder="Briefly describe why you need this leave...?"
            />
          </div>
          {/* button */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="btn-secondary flex-1 flex items-center justify-center gap-2  px-4 py-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2  px-4 py-2"
              disabled={loading}
              onClick={onSuccess}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveModel;
