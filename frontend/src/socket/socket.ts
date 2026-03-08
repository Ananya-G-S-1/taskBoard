import { io } from "socket.io-client";

export const socket = io("https://taskboard-vyre.onrender.com", {
  transports: ["websocket"],
  reconnection: true,
});
