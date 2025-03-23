import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from 'src/projects/dto/update-task-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {

  constructor(
    private readonly prisma: PrismaService
  ){}
  
  async addTask (request: Request, createTaskDto: CreateTaskDto) {
    // const newTask = new this.taskModel(createTaskDto);
    // newTask.project = request.project.id
    // request.project.tasks.push(newTask.id)
    // await Promise.allSettled([newTask.save(), request.project.save()])
    // return newTask

    const newTask = await this.prisma.task.create({
      data: {
        ...createTaskDto,
        project: {
          connect: {
            id: request.project.id
          }
        }
      }
    })

    return newTask
  }

  async findAllTasks(request: Request) {
    // const tasks = await this.taskModel.find({project: request.project.id}).populate('project')
    // return tasks

    return await this.prisma.task.findMany({
      where: {
        project: {
          id: request.project.id
        }
      }
    })
  }

  async findOneTask(request: Request, taskId: string) {
    // const task = await this.taskModel.findById(taskId)
    // if(!task){
    //   throw new NotFoundException('Task not found');
    // }
    // if(task.project.toString() !== request.project.id) {
    //   return new ForbiddenException('Task not found in this project');
    // }
    // return task

    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId
      }
    })

    if(!task) {
      throw new NotFoundException('Task could not be found')
    }

    if(task.projectId !== request.project.id) {
      throw new ForbiddenException('Task not found in this project')
    }

    return task
  }

  async updateTask(request: Request, taskId: string, updateTaskDto: UpdateTaskDto) {
    // await this.findOneTask(request, taskId)

    // return await this.taskModel.findByIdAndUpdate(taskId, updateTaskDto, {new: true})

    await this.findOneTask(request, taskId)

    return await this.prisma.task.update({
      where: {
        id: taskId
      },
      data: updateTaskDto
    })
  }

  async updateStatus(request: Request, taskId: string, { status }: UpdateTaskStatusDto) {
    
    // await this.findOneTask(request, taskId)

    // return await this.taskModel.findByIdAndUpdate(taskId, { status }, { new: true })

    await this.findOneTask(request, taskId)

    return await this.prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        status
      }
    })
  }

  async removeTask(request: Request, taskId: string) {
    // await this.findOneTask(request, taskId)
    // request.project.tasks = request.project.tasks.filter(task => task.toString() !== taskId)
    // await Promise.allSettled([this.taskModel.findByIdAndDelete(taskId), request.project.save()])

    await this.findOneTask(request, taskId)
      await this.prisma.task.delete({
        where: {
          id: taskId
        }
      })
      await this.prisma.project.update({
        where: {
          id: request.project.id
        },
        data: {
          tasks: {
            disconnect: {
              id: taskId
            }
          }
        }
      })
    }
  }
