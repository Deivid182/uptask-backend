import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectsMiddleware } from './projects.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, TasksService],
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
