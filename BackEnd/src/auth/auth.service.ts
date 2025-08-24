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
      interface MongooseUser {
        toObject?: () => Record<string, unknown>;
        senha?: string;
        _id?: any;
        [key: string]: unknown;
      }
      const mongooseUser = user as unknown as MongooseUser;
      const userObj =
        typeof mongooseUser.toObject === 'function' ? mongooseUser.toObject() : { ...mongooseUser };
      if ('senha' in userObj) {
        delete userObj.senha;
      }
      if (userObj._id) {
        userObj._id = userObj._id.toString();
      }
      return userObj;
    }
    return null;
  }

  login(user: { _id?: string; id?: string; email: string }) {
    const userId = user._id || user.id;
    if (!userId) {
      throw new UnauthorizedException('Usuário sem id. Não é possível gerar token.');
    }
    const payload = {
      email: user.email,
      sub: String(userId),
    };

    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    return {
      access_token: token,
    };
  }

  async register(nome: string, email: string, senha: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email já está em uso');
    }

    const user = await this.usersService.create({ nome, email, senha });
    if (!user._id) {
      throw new UnauthorizedException('Falha ao criar usuário: id não gerado.');
    }
    const payload = {
      email: user.email,
      sub: user._id.toString(),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
