import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';

import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Post()
  async create(@Body() createContactDto: CreateContactDto, @Request() req: any) {
    console.log('Headers da requisição:', req.headers);
    console.log('req.user:', req.user);
    console.log('createContactDto:', createContactDto);
    return this.contactsService.create(createContactDto, req.user.userId);
  }

  @Get()
  async findAll(@Request() req: any) {
    return this.contactsService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    return this.contactsService.findOne(id, req.user.userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: CreateContactDto,
    @Request() req: any,
  ) {
    return this.contactsService.update(id, updateContactDto, req.user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    return this.contactsService.remove(id, req.user.userId);
  }
}
