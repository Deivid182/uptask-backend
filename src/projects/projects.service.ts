import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {

  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.prisma.project.create({
      data: createProjectDto
    })
    return project
  }

  findAll() {
    return this.prisma.project.findMany()
  }

  async findOne(id: string) {

    // const project = await this.projectModel.findById(id).populate('tasks');

    // if (!project) {
    //   throw new NotFoundException('Project not found');
    // }

    // return project;

    const projectFound = await this.prisma.project.findFirst({
      where: {
        id
      },
      include: {
        tasks: true
      }
    })

    if(!projectFound) {
      throw new NotFoundException('Project could not be found')
    }

    return projectFound
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const { clientName, description, projectName } = updateProjectDto
    // const project = await this.projectModel.findByIdAndUpdate(
    //   id,
    //   updateProjectDto,
    //   { new: true }
    // )

    // if (!project) {
    //   throw new NotFoundException('Project not found');
    // }

    // return project
    const projectFound = await this.prisma.project.update({
      where: {
        id
      },
      data: {
        clientName,
        description,
        projectName
      }
    })
    if(!projectFound) {
      throw new NotFoundException('Project could not be found')
    }

    return projectFound
  }

  async remove(id: string) {
    // const project = await this.projectModel.findByIdAndDelete(id);
    // if (!project) {
    //   throw new NotFoundException('Project not found');
    // }

    // return project
    const projectFound = await this.prisma.project.delete({
      where: {
        id
      }
    })

    if(!projectFound) {
      throw new NotFoundException('Project could not be found')
    }
    return projectFound
  }
}
