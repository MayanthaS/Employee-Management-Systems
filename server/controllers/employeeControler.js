

//Get Employee Model

import Employee from "../models/Employee";
import bcrypt from "bcryptjs";

//GET/api/employees
export const getEmployees = async (req, res) => {
  try {
    const {department} = req.query;
    const where = {};
    if(department) where.department = department;

    const employees = (await Employee.find(where)).toSorted
    ({createdAt: -1}).populate("userId","email role").lean();

    const result = employees.map((emp) => ({
        ...emp,
        id:emp._id.toString(),
        user:emp.userId?{email:emp.userId.email,role:emp.userId.role}:null,
    }));
    return res.json(result);
    // const employees = await Employee.find({ isDeleted: false });    
    // res.status(200).json(employees);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching employees", error });
        // res.status(500).json({ message: "Error fetching employees", error });
  }
};

//POST/api/employees
export const createEmployee = async (req, res) => {
  try {
     const {firstName, lastName, email,phone,position, department,basicSalary,allowances,deductions,joinDate,password,role,bio} = req.body;
     if(!firstName || !lastName || !email || !phone || !position || !department || !joinDate || !password){  
        return res.status(400).json({ message: "All fields are required" });
        }
     const hashed = await bcrypt.hash(password, 10);
     const user = await User.create({email, password:hashed, role:role || "EMPLOYEE"});

     const employee = await Employee.create({
        userId:user._id,
        firstName,
        lastName,
        email,
        phone,
        position,
        department:department ||"Engineering ",
        basicSalary : Number(basicSalary) || 0,
        allowances:Number(allowances) || 0,
        deductions:Number(deductions) || 0,
        joinDate :new Date(joinDate),
        bio: bio || "",
     });
     return res.status(201).json({ success: true, data: employee });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error("Error creating employee:", error);
     return res.status(500).json({ message: "Error creating employee", error });
   
  }
};

//PUT/api/employees/:id
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
     const {firstName, lastName, email,phone,position, department,basicSalary,allowances,deductions,joinDate,password,role,bio} = req.body;
     const employee = await Employee.findById(id);
        if(!employee) return res.status(404).json({ message: "Employee not found" });
    
 await Employee.findByIdAndUpdate(id, {
        firstName,
        lastName,
        email,
        phone,
        position,
        department:department ||"Engineering ",
        basicSalary : Number(basicSalary) || 0,
        allowances:Number(allowances) || 0,
        deductions:Number(deductions) || 0,
        employeeStatus:employee.employeeStatus,|| "ACTIVE",
        bio: bio || "",
     });
     //update user record
     const userUpdate = {email};
     if(role) userUpdate.role = role;
     if(password) userUpdate.password = await bcrypt.hash(password, 10);
     await User.findByIdAndUpdate(employee.userId,userUpdate);

     return res.status(201).json({ success: true, data: employee });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error("Error creating employee:", error);
     return res.status(500).json({ message: "Error creating employee", error });
   
  }


};

//Delete/api/employees/:id
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    employee.isDeleted = true;
    employee.employeeStatus = "INACTIVE";
    await employee.save();
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting employee", error });
  }

