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
    console.log('--------- JwtAuthGuard: Verificando requisição ---------');
    console.log('Método:', request.method);
    console.log('URL:', request.url);
    console.log('Headers:', request.headers);
    console.log('Body:', request.body);

    // Verificar se o token existe e analisá-lo para debug
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length);
      try {
        const decoded = this.jwtService.decode(token);
        console.log('Token decodificado:', decoded);

        // Verificar se o token expirou
        if (decoded && decoded['exp']) {
          const expTime = new Date(decoded['exp'] * 1000);
          const now = new Date();
          console.log(`Token expira em: ${expTime.toISOString()}`);
          console.log(`Hora atual: ${now.toISOString()}`);
          console.log(`Token expirado? ${expTime < now ? 'Sim' : 'Não'}`);
        }
      } catch (e) {
        console.error('Erro ao decodificar token:', e);
      }
    } else {
      console.log('Nenhum token JWT encontrado no cabeçalho Authorization');
    }

    console.log('--------- Fim da verificação ---------');

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
