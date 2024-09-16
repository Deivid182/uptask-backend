import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(envs.DATABASE_URL),
    ProjectsModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
