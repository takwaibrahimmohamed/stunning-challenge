import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Section, SectionSchema } from './schemas/section.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }])
  ],
  providers: [SectionsService],
  controllers: [SectionsController]
})
export class SectionsModule {}
