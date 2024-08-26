import mongoose, { mongo } from "mongoose";
import colors from 'colors'
import { exit } from "node:process";
import { DATABASE_URL } from "./envs";

export async function connectDB() {
  try {
    const { connection } = await mongoose.connect(DATABASE_URL)
    console.log(colors.green(`Database connected on ${connection.host}:${connection.port}`))
  } catch (error) {
    console.log(colors.red(error))
    exit(1);  
  }
}