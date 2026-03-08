import { socket } from "../socket/socket"

export const socketService = {

  createTask(data: any) {
    socket.emit("task:create", data)
  },

  updateTask(data: any) {
    socket.emit("task:update", data)
  },

  moveTask(data: any) {
    socket.emit("task:move", data)
  },

  onTaskCreated(callback: any) {
    socket.on("task:created", callback)
  },

  onTaskUpdated(callback: any) {
    socket.on("task:updated", callback)
  },

  onTaskMoved(callback: any) {
    socket.on("task:moved", callback)
  }

}