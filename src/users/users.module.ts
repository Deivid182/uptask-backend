import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailsModule } from 'src/emails/emails.module';

@Module({
  imports: [PrismaModule, EmailsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
