import { useEffect } from "react"
import { socket } from "./socket/socket"

function App() {

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server")
    })

    return () => {
      socket.off("connect")
    }
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Board</h1>
      <p>Connected to backend via Socket.IO</p>
    </div>
  )
}

export default App