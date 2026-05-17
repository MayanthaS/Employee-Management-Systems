import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { dummyPayslipData } from "../assets/assets";

const PrintPayslip = () => {
  const { id } = useParams();
  const [payslip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPayslip(dummyPayslipData.find((slip) => (slip._id || slip.id) === id));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!payslip) {
    return <div className="text-center text-red-500">Payslip not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white animate-fade-in">
      <div className="text-center border-b border-slate-200 pb-6 mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Payslip
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
            Employee Name
          </p>
          <p className="text-sm text-slate-900">
            {payslip.employee?.firstName} {payslip.employee?.lastName}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
            Position
          </p>
          <p className="text-sm text-slate-900">{payslip.employee?.position}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
            Email
          </p>
          <p className="text-sm text-slate-900">{payslip.employee?.email}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
            Period
          </p>
          <p className="text-sm text-slate-900">
            {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left py-3 px-4 text-xs text-slate-500 uppercase tracking-wider">
                Description
              </th>
              <th className="text-right py-3 px-4 text-xs text-slate-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 text-slate-700">Basic Salary</td>
              <td className="py-3 px-4 text-right font-medium text-slate-900">
                ${payslip.basicSalary.toLocaleString()}
              </td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 text-slate-700">Allowances</td>
              <td className="py-3 px-4 text-right font-medium text-slate-900">
                ${payslip.allowances.toLocaleString()}
              </td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 text-slate-700">Deductions</td>
              <td className="py-3 px-4 text-right font-medium text-red-600">
                -${payslip.deductions.toLocaleString()}
              </td>
            </tr>
            <tr className="border-t border-slate-200 bg-slate-50">
              <td className="py-3 px-4 font-semibold text-slate-900">
                Net Salary
              </td>
              <td className="py-3 px-4 text-right font-bold text-slate-900">
                ${payslip.netSalary.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Print Payslip
        </button>
      </div>
    </div>
  );
};

export default PrintPayslip;
