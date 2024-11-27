import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de tener el PrismaService
import { JwtModule } from '@nestjs/jwt'; // Para trabajar con JWT
import { ConfigModule, ConfigService } from '@nestjs/config'; // Para cargar configuraciones

@Module({
  imports: [
    ConfigModule, // Para cargar configuraciones desde .env
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // El secreto del JWT desde .env
        signOptions: { expiresIn: '1h' }, // Expiración del token
      }),
    }),
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
