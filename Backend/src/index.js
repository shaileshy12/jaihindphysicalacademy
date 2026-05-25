import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 8000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();