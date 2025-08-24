import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// Mock do módulo bcrypt para evitar problemas com os testes
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should validate a user successfully with correct credentials', async () => {
      // Configurar o mock para retornar true
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const user = {
        email: 'test@example.com',
        senha: 'hashed_password',
      };

      mockUsersService.findByEmail.mockResolvedValue(user);

      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toBeDefined();
      expect(result).toHaveProperty('email', 'test@example.com');
    });

    it('should return null for invalid credentials', async () => {
      // Configurar o mock para retornar false
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const user = {
        email: 'test@example.com',
        senha: 'hashed_password',
      };

      mockUsersService.findByEmail.mockResolvedValue(user);

      const result = await service.validateUser('test@example.com', 'wrong-password');
      expect(result).toBeNull();
    });

    it('should return null if user does not exist', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('nonexistent@example.com', 'password');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should generate JWT token for authenticated user', async () => {
      const user = {
        _id: '123',
        email: 'test@example.com',
      };

      mockJwtService.sign.mockReturnValue('test-token');

      const result = service.login(user);
      expect(result.access_token).toEqual('test-token');
      expect(mockJwtService.sign).toHaveBeenCalled();
    });
  });
});
