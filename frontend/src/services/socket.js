import { io } from "socket.io-client";
import { API_BASE_URL } from "./api";

// Shared Socket.io client instance
export const socket = io(API_BASE_URL, {
  transports: ["websocket", "polling"],
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

export default socket;
