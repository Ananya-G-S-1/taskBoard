import prisma from "../config/db"
import { generatePosition } from "../utils/fractionalIndex"

export async function createTask(data) {

  const position = await generatePosition(data.column)

  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      column: data.column,
      position
    }
  })

  return task
}

export async function updateTask(data) {

  const task = await prisma.task.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description
    }
  })

  return task
}

export async function moveTask(data) {

  const newPosition = await generatePosition(
    data.column,
    data.before,
    data.after
  )

  const task = await prisma.task.update({
    where: { id: data.id },
    data: {
      column: data.column,
      position: newPosition
    }
  })

  return task
}