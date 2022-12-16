import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Answers } from './entities/answers.entity';
import { Quiz } from './entities/quiz.entity';
import { Types } from './entities/types.entity';
import { CorrectAnswer } from './entities/correct-answer.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    @InjectRepository(Types) private typeRepository: Repository<Types>,
    @InjectRepository(Answers) private answersRepository: Repository<Answers>,
    @InjectRepository(CorrectAnswer)
    private correctAnswerRepository: Repository<CorrectAnswer>,
  ) {}

  async create(createQuizDto: CreateQuizDto) {
    const questionType = await this.typeRepository.findOneBy({
      id: createQuizDto.typeId,
    });

    if (createQuizDto.typeId === 1) {
      if (createQuizDto.correctNumberAnswers.length > 1) {
        throw new BadRequestException(
          'Only one correct answer is allowed for number question',
        );
      }
      const question = this.quizRepository.create({
        ...createQuizDto,
        type: questionType,
        correctAnswers: createQuizDto.correctNumberAnswers,
      });
      return await this.quizRepository.save(question);
    } else if (createQuizDto.typeId === 2) {
      if (createQuizDto.correctBooleanAnswers.length > 1) {
        throw new BadRequestException(
          'Only one correct answer is allowed for boolean question',
        );
      }
      const question = this.quizRepository.create({
        ...createQuizDto,
        correctAnswers: createQuizDto.correctBooleanAnswers,
        type: questionType,
      });
      return await this.quizRepository.save(question);
    } else if (createQuizDto.typeId === 3) {
      const question = this.quizRepository.create({
        ...createQuizDto,
        type: questionType,
        correctAnswers: createQuizDto.correctMCQAnswers,
      });
      return await this.quizRepository.save(question);
    } else if (createQuizDto.typeId === 4) {
      if (createQuizDto.correctTextAnswers.length > 1) {
        throw new BadRequestException(
          'Only one correct answer is allowed for text question',
        );
      }
      const question = this.quizRepository.create({
        ...createQuizDto,
        correctAnswers: createQuizDto.correctTextAnswers,
        type: questionType,
      });
      return await this.quizRepository.save(question);
    }
  }

  async findAll() {
    const data = await this.quizRepository.find();
    if (data.length === 0) {
      throw new Error('No questions found');
    }
    return data;
  }

  findOne(id: number) {
    return this.findOneById(id);
  }

  async update(id: number, updateQuizDto: UpdateQuizDto) {
    const questionType = await this.typeRepository.findOneBy({
      id: updateQuizDto.typeId,
    });
    const question = await this.findOneById(id);
    await this.answersRepository.remove(question.answers); // Remove the old answers
    await this.correctAnswerRepository.remove(question.correctAnswers);
    if (updateQuizDto.typeId === 1) {
      if (updateQuizDto.correctNumberAnswers.length > 1) {
        throw new BadRequestException(
          'Only one correct answer is allowed for number question',
        );
      }
      Object.assign(question, {
        ...updateQuizDto,
        correctAnswers: updateQuizDto.correctNumberAnswers,
        type: questionType,
      });
      return await this.quizRepository.save(question);
    } else if (updateQuizDto.typeId === 2) {
      if (updateQuizDto.correctBooleanAnswers.length > 1) {
        throw new BadRequestException(
          'Only one correct answer is allowed for boolean question',
        );
      }
      Object.assign(question, {
        ...updateQuizDto,
        correctAnswers: updateQuizDto.correctBooleanAnswers,
        type: questionType,
      });
      return await this.quizRepository.save(question);
    } else if (updateQuizDto.typeId === 3) {
      Object.assign(question, {
        ...updateQuizDto,
        correctAnswers: updateQuizDto.correctMCQAnswers,
        type: questionType,
      });
      return await this.quizRepository.save(question);
    } else if (updateQuizDto.typeId === 4) {
      if (updateQuizDto.correctTextAnswers.length > 1) {
        throw new BadRequestException(
          'Only one correct answer is allowed for text question',
        );
      }
      Object.assign(question, {
        ...updateQuizDto,
        correctAnswers: updateQuizDto.correctTextAnswers,
        type: questionType,
      });
      return await this.quizRepository.save(question);
    }
  }
  async findOneById(id: number) {
    const question = await this.quizRepository.findOneBy({ id });
    if (!question) {
      throw new Error('Question not found');
    }
    return question;
  }

  async remove(id: number) {
    const question = await this.findOneById(id);
    return await this.quizRepository.remove(question);
  }
}
