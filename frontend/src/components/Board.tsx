import { DndContext } from "@dnd-kit/core"
import Column from "./Column"

export default function Board() {

  return (

    <DndContext>

      <Column column="todo" />
      <Column column="inprogress" />
      <Column column="done" />

    </DndContext>

  )

}