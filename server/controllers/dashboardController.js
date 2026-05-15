import  DEPARTSMENTS from "../constants/departments.js"
import Attendance from "../models/Attendence";
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";
import Payslip from "../models/Payslip"



//Get dashboard for employee and admin
//GET/API/DASHBOARD



export const getDashboard = async  (req, res) =>{
    try {
        const session = req.session;    
        if(session.role === "ADMIN"){
            const [totalEmployees,todayAttendence,pedingLeaves] = await Promise.all([
                Employee.countDocuments({isDeleted:{$ne: true}}),
                Attendance.countDocuments({
                    date:{
                        $gte: new Date(new Date().setHours(0,0,0,0)),
                        $lt: new Date(new Date().setHours(24,0,0,0)),
                    }
                }),
                LeaveApplication.countDocuments({status:"PENDING"})

            ])
return res.json({
    role:"ADMIN",
    totalEmployees,
    totalDepartments:DEPARTSMENTS.lenght,
    todayAttendence,
    pendingLeaves
})
        }else{
            const employee = await Employee.findOne({
                userId:session.userId,
            }).lean();
            if(!employee) return res.status(404).json({error:"Employee not Found"});
            const today = new Date();
            const [currentMonthAttendance,pendingLeaves,latestPayslip] = await Promise.all([
                Attendance.countDocuments({
                    employeeId: employee._id,
                    date:{
                        $gte: new Date(today.getFullYear(),today.getMonth(),1),
                        $lt: new Date(today.getFullYear(),today.getMonth(),+1,1),
                    }
                }).
                LeaveApplication.countDocuments({
                    employeeId: employee._id,
                    status:"PENDING",
                }),
                pAYslip.findOne({
                    employeeId: employee,_id
                }).sort({
                    createdAt: -1
                }).lean(),
            ])
            return res.json({
                role:"EMPLOYEE",
                employee:{...employee,id:employee._id.toString()},
                currentMonthAttendence,
                pendingLeaves,
                latestPayslip:latestPayslip ? {...latestPayslip, id: latestPayslip._id.toString()}:null
            })
        } 
    } catch (error) {
        console.error("Dashboard error :", error)
    }
}