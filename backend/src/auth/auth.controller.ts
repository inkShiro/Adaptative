import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service'; 

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Ruta para realizar el login
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const { email, password } = loginDto;
    return this.authService.login(email, password);
  }
}
