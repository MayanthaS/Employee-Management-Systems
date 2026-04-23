import React from "react";
import LoginLeftSide from "../components/LoginLeftSide";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LogingLanding = () => {
  const portalOptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <LoginLeftSide />

      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 overflow-y-auto min-h-screen">
        <div className="w-full max-w-lg animate-fade-in relative z-10">
          <div className="mb-10">
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 mb-3">
              Welcome Back
            </h2>
            <p className="text-base sm:text-lg text-slate-500">
              Select your portal to securely access the system.
            </p>
          </div>

          <div className="space-y-4">
            {portalOptions.map((portal) => (
              <Link
                key={portal.to}
                to={portal.to}
                className="group block rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg sm:text-xl font-medium text-slate-800 transition-colors group-hover:text-slate-950">
                    {portal.title}
                  </h3>
                  <ArrowRight className="h-5 w-5 text-slate-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-slate-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogingLanding;
