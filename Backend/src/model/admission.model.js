import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    fullName: String,
    phone: String,
    age: String,
    course: String,
  },
  { timestamps: true }
);

const Admission = mongoose.model("Admission", admissionSchema);

export default Admission;