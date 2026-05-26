import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    fullName: String,
    phone: String,
    age: String,
    course: String,
    height: String,
    weight: String,
    dob: String,
    qualification: String,
    caste: String,
    address: String,
  },
  { timestamps: true }
);

const Admission = mongoose.model("Admission", admissionSchema);

export default Admission;   