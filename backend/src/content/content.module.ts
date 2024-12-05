import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de importar PrismaService correctamente

@Module({
  controllers: [ContentController],
  providers: [ContentService, PrismaService],
})
export class ContentModule {}
