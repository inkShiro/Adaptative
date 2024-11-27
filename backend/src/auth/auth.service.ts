import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Importa tu PrismaService
import { compare } from 'bcrypt'; // Librería para comparar contraseñas cifradas
import { JwtService } from '@nestjs/jwt'; // Para manejar la generación del token JWT

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name); // Inicializar el servicio de Logger

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService, // Inyección de JwtService
  ) {}

  // Método de login
  async login(email: string, password: string) {

    const credenciales = await this.prisma.credenciales.findUnique({
      where: { email },
      include: { user: true },
    });

    if (!credenciales) {
      throw new UnauthorizedException('Credenciales inválidas');
    }


    const isPasswordValid = await compare(password, credenciales.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: credenciales.user.id,
      email: credenciales.email,
      role: credenciales.user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      role: credenciales.user.role,
      id: credenciales.user.id,
    };
  }
}
