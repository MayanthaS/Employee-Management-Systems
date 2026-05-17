import React, { useState } from "react";
import { Loader2Icon, LogInIcon, LogOutIcon } from "lucide-react";

const CheckingButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
    setLoading(true);
    setTimeout(() => {
      onAction?.();
      setLoading(false);
    }, 1000);
  };

  if (todayRecord?.checkOut) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200 ">
        <h3 className="text-lg font-bold text-slate-900">Work Day Completed</h3>
        <p className="text-slate-500 text-sm mt-1">
          Great Job! See You Tomorrow
        </p>
      </div>
    );
  }
  const isCheckedIn = Boolean(todayRecord?.checkIn);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={handleAttendance}
        disabled={loading}
        className={`w-full max-w-xs flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-60 ${isCheckedIn ? "from-slate-700 to-rose-500/70 bg-gradient-to-r text-white" : "text-slate-700"}`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
          {loading ? (
            <Loader2Icon className="size-7 animate-spin" />
          ) : isCheckedIn ? (
            <LogOutIcon className="size-7 text-rose-500" />
          ) : (
            <LogInIcon className="size-7 text-green-500" />
          )}
        </div>
        <div>
          <h2>
            {loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}
          </h2>
          <p className="text-sm text-slate-500">
            {isCheckedIn
              ? "Click to end your shift"
              : "Click to start your shift"}
          </p>
        </div>
      </button>
    </div>
  );
};

export default CheckingButton;
