import mongoose, { mongo } from "mongoose";

const EmployeeSchema = new mongoose.Schema({
 userId:{
    type:mongo.ObjectId,
    ref:"User",
    required:true,
    unique:true
 },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  basicSalary: {
    type: Number,
    required: true,
    default: 0,
  },
  allowances: {
    type: Number,
    required: true,
    default: 0,
  },
  deductions: {
    type: Number,
    required: true,
    default: 0,
  },
  employeeStatus: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE",
  },
  joiningDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
    default: "",
  },
  
},{timestamps: true});

const Employee = mongoose.model.Employee || mongoose.model("Employee", EmployeeSchema);

export default Employee;