import { is } from "date-fns/locale";
import { Loader, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { X } from "lucide-react";

const GenratePayslipsForm = ({ employees, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center gap-2 "
      >
        <PlusIcon className="w-4 h-4" /> Generate Payslip
      </button>
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 ">
      <div className="card max-w-lg w-full p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            Generate Monthly Payslip
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-=slate-400 hover:text-slate-600 p-1"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* select employee */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Employee
            </label>
            <select name="employeeId" required>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName} ({emp.position})
                </option>
              ))}
            </select>
          </div>

          {/* month and year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Month
              </label>
              <select name="month">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Year
              </label>
              <input
                type="number"
                name="year"
                required
                defaultValue={new Date().getFullYear()}
              />
            </div>
          </div>

          {/* basic salary */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              required
              placeholder="50000"
            />
          </div>
          {/* ALLOWANCE AND DEDUCTION */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Allowance
              </label>
              <input type="number" name="allowance" required defaultValue={0} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Deduction
              </label>
              <input type="number" name="deduction" required defaultValue={0} />
            </div>
          </div>
          {/* buttons */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center"
            >
              {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenratePayslipsForm;
