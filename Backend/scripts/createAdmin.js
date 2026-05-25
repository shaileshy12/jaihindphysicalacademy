import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../src/model/admin.model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Connected successfully!");

    const existingAdmin = await Admin.findOne({ email: "admin@prahar.com" });

    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      await mongoose.connection.close();
      process.exit(0);
    }

    const admin = await Admin.create({
      fullName: "Shaileshkumar Yadav",
      email: "shaileshyadav154@gmail.com",
      password: "Shailesh@C154",
      role: "admin",
    });

    console.log("Admin created successfully:", admin.email);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();