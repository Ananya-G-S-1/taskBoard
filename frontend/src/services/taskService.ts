const API = "https://taskboard-vyre.onrender.com/api"

export async function fetchTasks() {

  const res = await fetch(`${API}/tasks`)

  if (!res.ok) {
    throw new Error("Failed to fetch tasks")
  }

  return res.json()

}