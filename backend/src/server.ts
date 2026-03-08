import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// GET TASKS
app.get("/api/tasks", async (req, res) => {

  try {

    const tasks = await prisma.task.findMany({
      orderBy: { position: "asc" }
    })

    res.json(tasks)

  } catch (err) {

    console.error(err)

    res.status(500).json({
      error: "Failed to fetch tasks"
    })

  }

})


// CREATE TASK
app.post("/api/tasks", async (req, res) => {

  try {

    const { title, description, column } = req.body

    const task = await prisma.task.create({
      data: {
        title,
        description,
        column,
        position: Date.now()
      }
    })

    res.json(task)

  } catch (err) {

    console.error(err)

    res.status(500).json({
      error: "Failed to create task"
    })

  }

})


// UPDATE TASK
app.put("/api/tasks/:id", async (req, res) => {

  try {

    const { id } = req.params
    const { title, description, column } = req.body

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        column
      }
    })

    res.json(task)

  } catch (err) {

    console.error(err)

    res.status(500).json({
      error: "Failed to update task"
    })

  }

})


// DELETE TASK
app.delete("/api/tasks/:id", async (req, res) => {

  try {

    const { id } = req.params

    await prisma.task.delete({
      where: { id }
    })

    res.json({ success: true })

  } catch (err) {

    console.error(err)

    res.status(500).json({
      error: "Failed to delete task"
    })

  }

})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log("Server running")
})