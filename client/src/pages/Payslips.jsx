import React, { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";
import PayaslipList from "../components/payslip/PayaslipList";
import GeneratePayslipsForm from "../components/payslip/GenratePayslipsForm";

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = true; // Change this to false to test employee view

  const fetchPayslips = useCallback(() => {
    setPayslips(dummyPayslipData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);
  useEffect(() => {
    if (isAdmin) setEmployee(dummyEmployeeData);
  }, [isAdmin]);
  if (loading) return <Loading />;
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Generate and manage employee payslips"
              : "View your payslips"}
          </p>
        </div>
        {isAdmin && (
          <GeneratePayslipsForm
            employees={employee}
            onSuccess={fetchPayslips}
          />
        )}
      </div>
      <PayaslipList payslips={payslips} isAdmin={isAdmin} />
    </div>
  );
};

export default Payslips;
