import mongoose from "mongoose";

const contactLeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      default: "farmer"
    },
    interest: {
      type: String,
      default: "demo"
    },
    message: {
      type: String,
      default: ""
    },
    source: {
      type: String,
      default: "website"
    },
    status: {
      type: String,
      default: "new"
    }
  },
  {
    timestamps: true
  }
);

export const ContactLead = mongoose.model("ContactLead", contactLeadSchema);
