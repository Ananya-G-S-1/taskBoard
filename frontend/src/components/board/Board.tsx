import { DndContext } from "@dnd-kit/core"
import Column from "./Column"
import { useTasks } from "../../hooks/useTasks"
import { socketService } from "../../services/socketService"

export default function Board() {

  const { tasks } = useTasks()

  const columns = ["todo", "doing", "done"]

  function handleDragEnd(event:any) {

    const { active, over } = event

    if(!over) return

    socketService.moveTask({
      id: active.id,
      column: over.id
    })

  }

  return (

    <DndContext onDragEnd={handleDragEnd}>

      <div className="board">

        {columns.map(col => (

          <Column
            key={col}
            column={col}
            tasks={tasks.filter(t => t.column === col)}
          />

        ))}

      </div>

    </DndContext>

  )
}