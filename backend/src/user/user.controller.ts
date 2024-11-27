import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';  // Importamos el tipo User de Prisma

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Crear un usuario
  @Post()
  async createUser(@Body() body: { fullName: string; email: string; password: string; role: string }): Promise<User> {
    const { fullName, email, password, role } = body;

    return this.userService.createUser({
      fullName,
      role,
      email,  // Asegúrate de incluir el campo 'email' directamente
      password,  // Asegúrate de incluir el campo 'password' directamente
      credenciales: {
        create: {
          email, // Crear las credenciales con el mismo email
          password, // Y la contraseña (cifrada dentro del servicio)
        },
      },
    });
  }

  // Obtener todos los usuarios
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  // Obtener un usuario por ID
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.getUserById(id); // Ahora pasamos 'id' directamente como string
  }

  // Actualizar un usuario (PATCH para actualización parcial)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string, // El id sigue siendo string en el controlador
    @Body() body: { fullName?: string; email?: string; password?: string; role?: string; dateOfBirth?: string; phoneNumber?: string; address?: string; city?: string; school?: string }
  ): Promise<User> {
    const numericId = parseInt(id, 10); // Convertimos el id de string a number
    if (isNaN(numericId)) {
      throw new Error('El ID proporcionado no es válido');
    }
    return this.userService.updateUser(numericId, body); // Pasamos el id como number
  }

  // Eliminar un usuario
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id); // 'id' es string
  }
}
