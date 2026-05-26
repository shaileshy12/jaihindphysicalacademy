import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    timestamp: {
      type: String,
      default: "",
    },

    fullName: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    age: {
      type: String,
      default: "",
      trim: true,
    },

    course: {
      type: String,
      default: "",
      trim: true,
    },

    height: {
      type: String,
      default: "",
      trim: true,
    },

    weight: {
      type: String,
      default: "",
      trim: true,
    },

    dob: {
      type: String,
      default: "",
      trim: true,
    },

    qualification: {
      type: String,
      default: "",
      trim: true,
    },

    caste: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const Admission = mongoose.model("Admission", admissionSchema);

export default Admission;