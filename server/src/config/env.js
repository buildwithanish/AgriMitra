import dotenv from "dotenv";

dotenv.config();

const rawClientUrl = process.env.CLIENT_URL || "http://localhost:5173";

export const env = {
  port: Number(process.env.PORT || 5000),
  clientUrl: rawClientUrl.split(",")[0].trim(),
  clientUrls: rawClientUrl
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
  allowPublicCors: process.env.ALLOW_PUBLIC_CORS !== "false",
  adminEmail: process.env.ADMIN_EMAIL || "support@aivillagebrain.com",
  smtp: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.SMTP_FROM || ""
  },
  mongodbUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ai-village-brain",
  allowMockDatabaseFallback:
    process.env.ALLOW_MEMORY_DB_FALLBACK !== undefined
      ? process.env.ALLOW_MEMORY_DB_FALLBACK !== "false"
      : process.env.ALLOW_MOCK_DB_FALLBACK !== "false",
  jwtSecret: process.env.JWT_SECRET || "super-secret-ai-village-brain",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d"
};
