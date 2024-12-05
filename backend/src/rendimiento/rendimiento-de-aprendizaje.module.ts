import { Module } from '@nestjs/common';
import { RendimientoDeAprendizajeService } from './rendimiento-de-aprendizaje.service';
import { RendimientoDeAprendizajeController } from './rendimiento-de-aprendizaje.controller';
import { PrismaService } from 'src/prisma/prisma.service'; // Importa el servicio de Prisma

@Module({
  controllers: [RendimientoDeAprendizajeController],
  providers: [RendimientoDeAprendizajeService, PrismaService],
})
export class RendimientoDeAprendizajeModule {}
