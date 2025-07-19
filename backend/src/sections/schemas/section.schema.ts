import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type SectionDocument = Section & Document;
@Schema({ timestamps: true })
export class Section {
  @Prop()
  idea: string;

  @Prop({ type: [{ title: String, content: String }] })
  sections: { title: string; content: string }[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);