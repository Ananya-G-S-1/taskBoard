import { useEffect, useState } from "react"
import "../../styles/board.css"

const API = "https://taskboard-vyre.onrender.com/api/tasks"

export default function Board() {

  const [tasks, setTasks] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [column,setColumn] = useState("todo")

  useEffect(()=>{
    loadTasks()
  },[])

  const loadTasks = async () => {

    const res = await fetch(API)
    const data = await res.json()

    if(Array.isArray(data)){
      setTasks(data)
    }

  }

  const createTask = async () => {

    if(!title) return

    const res = await fetch(API,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        title,
        description,
        column
      })
    })

    const task = await res.json()

    setTasks(prev=>[...prev,task])

    setTitle("")
    setDescription("")
    setColumn("todo")

    setShowForm(false)

  }

  const deleteTask = async(id:string)=>{

    await fetch(`${API}/${id}`,{
      method:"DELETE"
    })

    setTasks(prev => prev.filter(
      (t:any)=>t.id !== id
    ))

  }

  const columns = ["todo","doing","done"]

  return(

    <div>

      <div className="board-header">

        <button
          className="add-btn"
          onClick={()=>setShowForm(true)}
        >
          + Add Task
        </button>

      </div>


      {showForm &&

        <div className="task-form">

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

          <select
            value={column}
            onChange={(e)=>setColumn(e.target.value)}
          >
            <option value="todo">TODO</option>
            <option value="doing">DOING</option>
            <option value="done">DONE</option>
          </select>

          <button onClick={createTask}>
            Create Task
          </button>

        </div>

      }


      <div className="board">

        {columns.map(col=>{

          const columnTasks = tasks.filter(
            t=>t.column === col
          )

          return(

            <div
              key={col}
              className="column"
            >

              <h2>{col.toUpperCase()}</h2>

              {columnTasks.map((task:any)=>{

                return(

                  <div
                    key={task.id}
                    className="task-card"
                  >

                    <h4>{task.title}</h4>

                    <p>{task.description}</p>

                    <button
                      className="delete-btn"
                      onClick={()=>deleteTask(task.id)}
                    >
                      Delete
                    </button>

                  </div>

                )

              })}

            </div>

          )

        })}

      </div>

    </div>

  )

}