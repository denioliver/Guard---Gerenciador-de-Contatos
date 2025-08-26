import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://guard.up.railway.app',
        'http://localhost:3000',
        'http://localhost:5173',
        process.env.FRONTEND_URL,
      ].filter(Boolean);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Guard - Gerenciador de Contatos')
    .setDescription('API para gerenciamento de contatos')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('contacts')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const portOptions = [parseInt(process.env.PORT || '3001', 10), 3002, 3003, 3000];

  async function attemptToListen() {
    for (const port of portOptions) {
      try {
        await app.listen(port);
        console.log(`Aplicação rodando na porta ${port}`);
        return true;
      } catch (error: unknown) {
        if (
          typeof error === 'object' &&
          error !== null &&
          'code' in error &&
          (error as { code?: string }).code === 'EADDRINUSE'
        ) {
          console.log(`Porta ${port} já está em uso, tentando próxima...`);
          continue;
        }
        throw error;
      }
    }
    throw new Error(
      `
      Não foi possível iniciar o servidor. Todas as portas (${portOptions.join(', ')}) estão em uso.`,
    );
  }

  await attemptToListen();
}
bootstrap();
