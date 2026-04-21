import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase, getDatabaseMode } from "./config/database.js";
import { seedDemoData } from "./services/demoSeeder.js";
import { registerAlertSocket } from "./sockets/alertsSocket.js";

async function startServer() {
  await connectDatabase();
  await seedDemoData();

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: env.clientUrls,
      methods: ["GET", "POST"]
    }
  });

  registerAlertSocket(io);

  server.listen(env.port, () => {
    console.log(`AI Village Brain API listening on port ${env.port} (${getDatabaseMode()} mode)`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
