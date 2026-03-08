const API = "https://taskboard-vyre.onrender.com/api/tasks"

export const fetchTasks = async () => {

  const res = await fetch(API)

  if (!res.ok) {
    throw new Error("Failed to fetch tasks")
  }

  return res.json()
}

export const createTask = async (task: {
  title: string
  description?: string
  column: string
}) => {

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  })

  if (!res.ok) {
    throw new Error("Failed to create task")
  }

  return res.json()
}

export const updateTask = async (
  id: string,
  task: any
) => {

  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  })

  if (!res.ok) {
    throw new Error("Failed to update task")
  }

  return res.json()
}

export const deleteTask = async (id: string) => {

  const res = await fetch(`${API}/${id}`, {
    method: "DELETE"
  })

  if (!res.ok) {
    throw new Error("Failed to delete task")
  }

}