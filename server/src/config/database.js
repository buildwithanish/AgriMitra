import mongoose from "mongoose";
import { env } from "./env.js";

let databaseMode = "mongo";

export async function connectDatabase() {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(env.mongodbUri, {
      serverSelectionTimeoutMS: 3000
    });

    databaseMode = "mongo";
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    if (!env.allowMockDatabaseFallback) {
      throw error;
    }

    databaseMode = "mock";
    console.warn("MongoDB unavailable. Starting AI Village Brain API in mock database mode.");
  }
}

export function isMockDatabase() {
  return databaseMode === "mock";
}

export function getDatabaseMode() {
  return databaseMode;
}
