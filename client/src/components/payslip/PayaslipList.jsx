import { format } from "date-fns";
import { DownloadIcon } from "lucide-react";
import React from "react";

const PayaslipList = ({ payslips, isAdmin }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-slate-50/70">
            <tr className="border-b border-slate-200">
              {isAdmin && (
                <th className="px-10 py-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Employee
                </th>
              )}
              <th className="px-10 py-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Period
              </th>
              <th className="px-10 py-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Basic Salary
              </th>
              <th className="px-10 py-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Net Salary
              </th>
              <th className="px-10 py-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {payslips.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="px-10 py-16 text-center text-sm text-slate-500"
                >
                  No payslips found.
                </td>
              </tr>
            ) : (
              payslips.map((payslip) => {
                const payslipId = payslip._id || payslip.id;

                return (
                  <tr
                    key={payslipId}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50/60 last:border-b-0"
                  >
                    {isAdmin && (
                      <td className="px-10 py-5 text-[15px] font-medium text-slate-800">
                        {payslip.employee?.firstName}{" "}
                        {payslip.employee?.lastName}
                      </td>
                    )}
                    <td className="px-10 py-5 text-[15px] text-slate-500">
                      {format(
                        new Date(payslip.year, payslip.month - 1),
                        "MMMM yyyy",
                      )}
                    </td>
                    <td className="px-10 py-5 text-[15px] text-slate-500">
                      ${payslip.basicSalary.toLocaleString()}
                    </td>
                    <td className="px-10 py-5 text-[15px] font-semibold text-slate-800">
                      ${payslip.netSalary.toLocaleString()}
                    </td>
                    <td className="px-10 py-5 text-center text-slate-600">
                      <button
                        type="button"
                        onClick={() =>
                          window.open(
                            `/print/payslips/${payslip._id || payslip.id}`,
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                      >
                        <DownloadIcon className="h-4 w-4" />
                        Download
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayaslipList;
