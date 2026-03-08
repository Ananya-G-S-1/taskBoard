import { useTaskStore } from "../store/taskStore"
import TaskCard from "./TaskCard"

interface Props {
  column: string
}

export default function Column({ column }: Props) {

  const tasks = useTaskStore(
    (state) => state.tasks.filter((t) => t.column === column)
  )

  return (
    <div className="column">

      <h2>{column}</h2>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}

    </div>
  )
}