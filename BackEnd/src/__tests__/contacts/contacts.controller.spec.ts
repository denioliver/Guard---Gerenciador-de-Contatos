import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from '../../contacts/contacts.controller';
import { ContactsService } from '../../contacts/contacts.service';
import { CreateContactDto } from '../../contacts/dto/create-contact.dto';
import { NotFoundException } from '@nestjs/common';
import { Request } from 'express';

describe('ContactsController', () => {
  let controller: ContactsController;
  let service: ContactsService;

  const mockContactsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockContact = {
    _id: 'contact123',
    nome: 'John Doe',
    email: 'john@example.com',
    telefone: '123456789',
    usuario: 'user123',
    observacoes: 'Teste',
  };

  const mockRequest = {
    user: {
      userId: 'user123'
    }
  } as unknown as Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [
        {
          provide: ContactsService,
          useValue: mockContactsService,
        },
      ],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
    service = module.get<ContactsService>(ContactsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar todos os contatos do usuário', async () => {
      const mockContacts = [mockContact];
      mockContactsService.findAll.mockResolvedValue(mockContacts);

      const result = await controller.findAll(mockRequest);

      expect(result).toEqual(mockContacts);
      expect(mockContactsService.findAll).toHaveBeenCalledWith('user123');
    });
  });

  describe('findOne', () => {
    it('deve retornar um contato específico', async () => {
      mockContactsService.findOne.mockResolvedValue(mockContact);

      const result = await controller.findOne('contact123', mockRequest);

      expect(result).toEqual(mockContact);
      expect(mockContactsService.findOne).toHaveBeenCalledWith('contact123', 'user123');
    });

    it('deve propagar erro se o contato não for encontrado', async () => {
      mockContactsService.findOne.mockRejectedValue(new NotFoundException('Contato não encontrado'));

      await expect(controller.findOne('nonexistent', mockRequest)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('deve criar e retornar um novo contato', () => {
      const createContactDto: CreateContactDto = {
        nome: 'New Contact',
        email: 'new@example.com',
        telefone: '987654321',
      };

      const createdContact = {
        ...createContactDto,
        _id: 'new123',
        usuario: 'user123',
      };

      mockContactsService.create.mockResolvedValue(createdContact);

      expect(controller).toBeDefined();
    });
  });

  describe('update', () => {
    it('deve atualizar e retornar um contato', async () => {
      const updateContactDto: CreateContactDto = {
        nome: 'Updated Contact',
        email: 'updated@example.com',
        telefone: '555555555',
      };

      const updatedContact = {
        ...updateContactDto,
        _id: 'contact123',
        usuario: 'user123',
      };

      mockContactsService.update.mockResolvedValue(updatedContact);

      const result = await controller.update('contact123', updateContactDto, mockRequest);

      expect(result).toEqual(updatedContact);
      expect(mockContactsService.update).toHaveBeenCalledWith('contact123', updateContactDto, 'user123');
    });

    it('deve propagar erro se o contato a ser atualizado não for encontrado', async () => {
      const updateContactDto: CreateContactDto = {
        nome: 'Updated Contact',
        email: 'updated@example.com',
        telefone: '555555555',
      };

      mockContactsService.update.mockRejectedValue(new NotFoundException('Contato não encontrado'));

      await expect(controller.update('nonexistent', updateContactDto, mockRequest)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deve remover um contato', async () => {
      mockContactsService.remove.mockResolvedValue(undefined);

      await controller.remove('contact123', mockRequest);

      expect(mockContactsService.remove).toHaveBeenCalledWith('contact123', 'user123');
    });

    it('deve propagar erro se o contato a ser removido não for encontrado', async () => {
      mockContactsService.remove.mockRejectedValue(new NotFoundException('Contato não encontrado'));

      await expect(controller.remove('nonexistent', mockRequest)).rejects.toThrow(NotFoundException);
    });
  });
});
