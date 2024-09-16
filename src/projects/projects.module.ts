import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectSchema, Project } from './schema/project.schema';
import { TasksService } from 'src/tasks/tasks.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { ProjectsMiddleware } from './projects.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema
      }
    ]), TasksModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProjectsMiddleware).forRoutes(
      { path: '/projects/:id/tasks', method: RequestMethod.GET },
      { path: '/projects/:id/tasks', method: RequestMethod.POST },
      { path: '/projects/:id/tasks/:taskId', method: RequestMethod.GET },
      { path: '/projects/:id/tasks/:taskId', method: RequestMethod.PATCH },
      { path: '/projects/:id/tasks/:taskId/status', method: RequestMethod.PATCH },
      { path: '/projects/:id/tasks/:taskId', method: RequestMethod.DELETE },
    );
  }
}
