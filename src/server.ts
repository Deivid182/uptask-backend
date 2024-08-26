import express, { Express } from "express"
import { connectDB } from "./config/connection"

connectDB()

const server: Express = express()

export default server