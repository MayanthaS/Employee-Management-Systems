import { Toaster } from "react-hot-toast";
import LogingLanding from "./pages/LogingLanding";
import { Route } from "react-router-dom";
import { Layout, Settings } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendence from "./pages/Attendence";
import Leave from "./pages/Leave";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LogingLanding />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendence />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
