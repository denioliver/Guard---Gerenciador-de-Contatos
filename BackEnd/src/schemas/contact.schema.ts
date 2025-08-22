import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from './user.schema';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({ timestamps: true })
export class Contact {
  _id: Types.ObjectId;

  @Prop({ required: true })
  nome: string;

  @Prop()
  email: string;

  @Prop()
  telefone: string;

  @Prop()
  observacoes: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  usuario: User;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
