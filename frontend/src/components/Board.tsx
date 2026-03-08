import { useEffect, useState } from "react"
import { socket } from "../socket/socket"

type Task = {
  id: string
  title: string
  description?: string
  column: string
  position: number
}

const columns = ["todo", "doing", "done"]

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState("")

  useEffect(() => {

    socket.on("task:created", (task: Task) => {
      setTasks(prev => [...prev, task])
    })

    socket.on("task:updated", (task: Task) => {
      setTasks(prev =>
        prev.map(t => (t.id === task.id ? task : t))
      )
    })

    socket.on("task:moved", (task: Task) => {
      setTasks(prev =>
        prev.map(t => (t.id === task.id ? task : t))
      )
    })

    return () => {
      socket.off("task:created")
      socket.off("task:updated")
      socket.off("task:moved")
    }

  }, [])

  const createTask = () => {
    if (!title) return

    socket.emit("task:create", {
      title,
      description: "",
      column: "todo"
    })

    setTitle("")
  }

  const moveTask = (task: Task, column: string) => {
    socket.emit("task:move", {
      id: task.id,
      column
    })
  }

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>

      <div style={{ position: "fixed", top: 20 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
        />
        <button onClick={createTask}>Add</button>
      </div>

      {columns.map(col => (
        <div key={col} style={{ width: 300 }}>

          <h3>{col.toUpperCase()}</h3>

          {tasks
            .filter(t => t.column === col)
            .sort((a, b) => a.position - b.position)
            .map(task => (
              <div
                key={task.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                  background: "#fff"
                }}
              >
                <strong>{task.title}</strong>

                <div style={{ marginTop: 10 }}>
                  {columns
                    .filter(c => c !== col)
                    .map(c => (
                      <button
                        key={c}
                        onClick={() => moveTask(task, c)}
                      >
                        Move → {c}
                      </button>
                    ))}
                </div>

              </div>
            ))}
        </div>
      ))}

    </div>
  )
}