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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Tipo definido diretamente para solucionar o problema de compilação
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @UploadedFile() file: MulterFile,
    @Body() body: any,
    @Request() req: any
  ) {
    let avatarBase64: string | undefined = undefined;
    if (file) {
      avatarBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    } else if (body.avatar) {
      avatarBase64 = body.avatar;
    }
    const contactData = {
      nome: body.nome,
      telefone: body.telefone,
      email: body.email,
      observacoes: body.observacoes,
      avatar: avatarBase64,
    };
    return this.contactsService.create(contactData, req.user.userId);
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
