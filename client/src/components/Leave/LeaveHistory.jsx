import { format } from "date-fns";
import { Check, Loader2Icon, X } from "lucide-react";
import React, { useState } from "react";

const getStatusClassName = (status) => {
  switch (status) {
    case "APPROVED":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
    case "REJECTED":
      return "bg-rose-50 text-rose-700 ring-1 ring-rose-100";
    default:
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-100";
  }
};

const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null);

  const columnClassNames = isAdmin
    ? {
        employee: "w-[16%] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500",
        type: "w-[13%] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500",
        dates: "w-[20%] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500",
        reason: "w-[22%] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500",
        status: "w-[14%] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500",
        actions:
          "w-[15%] px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500",
      }
    : {
        type: "w-[18%] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500",
        dates: "w-[28%] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500",
        reason: "w-[34%] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500",
        status: "w-[20%] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500",
      };

  const handleStatusUpdate = async (id, status) => {
    setProcessing(id);
    try {
      await onUpdate?.(id, status);
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="w-full overflow-hidden">
        <table className="w-full table-fixed text-left">
          <thead className="bg-slate-50/80">
            <tr className="border-b border-slate-200">
              {isAdmin && (
                <th className={columnClassNames.employee}>Employee</th>
              )}
              <th className={columnClassNames.type}>
                Type
              </th>
              <th className={columnClassNames.dates}>
                Dates
              </th>
              <th className={columnClassNames.reason}>
                Reason
              </th>
              <th className={columnClassNames.status}>
                Status
              </th>
              {isAdmin && (
                <th className={columnClassNames.actions}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 4}
                  className="px-6 py-16 text-center text-sm text-slate-500"
                >
                  No leave history found.
                </td>
              </tr>
            ) : (
              leaves.map((leave) => {
                const leaveId = leave._id || leave.id;

                return (
                  <tr key={leaveId} className="border-b border-slate-100 last:border-b-0">
                    {isAdmin && (
                      <td className="px-6 py-5 text-sm font-medium text-slate-700">
                        {leave.employee?.firstName} {leave.employee?.lastName}
                      </td>
                    )}
                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-md bg-slate-100 px-3 py-1 text-xs font-medium uppercase text-slate-600">
                        {leave.type}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500 whitespace-nowrap">
                      {format(new Date(leave.startDate), "MMM dd")} -{" "}
                      {format(new Date(leave.endDate), "MMM dd, yyyy")}
                    </td>
                    <td
                      className="px-6 py-5 text-sm text-slate-600"
                      title={leave.reason}
                    >
                      {leave.reason}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold uppercase ${getStatusClassName(leave.status)}`}>
                        {leave.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-5">
                        {leave.status === "PENDING" && (
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() =>
                                handleStatusUpdate(leaveId, "APPROVED")
                              }
                              disabled={!!processing}
                              className="rounded-md bg-emerald-50 p-2 text-emerald-600 transition-colors hover:bg-emerald-100"
                            >
                              {processing === leaveId ? (
                                <Loader2Icon className="h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(leaveId, "REJECTED")
                              }
                              disabled={!!processing}
                              className="rounded-md bg-rose-50 p-2 text-rose-600 transition-colors hover:bg-rose-100"
                            >
                              {processing === leaveId ? (
                                <Loader2Icon className="h-4 w-4 animate-spin" />
                              ) : (
                                <X className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
