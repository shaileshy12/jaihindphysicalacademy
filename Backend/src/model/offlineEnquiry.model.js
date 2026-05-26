import mongoose from "mongoose";

const offlineEnquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
    },

    course: {
      type: String,
    },

    address: {
      type: String,
    },

    source: {
      type: String,
      default: "Google Form",
    },
  },
  { timestamps: true }
);

const OfflineEnquiry = mongoose.model(
  "OfflineEnquiry",
  offlineEnquirySchema
);

export default OfflineEnquiry;