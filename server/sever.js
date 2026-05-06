import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
// import { connectDB } from "./config/db";
import { connectDB } from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;



// Middleware
app.use(cors());
app.use(express.json());
app.use(multer().none());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Employee Management System API");
});
 await connectDB();
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
