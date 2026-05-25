import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    contactEmail: { type: String, default: "prahar_career_academy@gmail.com" },
    phone1: { type: String, default: "+91 9930810555" },
    phone2: { type: String, default: "9594801555" },
    address: { type: String, default: "Borivali, Mumbai, Maharashtra" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" },
  },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", settingsSchema);
export default Setting;