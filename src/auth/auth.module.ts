import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailsModule } from 'src/emails/emails.module';

@Module({
  imports: [PrismaModule,
    JwtModule.register({
      global: true,
      secret: envs.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    EmailsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
