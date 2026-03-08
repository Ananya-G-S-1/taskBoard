import { useState } from "react";
import { updateTask, deleteTask } from "../services/taskService";

export default function TaskCard({ task, onDelete, onUpdate }: any) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const saveUpdate = async () => {
    const updated = await updateTask(task.id, {
      title,
      description,
      column: task.column,
    });

    onUpdate(updated);

    setEditing(false);
  };

  const removeTask = async () => {
    await deleteTask(task.id);

    onDelete(task.id);
  };

  if (editing) {
    return (
      <div className="task">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={saveUpdate}>Save</button>
      </div>
    );
  }

  return (
    <div className="task">
      <h4>{task.title}</h4>
      <p>{task.description}</p>

      <button onClick={() => setEditing(true)}>Edit</button>

      <button onClick={removeTask}>Delete</button>
    </div>
  );
}
