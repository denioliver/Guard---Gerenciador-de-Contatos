import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from '../schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) { }

  async create(
    createContactDto: CreateContactDto,
    userId: string
  ): Promise<Contact> {
    const newContact = new this.contactModel({
      ...createContactDto,
      usuario: userId,
    });
    return newContact.save();
  }

  async findAll(userId: string): Promise<Contact[]> {
    return this.contactModel.find({ usuario: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Contact> {
    const contact = await this.contactModel
      .findOne({ _id: id, usuario: userId })
      .exec();
    if (!contact) {
      throw new NotFoundException('Contato não encontrado');
    }
    return contact;
  }

  async update(
    id: string,
    updateContactDto: CreateContactDto,
    userId: string
  ): Promise<Contact> {
    const existingContact = await this.contactModel
      .findOneAndUpdate(
        { _id: id, usuario: userId },
        { $set: updateContactDto },
        { new: true }
      )
      .exec();

    if (!existingContact) {
      throw new NotFoundException('Contato não encontrado');
    }
    return existingContact;
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.contactModel
      .deleteOne({ _id: id, usuario: userId })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Contato não encontrado');
    }
  }
}
