// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AreaModule } from './area/area.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule, 
    UserModule, 
    ConfigModule.forRoot(),
    AuthModule,
    AreaModule,
  ],
})
export class AppModule {}
