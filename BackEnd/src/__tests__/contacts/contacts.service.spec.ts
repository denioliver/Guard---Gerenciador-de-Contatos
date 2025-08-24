import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from '../../contacts/contacts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Contact } from '../../schemas/contact.schema';
import { NotFoundException } from '@nestjs/common';
import { CreateContactDto } from '../../contacts/dto/create-contact.dto';

describe('ContactsService', () => {
  let service: ContactsService;
  let mockModel: any;

  const userId = 'user123';

  const mockContact = {
    _id: 'contact123',
    nome: 'John Doe',
    email: 'john@example.com',
    telefone: '123456789',
    usuario: userId,
    observacoes: 'Teste',
  };

  beforeEach(async () => {
    mockModel = {
      find: jest.fn().mockReturnThis(),
      findOne: jest.fn().mockReturnThis(),
      findOneAndUpdate: jest.fn().mockReturnThis(),
      deleteOne: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      save: jest.fn(),
    };

    // Criar mock para o construtor do modelo Mongoose
    const mockContactModelToken = function () {
      return {
        ...mockModel,
        save: jest.fn().mockResolvedValue(mockContact),
      };
    };

    Object.assign(mockContactModelToken, {
      find: jest.fn().mockReturnThis(),
      findOne: jest.fn().mockReturnThis(),
      findOneAndUpdate: jest.fn().mockReturnThis(),
      deleteOne: jest.fn().mockReturnThis(),
      exec: jest.fn(),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        {
          provide: getModelToken(Contact.name),
          useValue: mockContactModelToken,
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar uma lista de contatos do usuário', async () => {
      const mockContacts = [mockContact];
      const findSpy = jest.spyOn(service['contactModel'], 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockContacts),
      } as any);

      const result = await service.findAll(userId);

      expect(result).toEqual(mockContacts);
      expect(findSpy).toHaveBeenCalledWith({ usuario: userId });
    });
  });

  describe('findOne', () => {
    it('deve retornar um contato específico se encontrado', async () => {
      const contactId = 'contact123';

      jest.spyOn(service['contactModel'], 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockContact),
      } as any);

      const result = await service.findOne(contactId, userId);

      expect(result).toEqual(mockContact);
    });

    it('deve lançar um NotFoundException se o contato não for encontrado', async () => {
      const contactId = 'nonexistent';

      jest.spyOn(service['contactModel'], 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(service.findOne(contactId, userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve atualizar e retornar um contato existente', async () => {
      const contactId = 'contact123';
      const updateData: Partial<CreateContactDto> = {
        nome: 'Updated Name',
        email: 'updated@example.com',
        telefone: '555555555',
      };

      const updatedContact = {
        ...updateData,
        _id: contactId,
        usuario: userId,
      };

      jest.spyOn(service['contactModel'], 'findOneAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(updatedContact),
      } as any);

      const result = await service.update(contactId, updateData as CreateContactDto, userId);

      expect(result).toEqual(updatedContact);
    });

    it('deve lançar um NotFoundException se o contato não existir', async () => {
      const contactId = 'nonexistent';
      const updateData: Partial<CreateContactDto> = {
        nome: 'Updated Name',
        email: 'updated@example.com',
      };

      jest.spyOn(service['contactModel'], 'findOneAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(service.update(contactId, updateData as CreateContactDto, userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('deve remover um contato existente', async () => {
      const contactId = 'contact123';

      jest.spyOn(service['contactModel'], 'deleteOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce({ deletedCount: 1 }),
      } as any);

      await service.remove(contactId, userId);
    });

    it('deve lançar um NotFoundException se o contato não existir', async () => {
      const contactId = 'nonexistent';

      jest.spyOn(service['contactModel'], 'deleteOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce({ deletedCount: 0 }),
      } as any);

      await expect(service.remove(contactId, userId)).rejects.toThrow(NotFoundException);
    });
  });
});
