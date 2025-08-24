import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should validate a user successfully with correct credentials', async () => {
      const user = {
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10),
      };

      mockUsersService.findByEmail.mockResolvedValue(user);

      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toBeDefined();
      expect(result.email).toEqual('test@example.com');
    });

    it('should return null for invalid credentials', async () => {
      const user = {
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10),
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

      const result = await service.login(user);
      expect(result.access_token).toEqual('test-token');
      expect(jwtService.sign).toHaveBeenCalled();
    });
  });
});
