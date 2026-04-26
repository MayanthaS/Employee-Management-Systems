import React from "react";

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  return (
    <div className="group relative card card-hover overflow-hidden ">
      <div></div>
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
