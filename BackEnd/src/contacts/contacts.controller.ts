import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @Request() req: { user: { userId: string } },
    @Body() createContactDto: CreateContactDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    const userId = String(req.user.userId);
    if (avatar && (avatar.filename || avatar.originalname)) {
      createContactDto.avatar = avatar.filename || avatar.originalname;
    }
    return this.contactsService.create(createContactDto, userId);
  }
  @Get()
  async findAll(@Request() req: { user: { userId: string } }) {
    return this.contactsService.findAll(String(req.user.userId));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: { user: { userId: string } }) {
    return this.contactsService.findOne(id, String(req.user.userId));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: CreateContactDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.contactsService.update(id, updateContactDto, String(req.user.userId));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: { user: { userId: string } }) {
    return this.contactsService.remove(id, String(req.user.userId));
  }
}
