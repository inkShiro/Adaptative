import { Body, Controller, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { RendimientoDeAprendizajeService } from './rendimiento-de-aprendizaje.service';

@Controller('rendimiento-de-aprendizaje')
export class RendimientoDeAprendizajeController {
  constructor(
    private readonly rendimientoService: RendimientoDeAprendizajeService,
  ) {}

  @Get(':userId')
  async getRendimiento(@Param('userId', ParseIntPipe) userId: number) {
    return this.rendimientoService.getRendimientoByUserId(userId);
  }

  @Get('tema/:userId/:temaId')
  async getProgresoTema(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('temaId', ParseIntPipe) temaId: number,
  ) {
    return this.rendimientoService.getProgresoTemaByUserId(userId, temaId);
  }

  @Get('concepto/:userId/:conceptoId')
  async getProgresoConcepto(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('conceptoId', ParseIntPipe) conceptoId: number,
  ) {
    return this.rendimientoService.getProgresoConceptoByUserId(userId, conceptoId);
  }

  // Endpoint para actualizar el progreso del tema
  @Put('tema/:userId/:temaId')
  async setProgresoTema(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('temaId', ParseIntPipe) temaId: number,
    @Body('progreso') progreso: number, // Recibimos el progreso como parámetro en el cuerpo de la solicitud
  ) {
    return this.rendimientoService.setProgresoTemaByUserId(userId, temaId, progreso);
  }

  // Endpoint para actualizar el progreso del concepto
  @Put('concepto/:userId/:conceptoId')
  async setProgresoConcepto(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('conceptoId', ParseIntPipe) conceptoId: number,
    @Body('progreso') progreso: number, // Recibimos el progreso como parámetro en el cuerpo de la solicitud
  ) {
    return this.rendimientoService.setProgresoConceptoByUserId(userId, conceptoId, progreso);
  }

  @Get('area/:userId/:areaId')
    async getProgresoTemas(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('areaId', ParseIntPipe) areaId: number,
    ) {
    return this.rendimientoService.getProgresoTemasByAreaAndUser(userId, areaId);
    }


    @Get('conceptos/:userId/:areaId/:temaId')
    async getProgresoConceptos(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('areaId', ParseIntPipe) areaId: number,
    @Param('temaId', ParseIntPipe) temaId: number,
    ) {
    return this.rendimientoService.getProgresoConceptosByTemaAndUser(userId, temaId, areaId);
    }

    @Get('promedio/:userId')
    async getPromedio(@Param('userId', ParseIntPipe) userId: number) {
    return this.rendimientoService.getPromedioPuntuacion(userId);
  }

}
