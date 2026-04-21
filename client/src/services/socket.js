import { io } from "socket.io-client";
import { getSocketBaseUrl } from "../config/runtime";

let socket;
const noopSocket = {
  on() {},
  off() {}
};

export function getSocket() {
  if (typeof window === "undefined") {
    return noopSocket;
  }

  if (!socket) {
    socket = io(getSocketBaseUrl(), {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 3,
      timeout: 5000
    });
  }

  return socket;
}
