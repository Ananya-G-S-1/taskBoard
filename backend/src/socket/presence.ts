const users:any = {}

export function registerPresence(io:any, socket:any) {

  users[socket.id] = `User-${Math.floor(Math.random()*1000)}`

  io.emit("presence:update", users)

  socket.on("disconnect", () => {

    delete users[socket.id]

    io.emit("presence:update", users)

  })

}