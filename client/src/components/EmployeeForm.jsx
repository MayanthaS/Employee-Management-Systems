import React, { useMemo, useState } from "react";
import { DEPARTMENTS } from "../assets/assets";
import { Loader, Loader2Icon } from "lucide-react";

const EmployeeForm = ({ initialData, onSucess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const isEditMode = Boolean(initialData);

  const defaultJoinDate = useMemo(() => {
    if (!initialData?.joinDate) return "";
    return new Date(initialData.joinDate).toISOString().split("T")[0];
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const firstName = formData.get("firstName")?.toString().trim() || "";
    const lastName = formData.get("lastName")?.toString().trim() || "";
    const email =
      formData.get("email")?.toString().trim() ||
      initialData?.email ||
      initialData?.user?.email ||
      "";
    const employeeData = {
      ...initialData,
      firstName,
      lastName,
      email,
      phone: formData.get("phone")?.toString().trim() || "",
      joinDate: formData.get("joinDate")?.toString() || "",
      bio: formData.get("bio")?.toString().trim() || "",
      department: formData.get("department")?.toString() || "",
      position: formData.get("position")?.toString().trim() || "",
      basicSalary: Number(formData.get("basicSalary") || 0),
      allowances: Number(formData.get("allowances") || 0),
      deductions: Number(formData.get("deductions") || 0),
      employmentStatus:
        formData.get("employmentStatus")?.toString() ||
        initialData?.employmentStatus ||
        "ACTIVE",
      isDeleted: initialData?.isDeleted ?? false,
      user: {
        ...(initialData?.user || {}),
        email,
        role: formData.get("role")?.toString() || "EMPLOYEE",
      },
    };

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    onSucess?.(employeeData);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl animate-fade-in"
    >
      {/* personal information */}
      <div className="card p-5 sm:p-6">
        <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div className="sm:col-span-2">
            <label className="block mb-2">First Name</label>
            <input
              name="firstName"
              required
              defaultValue={initialData?.firstName}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2">Last Name</label>
            <input
              name="lastName"
              required
              defaultValue={initialData?.lastName}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2">Phone Number</label>
            <input name="phone" required defaultValue={initialData?.phone} />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2">Join Date</label>
            <input
              type="date"
              name="joinDate"
              required
              defaultValue={defaultJoinDate}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2">Bio (Optional)</label>
            <textarea
              name="bio"
              defaultValue={initialData?.bio}
              rows={4}
              placeholder="Brief description..."
              className="resize-none"
            />
          </div>
        </div>
      </div>
      {/* Employement Details */}
      <div className="card p-5 sm:p-6">
        <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
          Employment Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div>
            <label className="block mb-2">Department</label>
            <select
              name="department"
              required
              defaultValue={initialData?.department || ""}
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((depaName) => (
                <option key={depaName} value={depaName}>
                  {depaName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Position</label>
            <input
              name="position"
              required
              defaultValue={initialData?.position}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-2">Basic Salary</label>
            <input
              name="basicSalary"
              type="number"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.basicSalary || 0}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2">Allowance</label>
            <input
              name="allowances"
              type="number"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.allowances || 0}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2">Deductions</label>
            <input
              name="deductions"
              type="number"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.deductions || 0}
            />
          </div>
          {isEditMode && (
            <div className="sm:col-span-2">
              <label className="block mb-2">Status</label>
              <select
                name="employmentStatus"
                defaultValue={initialData?.employmentStatus || "ACTIVE"}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>
      {/* Account Setup */}
      <div className="card p-5 sm:p-6">
        <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
          Account Setup
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div className="sm:col-span-2">
            <label className="block mb-2">Work Email Address</label>
            <input
              type="email"
              name="email"
              required
              defaultValue={initialData?.email || initialData?.user?.email}
            />
          </div>
          {!isEditMode && (
            <div>
              <label className="block mb-2">Temporary Password</label>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                placeholder="Minimum 8 characters"
              />
            </div>
          )}
          {isEditMode && (
            <div>
              <label className="block mb-2">Change Password (Optional)</label>
              <input
                type="password"
                name="password"
                minLength={8}
                placeholder="Leave blank to keep current"
              />
            </div>
          )}
          <div>
            <label className="block mb-2">System Role</label>
            <select
              name="role"
              defaultValue={initialData?.user?.role || "EMPLOYEE"}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
      </div>
      {/* button */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary w-full sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-60 sm:w-auto"
        >
          {loading
            ? isEditMode
              ? "Saving..."
              : "Creating..."
            : isEditMode
              ? "Save Changes"
              : "Create Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
