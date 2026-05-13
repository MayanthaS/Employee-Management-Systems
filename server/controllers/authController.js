import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Login for employee and admin

// POST /api/auth/login
export const login = async (req, res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: 'Email and password are required'});
        }

        const  user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message: 'Invalid email or password'});
        }
        if(role_type === "admin" && user.role !== "ADMIN"){
            return res.status(403).json({message:"Not authorized to login as admin"});
        }
        if(role_type === "employee" && user.role !== "EMPLOYEE"){
            return res.status(403).json({message:"Not authorized to login as employee"});
        }

        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            return res.status(401).json({message: 'Invalid Credentials'});
        }
        const payload ={
            userId: user._id,
            role: user.role,
            email: user.email
        };
         const token = jwt.sign(payload, process.env.jwtSecret, {expiresIn: '7d'});
         return res.json({user:payload,taken});

    }catch(error){
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get Session for employee and admin

// GET /api/auth/session
export const session = (req,res) =>{
    const session = req.session;
    return res.json({session});
}

//Change password for employee and admin
// POST /api/auth/change-password
export const changePassword = async (req,res) =>{
    try{
        const session = req.session;
        const {currentPassword, newPassword} = req.body;
        if(!currentPassword || !newPassword){
            return res.status(400).json({message: 'Current and new password are required'});
        }
        const user = await User.findById(session.userId);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const isValid = await bcrypt.compare(currentPassword, user.password);
        if(!isValid){
            return res.status(401).json({message: 'Current password is incorrect'});
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return res.json({message: 'Password changed successfully'});

    }catch(error){
        return res.status(500).json({message: 'Failed to change password'});    
    }
}
  
