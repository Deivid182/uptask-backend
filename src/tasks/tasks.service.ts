import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schema/task.schema';
import { UpdateTaskStatusDto } from 'src/projects/dto/update-task-status.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>){
  }
  
  async addTask (request: Request, createTaskDto: CreateTaskDto) {
    const newTask = new this.taskModel(createTaskDto);
    newTask.project = request.project.id
    request.project.tasks.push(newTask.id)
    await Promise.allSettled([newTask.save(), request.project.save()])
    return newTask
  }

  async findAllTasks(request: Request) {
    const tasks = await this.taskModel.find({project: request.project.id}).populate('project')
    return tasks
  }

  async findOneTask(request: Request, taskId: string) {
    const task = await this.taskModel.findById(taskId)
    if(!task){
      throw new NotFoundException('Task not found');
    }
    if(task.project.toString() !== request.project.id) {
      return new ForbiddenException('Task not found in this project');
    }
    return task
  }

  async updateTask(request: Request, taskId: string, updateTaskDto: UpdateTaskDto) {
    await this.findOneTask(request, taskId)

    return await this.taskModel.findByIdAndUpdate(taskId, updateTaskDto, {new: true})
  }

  async updateStatus(request: Request, taskId: string, { status }: UpdateTaskStatusDto) {
    
    await this.findOneTask(request, taskId)

    return await this.taskModel.findByIdAndUpdate(taskId, { status }, { new: true })
  }

  async removeTask(request: Request, taskId: string) {
    await this.findOneTask(request, taskId)
    request.project.tasks = request.project.tasks.filter(task => task.toString() !== taskId)
    await Promise.allSettled([this.taskModel.findByIdAndDelete(taskId), request.project.save()])
  }
}
