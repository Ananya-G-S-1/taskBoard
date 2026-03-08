import { useEffect, useState } from "react"
import { fetchTasks } from "../services/taskService"
import { socketService } from "../services/socketService"
import { Task } from "../types/Task"

export function useTasks() {

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetchTasks().then(setTasks)

    socketService.onTaskCreated(task => {
      setTasks(prev => [...prev, task])
    })

    socketService.onTaskUpdated(task => {
      setTasks(prev =>
        prev.map(t => t.id === task.id ? task : t)
      )
    })

    socketService.onTaskMoved(task => {
      setTasks(prev =>
        prev.map(t => t.id === task.id ? task : t)
      )
    })

    socketService.onTaskDeleted(id => {
      setTasks(prev => prev.filter(t => t.id !== id))
    })

  }, [])

  return { tasks, setTasks }
}