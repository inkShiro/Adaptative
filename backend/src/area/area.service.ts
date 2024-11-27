import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Area } from '@prisma/client'; // Asegúrate de tener Prisma generado

@Injectable()
export class AreaService {
  constructor(private prisma: PrismaService) {}

  // Crear un nuevo área
  async createArea(data: { area: string; descripcion?: string }): Promise<Area> {
    return this.prisma.area.create({
      data: {
        area: data.area,
        descripcion: data.descripcion || null,
      },
    });
  }

  // Obtener todas las áreas
  async getAllAreas(): Promise<Area[]> {
    return this.prisma.area.findMany();
  }

  // Obtener un área por ID
  async getAreaById(id: number): Promise<Area | null> {
    return this.prisma.area.findUnique({
      where: { id },
    });
  }

  // Actualizar un área
  async updateArea(id: number, data: { area?: string; descripcion?: string }): Promise<Area> {
    return this.prisma.area.update({
      where: { id },
      data,
    });
  }

  // Eliminar un área
  async deleteArea(id: number): Promise<Area> {
    return this.prisma.area.delete({
      where: { id },
    });
  }
}
