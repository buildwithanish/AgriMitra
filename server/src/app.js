import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import integrationRoutes from "./routes/integrationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import featureRoutes from "./routes/featureRoutes.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import { authorize, protect } from "./middleware/auth.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { env } from "./config/env.js";
import { getDatabaseMode } from "./config/database.js";

const app = express();

function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  if (env.clientUrls.includes(origin)) {
    return true;
  }

  if (!env.allowPublicCors) {
    return false;
  }

  try {
    const { protocol } = new URL(origin);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Village Brain API is running",
    data: {
      databaseMode: getDatabaseMode()
    }
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/ai", protect, aiRoutes);
app.use("/api/features", protect, featureRoutes);
app.use("/api/dashboard", protect, dashboardRoutes);
app.use("/api/integrations", protect, integrationRoutes);
app.use("/api/admin", protect, authorize("admin"), adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/sensors", protect, sensorRoutes);
app.use("/api/notifications", protect, notificationRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
