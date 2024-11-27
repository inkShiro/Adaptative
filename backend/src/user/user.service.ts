import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Crear un nuevo usuario con credenciales cifradas
  async createUser(data: Prisma.UserCreateInput & { password: string; email: string }): Promise<User> {
    const hashedPassword = await hash(data.password, 10); // Cifrar la contraseña

    return this.prisma.user.create({
      data: {
        ...data,
        credenciales: {
          create: {
            email: data.email,
            password: hashedPassword,
          },
        },
      },
      include: { credenciales: true }, // Incluir las credenciales en el resultado
    });
  }

  // Obtener todos los usuarios
  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { credenciales: true }, // Incluir credenciales
    });
  }

  // Obtener un usuario por ID
  async getUserById(id: string): Promise<User | null> {
    const numericId = parseInt(id, 10); // Convertir el ID a un número
  
    if (isNaN(numericId)) {
      throw new Error('El ID proporcionado no es un número válido');
    }
  
    return this.prisma.user.findUnique({
      where: { id: numericId },
      include: { credenciales: true }, // Incluir credenciales
    });
  }

  // Actualizar un usuario con credenciales cifradas si es necesario
  async updateUser(
    id: number,
    data: Prisma.UserUpdateInput & { password?: string; email?: string; dateOfBirth?: string },
  ): Promise<User> {
    const updateData: Prisma.UserUpdateInput = {};
  
    // Si se incluye una nueva contraseña, cifrarla
    if (data.password) {
      updateData.credenciales = {
        update: {
          password: await hash(data.password, 10), // Cifrar la nueva contraseña
        },
      };
    }
  
    // Si se incluye un nuevo email, actualizarlo
    if (data.email) {
      updateData.credenciales = {
        update: {
          ...updateData.credenciales,
          email: data.email,
        },
      };
    }
  
    // Actualizar otros campos
    if (data.fullName) {
      updateData.fullName = data.fullName;
    }
  
    if (data.role) {
      updateData.role = data.role;
    }
  
    // Verificar y actualizar la fecha de nacimiento solo si es válida
    if (data.dateOfBirth) {
      // Convertir la fecha en formato ISO-8601 a un objeto Date
      const dateOfBirth = new Date(data.dateOfBirth);
      if (!isNaN(dateOfBirth.getTime())) {
        updateData.dateOfBirth = {
          set: dateOfBirth, // Usar el operador `set` para asignar la fecha correctamente
        };
      } else {
        throw new Error('Fecha de nacimiento no válida');
      }
    }
  
    // Actualizar otros campos opcionales
    if (data.phoneNumber) {
      updateData.phoneNumber = data.phoneNumber;
    }
  
    if (data.address) {
      updateData.address = data.address;
    }
  
    if (data.city) {
      updateData.city = data.city;
    }
  
    if (data.school) {
      updateData.school = data.school;
    }
  
    return this.prisma.user.update({
      where: { id },
      data: updateData,
      include: { credenciales: true }, // Incluir credenciales
    });
  }
  
  

  // Eliminar un usuario (y sus credenciales automáticamente)
  async deleteUser(id: string): Promise<User> {
    const numericId = parseInt(id, 10); // Convertir el ID de tipo string a número
  
    if (isNaN(numericId)) {
      throw new Error('El ID proporcionado no es un número válido');
    }
  
    return this.prisma.user.delete({
      where: { id: numericId }, // Usar el ID numérico para la operación de eliminación
    });
  }
  
}
