import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Types } from './entities/types.entity';
import { Answers } from './entities/answers.entity';
import { Quiz } from './entities/quiz.entity';
import { CorrectAnswer } from './entities/correct-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Types, Answers, CorrectAnswer])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
