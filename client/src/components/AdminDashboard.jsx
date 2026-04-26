import {
  Building2Icon,
  Calendar1Icon,
  FileTextIcon,
  UserIcon,
} from "lucide-react";
import React from "react";

const AdminDashboard = ({ data }) => {
  const stats = [
    {
      icon: UserIcon,
      value: data.totalEmployees,
      label: "Total Employees",
      subtitles: "Active worokforce",
    },
    {
      icon: Building2Icon,
      value: data.totalDepartments,
      label: "Departments",
      subtitles: "Organization units",
    },
    {
      icon: Calendar1Icon,
      value: data.totalAttendence,
      label: "Today's Attendence",
      subtitles: "Cheked in today",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      label: "Pending Leaves",
      subtitles: "Awaiating approval",
    },
  ];
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back, Admin - here's your overview
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 ">
        {stats.map((stats) => (
          <div
            key={stats.label}
            className="card card-hover p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between"
          >
            <div>
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-cyan-500/70 group-hover:bg-cyan-500/70 " />
              <p className="text-sm font-medium text-slate-700">
                {stats.label}
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {stats.value}
              </p>
            </div>
            <stats.icon className="size-10 p-2 rounded-lg bg-cyan-200 text-slate-700 group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-colors duration-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
