import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as any;

    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length);
      try {
        const decoded = this.jwtService.decode(token);

        if (decoded && decoded['exp']) {
          const expTime = new Date(decoded['exp'] * 1000);
          const now = new Date();
        }
      } catch (e) {
        console.error('Erro ao decodificar token:', e);
      }
    } else {
      console.log('Nenhum token JWT encontrado no cabeçalho Authorization');
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.error('Erro na autenticação JWT:', { error: err, info });
      throw err || new UnauthorizedException('Acesso não autorizado. Token inválido ou expirado.');
    }
    return user;
  }
}
