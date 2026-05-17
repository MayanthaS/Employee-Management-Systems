import React from "react";

const LoginLeftSide = () => {
  return (
    <div className="hidden md:flex w-1/2 bg-slate-950 relative overflow-hidden border-r border-slate-800">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>
      <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl"></div>
      <div className="relative z-10 flex flex-col items-start justify-center p-12 lg:p-20 w-full h-full">
        <span className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
          Secure Access
        </span>
        <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight tracking-tight">
          Employee <br /> Management System
        </h1>
        <p className="text-slate-300 text-lg max-w-md leading-relaxed">
          Streamline workforce operations, track attendance, manage payroll,
          and keep your team secure.
        </p>
      </div>
    </div>
  );
};

export default LoginLeftSide;
