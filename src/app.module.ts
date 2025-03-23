import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { envs } from './config';
import { SchedulerModule } from './scheduler/scheduler.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailsModule } from './emails/emails.module';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: envs.EMAIL_HOST,
        port: envs.EMAIL_PORT,
        auth: {
          user: envs.EMAIL_USERNAME,
          pass: envs.EMAIL_PASSWORD
        }
      }
    }),
    ProjectsModule, TasksModule, UsersModule, AuthModule, PrismaModule, SchedulerModule, EmailsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
