import React from "react";
import { Calendar1Icon, ClockIcon } from "lucide-react";

const AttendenceStats = ({ history }) => {
  const totalPresent = history.filter(
    (h) => (h.status === "PRESENT") | (h.status === "LATE"),
  ).length;

  const totalLate = history.filter((h) => h.status === "LATE").length;

  const stats = [
    { label: "Days Present", value: totalPresent, icon: Calendar1Icon },
    { label: "Days Late", value: totalLate, icon: ClockIcon },
    { label: "Avg.Work Hours", value: "8.5 Hrs", icon: ClockIcon },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="card  card-hover p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group "
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-cyan-500/70" />
          <div>
            <stat.icon className="w-8 h-8  p-2 rounded-lg bg-cyan-200 text-slate-700 group-hover:text-cyan-600 transition-colors duration-200" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-tracking-light">
              {stat.value}
            </h3>
            <p className="text-slate-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendenceStats;
