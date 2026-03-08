import express from "express"
import * as http from "http"
import { Server } from "socket.io"
import { registerSocketHandlers } from "./socket/socketHandler"

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: "*" }
})

io.on("connection", (socket) => {
  registerSocketHandlers(socket, io)
})

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});