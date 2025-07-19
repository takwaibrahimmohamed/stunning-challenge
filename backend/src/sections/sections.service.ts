import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from './schemas/section.schema';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name)
    private sectionModel: Model<SectionDocument>,
  ) {}

  async createSection(idea: string): Promise<Section> {
    try {
      // Generate contextual dummy sections based on the idea
      const dummySections = this.generateDummySections(idea);

      // Create and save the section to MongoDB
      const created = new this.sectionModel({ 
        idea, 
        sections: dummySections 
      });
      
      const savedSection = await created.save();
      return savedSection;
    } catch (error) {
      throw new Error(`Failed to create section: ${error.message}`);
    }
  }

  async findAll(): Promise<Section[]> {
    try {
      return await this.sectionModel.find().exec();
    } catch (error) {
      throw new Error(`Failed to fetch sections: ${error.message}`);
    }
  }

  private generateDummySections(idea: string): { title: string; content: string }[] {
    // Generate more contextual sections based on the idea
    const sections = [
      {
        title: 'Hero',
        content: `Welcome to ${idea}! Discover amazing solutions and innovative approaches that will transform your experience.`
      },
      {
        title: 'About',
        content: `${idea} is built with cutting-edge technology and user-centered design principles. We focus on delivering exceptional value and outstanding user experiences.`
      },
      {
        title: 'Contact',
        content: `Ready to get started with ${idea}? Our team is here to help you succeed. Reach out to us today and let's build something amazing together!`
      }
    ];

    return sections;
  }
}
