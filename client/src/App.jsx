import { Toaster } from "react-hot-toast";
import { Routes } from "react-router-dom";
import LogingLanding from "./pages/LogingLanding";
import LoginForm from "./components/LoginForm";
import { Navigate, Route } from "react-router-dom";
// import { Settings } from "lucide-react";
import Settings from "./pages/Settings";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendence from "./pages/Attendence";
import Payslips from "./pages/Payslips";
import Leave from "./pages/Leave";
import PrintPayslip from "./pages/PrintPayslip";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LogingLanding />} />

        <Route path="/login/admin" element={<LoginForm />} />
        <Route path="/login/employee" element={<LoginForm />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendence />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payslips" element={<Payslips />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/print/payslips/:id" element={<PrintPayslip />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default App;
