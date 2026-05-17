import React from "react";
import { getDayTypeDisplay, getWorkingHoursDisplay } from "../../assets/assets";
import { format } from "date-fns";

const statusClassMap = {
  PRESENT: "badge-success",
  LATE: "badge-warning",
  ABSENT: "badge-danger",
};

const AttendenceHistory = ({ history = [] }) => {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-slate-100 px-6 py-4">
        <h3 className="text-base font-semibold text-slate-900">
          Recent Activity
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="table-modern min-w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Working Hours</th>
              <th>Day Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-16 text-center text-slate-500">
                  No attendance history found.
                </td>
              </tr>
            ) : (
              history.map((record) => {
                const dayType = getDayTypeDisplay(record);

                return (
                  <tr key={record._id || record.id}>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {format(new Date(record.date), "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {record.checkIn
                        ? format(new Date(record.checkIn), "h:mm a")
                        : "--"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {record.checkOut
                        ? format(new Date(record.checkOut), "h:mm a")
                        : "--"}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium ">
                      {getWorkingHoursDisplay(record)}
                    </td>
                    <td>
                      {dayType.label !== "-" ? (
                        <span className={`badge ${dayType.className}`}>
                          {dayType.label}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`badge ${record.status === "PRESENT" ? "badge-success" : record.status === "LATE" ? "badge-warning" : "bg-slate-100 text-slate-600"}`}
                      >
                        {record.status || "--"}
                      </span>
                    </td>
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

export default AttendenceHistory;
