import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SchedulerService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron('*/1 * * * *')
  async handleCron() {
    const now = new Date();
    await this.prisma.token.deleteMany({
      where: {
        expiresAt: {
          lt: now,
        },
      },
    });
    console.log('Expired tokens deleted');
  }
}
