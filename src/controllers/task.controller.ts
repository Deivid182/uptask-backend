import { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
  static addTask = async (req: Request, res: Response) => {
    try {
      const newTask = new Task(req.body)
      newTask.project = req.project.id
      req.project.tasks.push(newTask.id)
      await Promise.allSettled([newTask.save(), req.project.save()])
      res.json({
        msg: 'Task added successfully!',
        success: true,
        data: newTask
      })
    } catch (error) {
      console.log(error, 'Error adding a task to a project')
      res.status(500).json({
        msg: 'Internal Server Error',
        success: false,
        data: null
      })
    }
  }

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate('project')
      res.json({
        msg: 'Tasks fetched successfully!',
        success: true,
        data: tasks
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: 'Internal Server Error',
        success: false,
        data: null
      })
    }
  }

  static getTaskById = async (req: Request, res: Response) => {
    try {
      const task = await Task.findById(req.params.taskId).populate('project')
      if(!task){
        return res.status(404).json({
          msg: 'Task not found',
          success: false,
          data: null
        })
      }
      if(task.project.toString() !== req.project.id) {
        return res.status(403).json({
          msg: 'Task not found in this project',
          success: false,
          data: null
        })
      }
      res.json({
        msg: 'Tasks fetched successfully!',
        success: true,
        data: task
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: 'Internal Server Error',
        success: false,
        data: null
      })
    }
  }
}