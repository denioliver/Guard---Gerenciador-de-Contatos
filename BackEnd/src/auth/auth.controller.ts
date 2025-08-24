import { Controller, Post, Body, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto.nome, createUserDto.email, createUserDto.senha);
  }

  @Post('validate-password')
  async validatePassword(@Body() body: { email: string; senha: string }) {
    try {
      if (!body.email) {
        throw new HttpException('Email não fornecido', HttpStatus.BAD_REQUEST);
      }

      if (!body.senha) {
        throw new HttpException('Senha não fornecida', HttpStatus.BAD_REQUEST);
      }

      console.log(`Validando senha para o email: ${body.email}`);

      const result = await this.authService.validateUser(body.email, body.senha);
      if (result) {
        return { valid: true, message: 'Senha validada com sucesso' };
      }
      throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      console.error('Erro ao validar senha:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro ao validar senha', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
