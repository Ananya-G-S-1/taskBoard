let queue = []

export function enqueue(action) {
  queue.push(action)
}

export function replay(socket) {

  queue.forEach((action) => {

    socket.emit(action.type, action.data)

  })

  queue = []

}