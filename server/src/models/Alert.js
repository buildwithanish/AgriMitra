import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    channel: {
      type: String,
      default: "dashboard"
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const Alert = mongoose.model("Alert", alertSchema);
