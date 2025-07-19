import { Controller, Get, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { SectionsService } from './sections.service';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  async create(@Body('idea') idea: string) {
    try {
      // Validate input
      if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
        throw new HttpException(
          'Idea is required and must be a non-empty string',
          HttpStatus.BAD_REQUEST
        );
      }

      // Trim the idea to remove extra whitespace
      const trimmedIdea = idea.trim();

      // Create section and save to MongoDB
      const result = await this.sectionsService.createSection(trimmedIdea);
      
      return {
        success: true,
        message: 'Sections generated successfully',
        data: result
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to generate sections',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const sections = await this.sectionsService.findAll();
      return {
        success: true,
        data: sections
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch sections',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
