import { useEffect, useState } from "react"
import { Task } from "../types/task"
import { socketService } from "../services/socketService"

export function useTasks() {

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {

    socketService.onTaskCreated((task: Task) => {
      setTasks(prev => [...prev, task])
    })

    socketService.onTaskUpdated((task: Task) => {
      setTasks(prev =>
        prev.map(t => t.id === task.id ? task : t)
      )
    })

    socketService.onTaskMoved((task: Task) => {
      setTasks(prev =>
        prev.map(t => t.id === task.id ? task : t)
      )
    })

  }, [])

  return { tasks, setTasks }
}