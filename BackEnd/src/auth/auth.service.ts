import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(senha, user.senha))) {
      const result = user._doc ? { ...user._doc } : { ...user };
      delete result.senha;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // Garante que user._id está presente
    if (!user._id) {
      const found = await this.usersService.findByEmail(user.email);
      user._id = found?._id;
    }
    const payload = {
      email: user.email,
      sub: user._id.toString(),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(nome: string, email: string, senha: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email já está em uso');
    }

    const user = await this.usersService.create({ nome, email, senha });
    const payload = {
      email: user.email,
      sub: user._id ? user._id.toString() : '',
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
