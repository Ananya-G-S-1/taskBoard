import { Router } from "express"
import prisma from "../config/db"

const router = Router()

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        position: "asc"
      }
    })

    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
})

export default router