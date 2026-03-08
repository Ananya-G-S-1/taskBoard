import express from "express"
import http from "http"
import cors from "cors"
import { Server } from "socket.io"

import taskRoutes from "./routes/taskRoutes"
import { registerSocketHandlers } from "./socket/socketHandler"

const app = express()

app.use(cors())
app.use(express.json())

// REST API
app.use("/api", taskRoutes)

const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: "*" }
})

io.on("connection", (socket) => {
  registerSocketHandlers(socket, io)
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log("Server started")
})