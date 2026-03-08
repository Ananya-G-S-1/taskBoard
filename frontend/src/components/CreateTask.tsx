import { useState } from "react";

const API = "https://taskboard-vyre.onrender.com/api/tasks";

export default function CreateTask({ column, onCreated }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    if (!title) return;

    const res = await fetch(API, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title,
        description,
        column,
      }),
    });

    const task = await res.json();

    onCreated(task);

    setTitle("");
    setDescription("");
  };

  return (
    <div className="create-task">
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleCreate}>Add Task</button>
    </div>
  );
}
