import mongoose from "mongoose";

const platformSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main"
    },
    announcement: {
      enabled: { type: Boolean, default: true },
      text: { type: String, default: "New subsidy scheme available - Apply now" },
      link: { type: String, default: "/#contact" }
    },
    contact: {
      phone: { type: String, default: "+91 9509868673" },
      whatsappNumber: { type: String, default: "919509868673" },
      email: { type: String, default: "support@aivillagebrain.com" },
      location: { type: String, default: "India" },
      workingHours: { type: String, default: "Mon - Fri: 9:00 AM to 6:00 PM" }
    },
    content: {
      heroTitle: { type: String, default: "Smart AI Farming Starts Here" },
      heroSubtitle: {
        type: String,
        default: "Crop intelligence, sensors, satellite signals, and market timing in one command layer."
      },
      featuresHeadline: {
        type: String,
        default: "Built for modern farm intelligence across advice, monitoring, and automation"
      },
      footerDescription: {
        type: String,
        default:
          "A premium agriculture SaaS platform bringing together AI advisory, sensor intelligence, satellite monitoring, and operator-ready analytics."
      }
    },
    aiKeys: {
      openAiKey: { type: String, default: "" },
      weatherApiKey: { type: String, default: "" },
      satelliteProviderKey: { type: String, default: "" },
      whatsappToken: { type: String, default: "" },
      firebaseServerKey: { type: String, default: "" }
    }
  },
  {
    timestamps: true
  }
);

export const PlatformSetting = mongoose.model("PlatformSetting", platformSettingSchema);
