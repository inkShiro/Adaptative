import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService], // Exporta el servicio si necesitas usarlo en otros módulos
})
export class QuestionModule {}
