import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  app.enableCors();

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

  // Definir portas alternativas para tentar se a padrão estiver ocupada
  const portOptions = [
    parseInt(process.env.PORT || '3000', 10),
    3001,
    3002,
    3003
  ];

  // Função para tentar conectar em diferentes portas
  async function attemptToListen() {
    for (const port of portOptions) {
      try {
        await app.listen(port);
        console.log(`Aplicação rodando na porta ${port}`);
        return true;
      } catch (error) {
        if (error.code === 'EADDRINUSE') {
          console.log(`Porta ${port} já está em uso, tentando próxima...`);
          continue;
        }
        // Se for outro tipo de erro, lançar novamente
        throw error;
      }
    }
    // Se chegou aqui, todas as portas falharam
    throw new Error(`Não foi possível iniciar o servidor. Todas as portas (${portOptions.join(', ')}) estão em uso.`);
  }

  await attemptToListen();
}
bootstrap();
