import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is missing from server/.env");
    }

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      family: 4,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export { connectDB };
