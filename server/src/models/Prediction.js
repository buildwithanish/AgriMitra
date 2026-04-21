import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm"
    },
    type: {
      type: String,
      required: true
    },
    input: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    output: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    confidence: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export const Prediction = mongoose.model("Prediction", predictionSchema);
