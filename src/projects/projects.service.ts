import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/project.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>
  ){}
  create(createProjectDto: CreateProjectDto) {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  findAll() {
    return this.projectModel.find({});
  }

  async findOne(id: string) {

    const project = await this.projectModel.findById(id).populate('tasks');

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectModel.findByIdAndUpdate(
      id,
      updateProjectDto,
      { new: true }
    )

    if (!project) {
      return new NotFoundException('Project not found');
    }

    return project
  }

  async remove(id: number) {
    const project = await this.projectModel.findByIdAndDelete(id);
    if (!project) {
      return new NotFoundException('Project not found');
    }

    return project
  }
}
