import { useTasks } from "../../hooks/useTasks"
import Column from "./Column"

export default function Board() {

  const { tasks } = useTasks()

  const columns = ["todo", "doing", "done"]

  return (
    <div className="board">

      {columns.map(col => (
        <Column
          key={col}
          column={col}
          tasks={tasks.filter(t => t.column === col)}
        />
      ))}

    </div>
  )

}