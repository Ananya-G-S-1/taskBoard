import { createTask, updateTask, moveTask } from "../services/taskService"

export function registerSocketHandlers(socket, io) {

  socket.on("task:create", async (data) => {

    const task = await createTask(data)

    io.emit("task:created", task)

  })

  socket.on("task:update", async (data) => {

    const task = await updateTask(data)

    io.emit("task:updated", task)

  })

  socket.on("task:move", async (data) => {

    const result = await moveTask(data)

    io.emit("task:moved", result)

  })

}