import { socketService } from "../../services/socketService"

export default function TaskCard({task}:any){

  function deleteTask(){
    socketService.deleteTask(task.id)
  }

  return(

    <div className="task">

      <h4>{task.title}</h4>

      <p>{task.description}</p>

      <button onClick={deleteTask}>
        Delete
      </button>

    </div>

  )

}