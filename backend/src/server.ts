import express from "express"
import * as http from "http"
import { Server } from "socket.io"
import { registerSocketHandlers } from "./socket/socketHandler"

const app = express()

app.get("/", (req, res) => {
  res.send("Taskboard backend running")
})

const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: "*" }
})

io.on("connection", (socket) => {
  registerSocketHandlers(socket, io)
})

const PORT = process.env.PORT || 10000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})