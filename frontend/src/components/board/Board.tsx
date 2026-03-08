import { useEffect, useState } from "react"
import CreateTask from "../CreateTask"

const API = "https://taskboard-vyre.onrender.com/api/tasks"

export default function Board(){

  const [tasks,setTasks] = useState<any[]>([])

  useEffect(()=>{
    loadTasks()
  },[])

  const loadTasks = async ()=>{

    const res = await fetch(API)
    const data = await res.json()

    if(Array.isArray(data)){
        setTasks(data)
    }else{
        setTasks([])
    }

  }

  const addTask = (task:any)=>{
    setTasks(prev=>[...prev,task])
  }

  const columns = ["todo","doing","done"]

  return(

    <div className="board">

      {columns.map(column=>{

        const columnTasks = tasks.filter(
          t=>t.column===column
        )

        return(

          <div className="column" key={column}>

            <h2>{column.toUpperCase()}</h2>

            <CreateTask
              column={column}
              onCreated={addTask}
            />

            {columnTasks.map(task=>(
              <div key={task.id} className="task">

                <h4>{task.title}</h4>
                <p>{task.description}</p>

              </div>
            ))}

          </div>

        )

      })}

    </div>

  )

}