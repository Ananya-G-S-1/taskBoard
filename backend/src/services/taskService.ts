const API = "https://taskboard-vyre.onrender.com/api/tasks";

export const fetchTasks = async () => {
  const res = await fetch(API);
  return res.json();
};

export const createTask = async (task: any) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id: string, data: any) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTask = async (id: string) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
};
