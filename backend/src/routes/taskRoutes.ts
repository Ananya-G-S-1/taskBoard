import { Router } from "express"
import prisma from "../config/db"

const router = Router()

// GET ALL TASKS
router.get("/tasks", async (req, res) => {

  try {

    const tasks = await prisma.task.findMany({
      orderBy: { position: "asc" }
    })

    res.json(tasks)

  } catch (error) {

    res.status(500).json({
      error: "Failed to fetch tasks"
    })

  }

})


// CREATE TASK
router.post("/tasks", async (req, res) => {

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

  } catch (error) {

    res.status(500).json({
      error: "Failed to create task"
    })

  }

})


// UPDATE TASK
router.put("/tasks/:id", async (req, res) => {

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

  } catch (error) {

    res.status(500).json({
      error: "Failed to update task"
    })

  }

})


// DELETE TASK
router.delete("/tasks/:id", async (req, res) => {

  try {

    const { id } = req.params

    await prisma.task.delete({
      where: { id }
    })

    res.json({ success: true })

  } catch (error) {

    res.status(500).json({
      error: "Failed to delete task"
    })

  }

})

export default router