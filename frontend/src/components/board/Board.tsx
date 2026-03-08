import { useEffect, useState } from "react"
import { fetchTasks } from "../../services/taskService"
import CreateTask from "../CreateTask"
import TaskCard from "../TaskCard"

export default function Board(){

  const [tasks,setTasks] = useState<any[]>([])

  useEffect(()=>{
    loadTasks()
  },[])

  const loadTasks = async ()=>{
    const data = await fetchTasks()
    setTasks(data)
  }

  const addTask = (task:any)=>{
    setTasks(prev=>[...prev,task])
  }

  const removeTask = (id:string)=>{
    setTasks(prev=>prev.filter(t=>t.id!==id))
  }

  const updateLocalTask = (updated:any)=>{
    setTasks(prev =>
      prev.map(t => t.id===updated.id ? updated : t)
    )
  }

  const columns = ["todo","doing","done"]

  return(

    <div className="board">

      {columns.map(column=>{

        const columnTasks = tasks.filter(
          t => t.column===column
        )

        return(

          <div className="column" key={column}>

            <h2>{column.toUpperCase()}</h2>

            <CreateTask
              column={column}
              onCreated={addTask}
            />

            {columnTasks.map(task=>(
              <TaskCard
                key={task.id}
                task={task}
                onDelete={removeTask}
                onUpdate={updateLocalTask}
              />
            ))}

          </div>

        )

      })}

    </div>

  )

}