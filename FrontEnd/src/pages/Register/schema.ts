import { z } from 'zod';

export const registerSchema = z.object({
  nome: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  senha: z.string()
    .min(8, 'Pelo menos 8 caracteres')
    .regex(/[0-9!@#$%^&*]/, 'Contém um número ou símbolo'),
  confirmarSenha: z.string(),
}).refine(data => data.senha === data.confirmarSenha, {
  message: 'As senhas devem ser iguais',
  path: ['confirmarSenha'],
});
