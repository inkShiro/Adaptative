import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ajusta la ruta de PrismaService según tu estructura

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async getAllAreas() {
    return this.prisma.area.findMany();
  }

  async getAllThemes() {
    return this.prisma.tema.findMany({
      include: {
        area: true, // Incluye la información del área relacionada
      },
    });
  }

  async getAllConcepts() {
    return this.prisma.concepto.findMany({
      include: {
        tema: {
          include: {
            area: true, // Incluye la información del área relacionada a través del tema
          },
        },
      },
    });
  }

  async getConceptsByArea(areaId: number) {
    return this.prisma.concepto.findMany({
      where: {
        tema: {
          areaId: areaId, // Usa el ID del área para la búsqueda
        },
      },
      include: {
        tema: {
          include: {
            area: true, // Incluye la información del área relacionada
          },
        },
      },
    });
  }

  async getConceptsByTheme(themeId: number) {
    return this.prisma.concepto.findMany({
      where: {
        temaId: themeId, // Usa el ID del tema para la búsqueda
      },
      include: {
        tema: {
          include: {
            area: true, // Incluye la información del área relacionada
          },
        },
      },
    });
  }

  async getAreasByTheme(themeId: number) {
    return this.prisma.tema.findFirst({
      where: {
        id: themeId, // Usa el ID del tema para la búsqueda
      },
      include: {
        area: true, // Incluye la información del área relacionada
      },
    });
  }

  async getThemesByArea(areaId: number) {
    return this.prisma.tema.findMany({
      where: {
        areaId: areaId, // Filtra por el ID del área
      },
      include: {
        area: true, // Incluye la información del área relacionada
      },
    });
  }

  async getConceptById(conceptId: number) {
    return this.prisma.concepto.findUnique({
      where: {
        id: conceptId, // Busca por el ID del concepto
      },
      include: {
        tema: {
          include: {
            area: true, // Incluye la información del área relacionada a través del tema
          },
        },
      },
    });
  }
  
}

