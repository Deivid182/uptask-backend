import dotenv from "dotenv"
import colors from "colors"
import server from './server';
import { PORT } from "./config/envs";

server.listen(PORT, () => {
  console.log(colors.cyan(`Server running on port ${PORT}`))
})

