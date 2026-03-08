import { useEffect, useState } from "react";
import "../../styles/board.css";
import { socket } from "../../socket/socket";
import { DndContext, closestCenter } from "@dnd-kit/core";

const API = "https://taskboard-vyre.onrender.com/api/tasks";

export default function Board() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [column, setColumn] = useState("todo");

  useEffect(() => {
    loadTasks();

    socket.on("task:created", (task) => {
      setTasks((prev) => [...prev, task]);
    });

    socket.on("task:updated", (task) => {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    });
  }, []);

  const loadTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();

    if (Array.isArray(data)) {
      setTasks(data);
    }
  };

  const moveTask = async (task: any, newColumn: string) => {
    const res = await fetch(`${API}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        column: newColumn,
      }),
    });

    const updated = await res.json();

    setTasks((prev) =>
      prev.map((t: any) => (t.id === updated.id ? updated : t)),
    );
  };

  const createTask = async () => {
    try {
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

      setTasks((prev) => [...prev, task]);
    } catch {
      const localTask = {
        id: Date.now().toString(),
        title,
        description,
        column,
      };

      setTasks((prev) => [...prev, localTask]);
    }

    setShowModal(false);
    setTitle("");
    setDescription("");
  };

  const deleteTask = async (id: string) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    setTasks((prev) => prev.filter((t: any) => t.id !== id));
  };

  const columns = ["todo", "doing", "done"];

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newColumn = over.id;

    const task = tasks.find((t: any) => t.id === taskId);

    if (!task) return;

    moveTask(task, newColumn);
  };

  return (
    <div className="board-container">
      <div className="board-header">
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Task
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="board">
          {columns.map((col) => {
            const columnTasks = tasks.filter((t) => t.column === col);

            return (
              <div key={col} id={col} className="column">
                <h2>{col.toUpperCase()}</h2>

                {columnTasks.map((task: any) => {
                  return (
                    <div key={task.id} id={task.id} className="task-card">
                      <h4>{task.title}</h4>

                      <p>{task.description}</p>

                      <div className="task-actions">
                        <select
                          className="status-dropdown"
                          value={task.column}
                          onChange={(e) => moveTask(task, e.target.value)}
                        >
                          <option value="todo">TODO</option>
                          <option value="doing">DOING</option>
                          <option value="done">DONE</option>
                        </select>

                        <button
                          className="delete-btn"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </DndContext>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Task</h2>

            <label>Title</label>

            <input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Description</label>

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Status</label>

            <select value={column} onChange={(e) => setColumn(e.target.value)}>
              <option value="todo">TODO</option>
              <option value="doing">DOING</option>
              <option value="done">DONE</option>
            </select>

            <div className="modal-buttons">
              <button className="create-btn" onClick={createTask}>
                Create Task
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
