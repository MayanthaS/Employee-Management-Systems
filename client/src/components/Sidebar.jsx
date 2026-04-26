import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { dummyProfileData } from "../assets/assets";
import {
  Calendar1Icon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname || "";
  const [mobileOpen, setMobileOpen] = useState(false);
  const userName = `${dummyProfileData.firstName} ${dummyProfileData.lastName}`;

  const role = "" || "EMPLOYEE";

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },
    role === "ADMIN"
      ? { name: "Employees", href: "/employees", icon: UserIcon }
      : { name: "Attendance", href: "/attendance", icon: Calendar1Icon },
    { name: "Leave", href: "/leave", icon: FileTextIcon },
    { name: "Payslips", href: "/payslips", icon: DollarSignIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];
  // click log logut after go to login page
  const handelLogOut = () => {
    window.location.href = "/login";
  };
  const sidebarContent = (
    <>
      {/*Brand Header */}
      <div className="border-b border-white/10 bg-white/5 px-5 pt-6 pb-5 backdrop-blur-xl">
        <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-200">
          Secure Panel
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-2 shadow-lg shadow-black/20">
              <UserIcon className="size-7 text-cyan-200" />
            </div>
            <div>
              <p className="font-semibold text-[13px] text-white tracking-wide">
                Employee MS
              </p>
              <p className="text-[12px] font-medium text-slate-400">
                Management System
              </p>
            </div>
          </div>
          {/*Close menu */}
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg border border-white/10 bg-white/5 p-1 text-slate-400 transition-colors hover:text-white lg:hidden"
          >
            <XIcon size={20} />
          </button>
        </div>
      </div>
      {/**User Profile card */}
      {userName && (
        <div className="mx-3 mt-4 mb-1 rounded-2xl border border-white/10 bg-white/5 p-3 shadow-lg shadow-black/10 backdrop-blur-xl">
          <div className="flex items-center gap-3 ">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 ring-1 ring-white/10">
              <span className="text-xs font-semibold text-cyan-100">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium text-slate-100">
                {userName}
              </p>
              <p className="truncate text-[10px] font-medium text-slate-400">
                {role === "ADMIN" ? "Administrator" : "Employee"}
              </p>
            </div>
          </div>
        </div>
      )}
      {/**Section label */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          Navigation
        </p>
      </div>
      {/*Navigation lists */}
      <div className="flex-1 px-4 py-2 space-y-2.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentPath.startsWith(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-white/5 ${isActive ? "border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-white shadow-lg shadow-cyan-500/10" : "border border-transparent text-slate-300 hover:border-white/10 hover:text-white"}`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-cyan-400" />
              )}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                  isActive
                    ? "border-cyan-400/20 bg-cyan-400/10"
                    : "border-white/5 bg-white/5 group-hover:border-cyan-400/20 group-hover:bg-cyan-400/10"
                }`}
              >
                <item.icon
                  className={`h-4 w-4 shrink-0 ${
                    isActive
                      ? "text-cyan-200"
                      : "text-slate-400 group-hover:text-cyan-100"
                  }`}
                />
              </div>
              <span className="flex-1">{item.name}</span>
              {isActive && (
                <ChevronRightIcon className="h-4 w-4 text-cyan-100" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Logout*/}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={handelLogOut}
          className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-3 py-2 text-[13px] font-medium text-slate-400 transition-all duration-200 hover:border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-200"
        >
          <LogOutIcon className="w-[17px] h-[17px]" />
          <span className="">Log out</span>
        </button>
      </div>
    </>
  );
  return (
    <div>
      {/*Mobile Hamburger Icon */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 rounded-lg border border-white/10 bg-slate-950/90 p-2 text-white shadow-lg shadow-black/20 backdrop-blur"
      >
        <MenuIcon size={20} />
      </button>
      {/**Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/**Side bar -Desktop */}
      <aside className="hidden lg:flex flex-col h-full w-[260px] border-r border-white/10 bg-slate-950 text-white shadow-2xl shadow-black/20">
        {sidebarContent}
      </aside>
      {/**Sidebar -Mobile */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 flex w-72 flex-col transform border-r border-white/10 bg-slate-950 text-white shadow-2xl shadow-black/30 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebarContent}
      </aside>
    </div>
  );
};

export default Sidebar;
