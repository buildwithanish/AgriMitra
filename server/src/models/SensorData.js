import mongoose from "mongoose";

const sensorDataSchema = new mongoose.Schema(
  {
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true
    },
    sensorType: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "active"
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export const SensorData = mongoose.model("SensorData", sensorDataSchema);
