import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(envs.DATABASE_URL),
    ProjectsModule, TasksModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
