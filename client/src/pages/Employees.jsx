import React, { useCallback, useEffect, useMemo, useState } from "react";
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";
import { Plus, Search } from "lucide-react";
import EmployeeCard from "../components/EmployeeCard";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setEmployees(dummyEmployeeData);
  }, []);

  useEffect(() => {
    fetchEmployees();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [fetchEmployees]);

  const filteredEmployees = useMemo(() => {
    const query = search.toLowerCase();

    return employees.filter((emp) => {
      const matchesSearch = `${emp.firstName} ${emp.lastName} ${emp.position}`
        .toLowerCase()
        .includes(query);
      const matchesDept = !selectedDept || emp.department === selectedDept;

      return matchesSearch && matchesDept;
    });
  }, [employees, search, selectedDept]);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>
        <button className="btn-primary flex w-full items-center justify-center gap-2 sm:w-auto">
          <Plus size={16} /> Add Employee
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-6 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 hover:text-cyan-300" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 "
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-cyan transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 sm:max-w-52"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((deptName) => (
            <option key={deptName} value={deptName}>
              {deptName}
            </option>
          ))}
        </select>
      </div>
      {/**employees cards */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin h-8 w-8 border-2 border-cyan-600 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredEmployees.length === 0 ? (
            <p className="col-span-full text-center py-16 text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300 ">
              No Employees Found
            </p>
          ) : (
            filteredEmployees.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onDelete={fetchEmployees}
                onEdit={(e) => setEditEmployee(e)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Employees;
