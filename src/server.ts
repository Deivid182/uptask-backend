import express, { Express } from "express"
import { connectDB } from "./config/connection"
import { router as ProjectRoutes } from "./routes/project.routes"
import Project from "./models/Project"
import { projects, tasks } from "./data"
import Task from "./models/Task"

connectDB()

const server: Express = express()

server.use(express.json())
// server.get("/api/v1/seed", (req, res) => {
//   Project.insertMany(projects)
//   Task.insertMany(tasks)

//   res.json({
//     message: "Database seeded"
//   })
// })
server.use("/api/v1/projects", ProjectRoutes)

export default server