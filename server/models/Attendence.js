import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema({
 employeeId:{type:mongoose.Schema.Types.ObjectId,ref:
    "Employee", required:true},
    date:{type:Date,required:true},
    checkIn:{type:Date,required:true},
    checkOut:{type:Date,required:true},
    status:{type:String, enum:["PRESENT","ABSENT","LATE"],
        default:"PRESENT"
    },
    workingHours:{type:Number,default:null},
    dayType:{
        type:String,enum:["FULL Day","Three Quarter Day","Half Day","Short Day", null], default:null
    }
},{timestamps: true});

attendenceSchema.index({employeeId:1,date:1},{unique:true})

const Attendance = mongoose.model.Attendance || mongoose.model("Attendence", attendenceSchema);

export default Attendance;