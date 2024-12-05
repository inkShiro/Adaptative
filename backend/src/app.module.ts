// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AreaModule } from './area/area.module';
import { QuestionModule } from './question/question.module';
import { ConfigModule } from '@nestjs/config';
import { ContentModule } from './content/content.module';
import { RendimientoDeAprendizajeModule } from './rendimiento/rendimiento-de-aprendizaje.module';


@Module({
  imports: [
    PrismaModule, 
    UserModule, 
    ConfigModule.forRoot(),
    AuthModule,
    AreaModule,
    QuestionModule,
    ContentModule,
    RendimientoDeAprendizajeModule,
  ],
})
export class AppModule {}
