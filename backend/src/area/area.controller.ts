import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AreaService } from './area.service';

@Controller('areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  // Obtener todas las áreas
  @Get()
  async getAllAreas() {
    return this.areaService.getAllAreas();
  }

  // Crear una nueva área
  @Post()
  async createArea(@Body() body: { area: string; descripcion?: string }) {
    return this.areaService.createArea(body);
  }

  // Obtener un área por ID
  @Get(':id')
async getAreaById(@Param('id') id: string) {  // Mantén el tipo 'string' porque es lo que NestJS recibe
  const numericId = parseInt(id, 10);  // Convertir la cadena a número
  if (isNaN(numericId)) {
    throw new Error('El ID proporcionado no es un número válido');
  }
  return this.areaService.getAreaById(numericId);
}

  // Actualizar un área
  @Patch(':id')
  async updateArea(
    @Param('id') id: number,
    @Body() body: { area?: string; descripcion?: string }
  ) {
    return this.areaService.updateArea(id, body);
  }

  // Eliminar un área
  @Delete(':id')
  async deleteArea(@Param('id') id: number) {
    return this.areaService.deleteArea(id);
  }
}
