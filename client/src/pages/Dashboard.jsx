import React, { useEffect, useState } from "react";
import { dummyEmployeeDashboardData } from "../assets/assets";
import Loading from "../components/Loading";
import EmployeeDashboard from "../components/EmployeeDashboard";

const Dashboard = () => {
  const [data] = useState(dummyEmployeeDashboardData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;
  if (!data) {
    return <p className="text-center py-12 text-slate-400">Failed Load Data</p>;
  }
  if (data.role === "ADMIN") {
    return <div>admin Dashboard</div>;
  } else {
    return <EmployeeDashboard data={data} />;
  }
};

export default Dashboard;
