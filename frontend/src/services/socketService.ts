import { socket } from "../socket/socket";

export const socketService = {
  createTask(data: any) {
    socket.emit("task:create", data);
  },

  updateTask(data: any) {
    socket.emit("task:update", data);
  },

  moveTask(data: any) {
    socket.emit("task:move", data);
  },

  deleteTask(id: string) {
    socket.emit("task:delete", id);
  },

  onTaskCreated(cb: any) {
    socket.on("task:created", cb);
  },

  onTaskUpdated(cb: any) {
    socket.on("task:updated", cb);
  },

  onTaskMoved(cb: any) {
    socket.on("task:moved", cb);
  },

  onTaskDeleted(cb: any) {
    socket.on("task:deleted", cb);
  },
};
