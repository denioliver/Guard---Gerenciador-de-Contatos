import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    description: 'Nome do contato',
    example: 'Maria Silva',
  })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome deve ser uma string' })
  readonly nome: string;

  @ApiPropertyOptional({
    description: 'Email do contato',
    example: 'maria.silva@email.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  readonly email?: string;

  @ApiPropertyOptional({
    description: 'Telefone do contato',
    example: '(11) 99999-9999',
  })
  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  readonly telefone?: string;

  @ApiPropertyOptional({
    description: 'Observações sobre o contato',
    example: 'Contato de trabalho',
  })
  @IsOptional()
  @IsString({ message: 'Observações devem ser uma string' })
  readonly observacoes?: string;
}
