import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RendimientoDeAprendizajeService {
  constructor(private readonly prisma: PrismaService) {}

  async getRendimientoByUserId(userId: number) {
    // Verificar si el usuario existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    let rendimiento = await this.prisma.rendimientoDeAprendizaje.findUnique({
      where: { userId },
    });

    // Si el rendimiento no existe, crear uno nuevo con los valores en 0
    if (!rendimiento) {
      rendimiento = await this.prisma.rendimientoDeAprendizaje.create({
        data: {
          userId,
          aprendizajeVisual: 0,
          aprendizajeAuditivo: 0,
          aprendizajeKinestesico: 0,
          aprendizajeLecturaEscritura: 0,
          aprendizajeSecuencial: 0,
          aprendizajeGlobal: 0,
          aprendizajeActivo: 0,
          aprendizajeReflexivo: 0,
          aprendizajeSocial: 0,
          aprendizajeIndividual: 0,
        },
      });
    }

    // Si el rendimiento existe, actualizamos los valores nulos a 0
    else {
      rendimiento = await this.prisma.rendimientoDeAprendizaje.update({
        where: { userId },
        data: {
          aprendizajeVisual: rendimiento.aprendizajeVisual ?? 0,
          aprendizajeAuditivo: rendimiento.aprendizajeAuditivo ?? 0,
          aprendizajeKinestesico: rendimiento.aprendizajeKinestesico ?? 0,
          aprendizajeLecturaEscritura: rendimiento.aprendizajeLecturaEscritura ?? 0,
          aprendizajeSecuencial: rendimiento.aprendizajeSecuencial ?? 0,
          aprendizajeGlobal: rendimiento.aprendizajeGlobal ?? 0,
          aprendizajeActivo: rendimiento.aprendizajeActivo ?? 0,
          aprendizajeReflexivo: rendimiento.aprendizajeReflexivo ?? 0,
          aprendizajeSocial: rendimiento.aprendizajeSocial ?? 0,
          aprendizajeIndividual: rendimiento.aprendizajeIndividual ?? 0,
        },
      });
    }

    return rendimiento;
  }

  async getProgresoTemaByUserId(userId: number, temaId: number) {
    // Verificar si el usuario existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    // Buscar el progreso del tema
    let progresoTema = await this.prisma.progresoTema.findUnique({
        where: {
          temaId_usuarioId: { // Usa la clave compuesta
            temaId: temaId,
            usuarioId: userId,
          },
        },
      });

    // Si el progreso no existe, crear uno nuevo con el progreso en 0.0
    if (!progresoTema) {
      progresoTema = await this.prisma.progresoTema.create({
        data: {
          usuarioId: userId,
          temaId: temaId,
          progreso: 0.0, // Valor por defecto
        },
      });
    }

    return progresoTema;
  }

  async getProgresoConceptoByUserId(userId: number, conceptoId: number) {
    // Verificar si el usuario existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    // Buscar el progreso del concepto
    let progresoConcepto = await this.prisma.progresoConcepto.findUnique({
        where: {
          conceptoId_usuarioId: { // Usa la clave compuesta
            conceptoId: conceptoId,
            usuarioId: userId,
          },
        },
      });
      

    // Si el progreso no existe, crear uno nuevo con el progreso en 0.0
    if (!progresoConcepto) {
      progresoConcepto = await this.prisma.progresoConcepto.create({
        data: {
          usuarioId: userId,
          conceptoId: conceptoId,
          progreso: 0.0, // Valor por defecto
        },
      });
    }

    return progresoConcepto;
  }

  async setProgresoTemaByUserId(userId: number, temaId: number, progreso: number) {
    // Verificar si el usuario existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    // Actualizar el progreso del tema
    const progresoTema = await this.prisma.progresoTema.upsert({
      where: {
        temaId_usuarioId: {
          temaId: temaId,
          usuarioId: userId,
        },
      },
      update: {
        progreso, // Actualiza el progreso
      },
      create: {
        usuarioId: userId,
        temaId: temaId,
        progreso, // Valor por defecto
      },
    });

    return progresoTema;
  }

  async setProgresoConceptoByUserId(userId: number, conceptoId: number, progreso: number) {
    // Verificar si el usuario existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    // Actualizar el progreso del concepto
    const progresoConcepto = await this.prisma.progresoConcepto.upsert({
      where: {
        conceptoId_usuarioId: {
          conceptoId: conceptoId,
          usuarioId: userId,
        },
      },
      update: {
        progreso, // Actualiza el progreso
      },
      create: {
        usuarioId: userId,
        conceptoId: conceptoId,
        progreso, // Valor por defecto
      },
    });

    return progresoConcepto;
  }

  async getProgresoTemasByAreaAndUser(userId: number, areaId: number) {
    // Verificar si el usuario existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!userExists) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
  
    // Verificar si el área existe
    const areaExists = await this.prisma.area.findUnique({
      where: { id: areaId },
    });
  
    if (!areaExists) {
      throw new NotFoundException(`Área con ID ${areaId} no encontrada`);
    }
  
    // Obtener los temas del área
    const temas = await this.prisma.tema.findMany({
      where: { areaId },
    });
  
    // Obtener el progreso de cada tema para el usuario
    const progresoTemas = await Promise.all(
      temas.map(async (tema) => {
        return this.prisma.progresoTema.findUnique({
          where: {
            temaId_usuarioId: {
              temaId: tema.id,
              usuarioId: userId,
            },
          },
        });
      })
    );
  
    return progresoTemas;
  }

  async getProgresoConceptosByTemaAndUser(userId: number, temaId: number, areaId: number) {
    // Verificar si el usuario existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!userExists) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
  
    // Verificar si el tema y el área existen
    const temaExists = await this.prisma.tema.findUnique({
      where: { id: temaId },
    });
  
    if (!temaExists) {
      throw new NotFoundException(`Tema con ID ${temaId} no encontrado`);
    }
  
    const areaExists = await this.prisma.area.findUnique({
      where: { id: areaId },
    });
  
    if (!areaExists) {
      throw new NotFoundException(`Área con ID ${areaId} no encontrada`);
    }
  
    // Obtener los conceptos del tema
    const conceptos = await this.prisma.concepto.findMany({
      where: { temaId },
    });
  
    // Obtener el progreso de cada concepto para el usuario
    const progresoConceptos = await Promise.all(
      conceptos.map(async (concepto) => {
        return this.prisma.progresoConcepto.findUnique({
          where: {
            conceptoId_usuarioId: {
              conceptoId: concepto.id,
              usuarioId: userId,
            },
          },
        });
      })
    );
  
    return progresoConceptos;
  }  

  async getPromedioPuntuacion(userId: number) {
    // Verificar si el usuario existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!userExists) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
  
    // Obtener las estadísticas de respuesta para el usuario
    const respuestas = await this.prisma.estadisticaDeRespuesta.findMany({
      where: { userId },
      select: { puntuacion: true },
    });
  
    // Si no hay respuestas, retornar 0.5
    if (respuestas.length === 0) {
      return 0.5;
    }
  
    // Calcular el promedio de las puntuaciones
    const totalPuntuacion = respuestas.reduce((acc, respuesta) => acc + respuesta.puntuacion, 0);
    const promedio = totalPuntuacion / respuestas.length;
  
    return promedio;
  }

}
