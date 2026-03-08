import { useState } from "react"
import { createTask } from "../services/taskService"

export default function CreateTask({column,onCreated}:any){

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")

  const handleCreate = async ()=>{

    if(!title) return

    const task = await createTask({
      title,
      description,
      column
    })

    onCreated(task)

    setTitle("")
    setDescription("")
  }

  return(

    <div className="create-task">

      <input
        placeholder="Task title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />

      <button onClick={handleCreate}>
        Add Task
      </button>

    </div>

  )

}