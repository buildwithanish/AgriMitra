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

    databaseMode = "memory";
    console.warn("MongoDB unavailable. Starting AI Village Brain API in temporary memory DB mode.");
  }
}

export function isMockDatabase() {
  return databaseMode === "memory";
}

export function getDatabaseMode() {
  return databaseMode;
}
