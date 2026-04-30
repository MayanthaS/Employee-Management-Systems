import { PencilIcon, Trash2Icon } from "lucide-react";
import React from "react";

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  const handleDelete = async () => {
    if (!confirm("Are You sure you want to delete this employee ?")) return;
    onDelete?.(employee);
  };
  return (
    <div className="group relative card card-hover overflow-hidden ">
      <div className="relative aspect-4/3 w-full overflow-hidden  bg-linear-to-br from-cyan-100 to-slate-50">
        {/*Circle Icon */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-cyan-200 to-slate-100 flex items-center justify-center">
            <span>
              {employee.firstName[0]} {employee.lastName[0]}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-3 left-3 flex gap-2">
        <span className="bg-cyan-50 backdrop:blur-sm px-3 py-1 text-xs font-semibold text-slate-500 rounded-lg shadow-sm">
          {employee.department || "Remote"}
        </span>
        {employee.isDeleted && (
          <span className="bg-red-600/50  font-medium text-white px-3 py-1 text-xs rounded">
            DELETED
          </span>
        )}
      </div>
      {!employee.isDeleted && (
        <div
          className="absolute inset-0 bg-linear-to-r from-cyan-800/30 via-transparent to-transparent 
        opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-3 "
        >
          <button
            onClick={() => onEdit(employee)}
            className="p-3 bg-white/90 backdrop:blur-sm text-slate-800 hover:text-cyan-600 
            rounded-xl shadow-lg transition-all hover:scale-100"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-3 bg-white/90 backdrop:blur-sm text-slate-800 hover:text-cyan-400
             rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="p-5">
        <h3 className="text-slate-900">
          {employee.firstName} {employee.lastName}
        </h3>
        <p className="text-xs text-slate-500">{employee.position}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
