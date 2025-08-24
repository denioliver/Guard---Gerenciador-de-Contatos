import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  service: process.env.EMAIL_SERVICE || 'gmail',
  user: process.env.EMAIL_USER || '',
  pass: process.env.EMAIL_PASSWORD || '',
  from: process.env.EMAIL_FROM || '',
}));
