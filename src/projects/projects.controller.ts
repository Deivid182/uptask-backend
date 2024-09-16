import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IdDto } from 'src/common/dtos/id.dto';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { Request } from 'express';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { TaskStatus } from 'src/tasks/schema/task.schema';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService, private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: IdDto) {
    return this.projectsService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: IdDto, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(params.id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }

  // Tasks Routes

  @Post(':id/tasks')
  addTask(@Req() req: Request, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.addTask(req, createTaskDto);
  }

  @Get(':id/tasks')
  findAllTasks(@Req() req: Request,) {
    return this.tasksService.findAllTasks(req);
  }

  @Get(':id/tasks/:taskId')
  findOneTask(@Req() req: Request, @Param() params: IdDto) {
    return this.tasksService.findOneTask(req, params.taskId);
  }

  @Patch(':id/tasks/:taskId')
  updateTask(@Req() req: Request, @Param() params: IdDto, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(req, params.taskId, updateTaskDto);
  }

  @Patch(':id/tasks/:taskId/status')
  updateStatus(@Req() req: Request, @Param() params: IdDto, @Body() updateTaskStatusDto: UpdateTaskStatusDto) {
    return this.tasksService.updateStatus(req, params.taskId, updateTaskStatusDto);
  }

  @Delete(':id/tasks/:taskId')
  removeTask(@Req() req: Request, @Param() params: IdDto) {
    return this.tasksService.removeTask(req, params.taskId);
  }
}
