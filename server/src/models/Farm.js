import mongoose from "mongoose";

const farmSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    location: {
      village: String,
      district: String,
      state: String
    },
    acreage: {
      type: Number,
      default: 1
    },
    soilType: {
      type: String,
      default: "loamy"
    },
    currentCrop: {
      type: String,
      default: "Wheat"
    },
    irrigationType: {
      type: String,
      default: "drip"
    }
  },
  {
    timestamps: true
  }
);

export const Farm = mongoose.model("Farm", farmSchema);
