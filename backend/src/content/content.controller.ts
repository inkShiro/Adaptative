import { Controller, Get, Param } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get('areas')
  async getAreas() {
    return this.contentService.getAllAreas();
  }

  @Get('themes')
  async getThemes() {
    return this.contentService.getAllThemes();
  }

  @Get('concepts')
  async getConcepts() {
    return this.contentService.getAllConcepts();
  }

  @Get('concepts/area/:areaId')
  async getConceptsByArea(@Param('areaId') areaId: string) {
    const areaIdInt = parseInt(areaId, 10);
    if (isNaN(areaIdInt)) {
      throw new Error('Invalid areaId');
    }
    return this.contentService.getConceptsByArea(areaIdInt);
  }

  @Get('concepts/theme/:themeId')
  async getConceptsByTheme(@Param('themeId') themeId: string) {
    const themeIdInt = parseInt(themeId, 10);
    if (isNaN(themeIdInt)) {
      throw new Error('Invalid themeId');
    }
    return this.contentService.getConceptsByTheme(themeIdInt);
  }

  @Get('areas/theme/:themeId')
  async getAreasByTheme(@Param('themeId') themeId: string) {
    const themeIdInt = parseInt(themeId, 10);
    if (isNaN(themeIdInt)) {
      throw new Error('Invalid themeId');
    }
    return this.contentService.getAreasByTheme(themeIdInt);
  }

  @Get('theme/:areaId')
  async getThemesByArea(@Param('areaId') areaId: string) {
    const areaIdInt = parseInt(areaId, 10);
    if (isNaN(areaIdInt)) {
      throw new Error('Invalid areaId');
    }
    return this.contentService.getThemesByArea(areaIdInt);
  }

  @Get('concept/:conceptId')
  async getConceptById(@Param('conceptId') conceptId: string) {
    const conceptIdInt = parseInt(conceptId, 10);
    if (isNaN(conceptIdInt)) {
      throw new Error('Invalid conceptId');
    }
    return this.contentService.getConceptById(conceptIdInt);
  }
}
