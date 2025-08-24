import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import * as nodemailer from 'nodemailer';
import { UserDocument } from '../schemas/user.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
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

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const user = await this.usersService.findByEmail(email) as UserDocument;
    if (!user) {
      return { success: false, message: 'Email não encontrado.' };
    }

    // Gerar uma senha temporária
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedSenha = await bcrypt.hash(tempPassword, 10);
    user.senha = hashedSenha;
    await user.save();

    // Configurar nodemailer usando o configService
    const emailUser = this.configService.get<string>('email.user');
    const emailPass = this.configService.get<string>('email.pass');
    const emailService = this.configService.get<string>('email.service');
    const emailFrom = this.configService.get<string>('email.from');

    if (!emailUser || !emailPass) {
      return { success: false, message: 'Configuração de e-mail não encontrada.' };
    }

    const transporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: emailFrom || emailUser,
      to: email,
      subject: 'Recuperação de senha - Guard',
      text: `Olá,\n\nSua nova senha temporária é: ${tempPassword}\n\nPor favor, faça login e troque sua senha em seguida.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true, message: 'Senha temporária enviada para o e-mail!' };
    } catch {
      return { success: false, message: 'Erro ao enviar e-mail. Tente novamente mais tarde.' };
    }
  }
}
