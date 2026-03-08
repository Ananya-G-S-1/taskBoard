import { socket } from "../socket/socket"

const queue:any[] = []

export function enqueue(action:any) {
  queue.push(action)
}

export function replayQueue() {

  while(queue.length > 0) {

    const action = queue.shift()

    socket.emit(action.type, action.data)

  }

}

socket.on("connect", () => {
  replayQueue()
})