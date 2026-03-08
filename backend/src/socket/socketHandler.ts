import prisma from "../config/db"

export function registerSocketHandlers(socket: any, io: any) {

  // CREATE TASK
  socket.on("task:create", async (data) => {

    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        column: data.column,
        position: Date.now()
      }
    })

    io.emit("task:created", task)

  })


  // UPDATE TASK
  socket.on("task:update", async (data) => {

    const task = await prisma.task.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        column: data.column
      }
    })

    io.emit("task:updated", task)

  })


  // MOVE TASK
  socket.on("task:move", async (data) => {

    const task = await prisma.task.update({
      where: { id: data.id },
      data: {
        column: data.column,
        position: Date.now()
      }
    })

    io.emit("task:moved", task)

  })


  // DELETE TASK
  socket.on("task:delete", async (id) => {

    await prisma.task.delete({
      where: { id }
    })

    io.emit("task:deleted", id)

  })

}