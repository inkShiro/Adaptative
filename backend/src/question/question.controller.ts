import { Body, Controller, Post } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('generateQuestion')
  async generate(@Body() body: { 
    concept: string, 
    type: number, 
    learningStyle: string, 
    previous_performance: number, 
    total_questions: number 
  }) {
    // Llamar a generateTest para obtener los pesos de dificultad
    const { previous_performance, total_questions, concept, type, learningStyle } = body;

    // Llamamos al servicio para generar los pesos de dificultad
    const difficultyWeights = await this.questionService.generateTest(previous_performance, total_questions);

    // Llamar a la función generateQuestion con los parámetros adecuados
    return this.questionService.generateQuestion(concept, type, learningStyle, difficultyWeights);
  }


  @Post('generateTest')
  async generateTest(
    @Body() body: { 
      previous_performance: number;  // Rendimiento previo
      total_questions: number;  // Total de preguntas en el test
    }
  ) {
    const { previous_performance, total_questions } = body;

    // Llamamos al servicio para generar el test
    const result = await this.questionService.generateTest(previous_performance, total_questions);
    
    // Retornamos el resultado en formato JSON
    return result;
  }
}
