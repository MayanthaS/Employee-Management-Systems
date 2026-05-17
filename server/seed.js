import "dotenv/config";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const TemporaryPassword = "admin123";

async function registerAdmin() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (!ADMIN_EMAIL) {
      console.error("Missing ADMIN_EMAIL env variable");
      process.exit(1);
    }

    await connectDB();

    const hashedPassword = await bcrypt.hash(TemporaryPassword, 10);
    let admin = await User.findOne({ email: ADMIN_EMAIL });

    if (admin) {
      admin.name = admin.name || "Admin";
      admin.password = hashedPassword;
      admin.role = "admin";
      await admin.save();
      console.log("Admin user updated");
    } else {
      admin = await User.create({
        name: "Admin",
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
      });
      console.log("Admin user created");
    }

    console.log("\nemail:", admin.email);
    console.log("password:", TemporaryPassword);
    console.log("\nchange the password after login.");

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

registerAdmin();
