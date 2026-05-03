import React, { useCallback, useEffect, useMemo, useState } from "react";
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";
import { Plus, Search, X } from "lucide-react";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeForm from "../components/EmployeeForm";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setEmployees(
      dummyEmployeeData.filter((emp) =>
        selectedDept ? emp.department === selectedDept : true,
      ),
    );
  }, [selectedDept]);

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
      if (emp.isDeleted) return false;

      const matchesSearch = `${emp.firstName} ${emp.lastName} ${emp.position}`
        .toLowerCase()
        .includes(query);
      const matchesDept = !selectedDept || emp.department === selectedDept;

      return matchesSearch && matchesDept;
    });
  }, [employees, search, selectedDept]);

  const handleCreateEmployee = (employeeData) => {
    const id = `emp-${Date.now()}`;
    const newEmployee = {
      ...employeeData,
      _id: id,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: {
        _id: `user-${Date.now()}`,
        email: employeeData.email,
        role: "EMPLOYEE",
      },
    };

    setEmployees((current) => [newEmployee, ...current]);
    setShowCreateModal(false);
  };

  const handleUpdateEmployee = (employeeData) => {
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === employeeData.id
          ? {
              ...employee,
              ...employeeData,
              updatedAt: new Date().toISOString(),
            }
          : employee,
      ),
    );
    setEditEmployee(null);
  };

  const handleDeleteEmployee = (employeeData) => {
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === employeeData.id
          ? {
              ...employee,
              isDeleted: true,
              employmentStatus: "INACTIVE",
              updatedAt: new Date().toISOString(),
            }
          : employee
      )
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex w-full items-center justify-center gap-2 sm:w-auto"
        >
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
                onDelete={handleDeleteEmployee}
                onEdit={(e) => setEditEmployee(e)}
              />
            ))
          )}
        </div>
      )}
      {/*Create Employee Modal */}
      {showCreateModal && (
        <div
          className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50  flex items-start justify-center p-4 overflow-y-auto "
          onClick={() => setShowCreateModal(false)}
        >
          <div className="fixed inset-0" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 pb-0">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 ">
                  Add New Employee
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Create a user account and employee profile
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5 " />
              </button>
            </div>
            <div className="p-6">
              {" "}
              <EmployeeForm
                onSucess={handleCreateEmployee}
                onCancel={() => setShowCreateModal(false)}
              />
            </div>
          </div>
        </div>
      )}
      {/* {Edit employee Modal} */}
      {editEmployee && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm "
          onClick={() => setEditEmployee(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 pb-0 ">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 ">
                  Edit Employee
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Update employee details
                </p>
              </div>
              <button
                onClick={() => setEditEmployee(null)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5 " />
              </button>
            </div>
            <div className="p-6 ">
              <EmployeeForm
                initialData={editEmployee}
                onSucess={handleUpdateEmployee}
                onCancel={() => setEditEmployee(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
