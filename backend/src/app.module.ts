import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/stunning_challenge'),
    SectionsModule,
  ],
})

export class AppModule {}
