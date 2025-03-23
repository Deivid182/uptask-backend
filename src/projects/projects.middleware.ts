import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ProjectsService } from './projects.service';
import { Project } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      project: Project
    }
  }
}

@Injectable()
export class ProjectsMiddleware implements NestMiddleware {
  constructor(
    private readonly projectsService: ProjectsService
  ){}
  async use(req: Request, res: Response, next: NextFunction) {
    const project = await this.projectsService.findOne(req.params.id);
    req.project = project
  }
}
