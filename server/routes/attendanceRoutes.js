import  {Router} from "express";
import {protect} from "../middleware/auth.js"
import { clockInOut, getAttendance } from "../controllers/attendanceController.js";


const attedanceRouter = Router();

attedanceRouter.post('/', protect , clockInOut)
attedanceRouter.get('/', protect , getAttendance)

export default attedanceRouter