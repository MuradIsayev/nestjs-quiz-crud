import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';
import { CreateAnswerDto } from './create-answer.dto';
import { CreateCorrectMCQAnswerDto } from './create-answer/create-correct-answer.dto';
import { CreateCorrectBooleanAnswerDto } from './create-answer/create-correct-boolean-answer.dto';
import { CreateCorrectNumberAnswerDto } from './create-answer/create-correct-number-answer.dto';
import { CreateCorrectTextAnswerDto } from './create-answer/create-correct-text-answer-dto';
import { CreateQuizDto } from './create-quiz.dto';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
  @IsOptional()
  question?: string;

  @IsOptional()
  nbPoints?: number;

  @IsOptional()
  feedback?: string;

  @IsOptional()
  typeId?: number;

  @IsOptional()
  answerId?: number;

  @ValidateNested()
  @Type(() => CreateAnswerDto)
  answers?: CreateAnswerDto[];

  @ValidateIf((type) => type.typeId === 1)
  @ValidateNested()
  @Type(() => CreateCorrectNumberAnswerDto)
  correctNumberAnswers: CreateCorrectNumberAnswerDto[];

  @ValidateIf((type) => type.typeId === 2)
  @ValidateNested()
  @Type(() => CreateCorrectBooleanAnswerDto)
  correctBooleanAnswers: CreateCorrectBooleanAnswerDto[];

  @ValidateIf((type) => type.typeId === 3)
  @ValidateNested()
  @Type(() => CreateCorrectMCQAnswerDto)
  correctMCQAnswers: CreateCorrectMCQAnswerDto[];

  @ValidateIf((type) => type.typeId === 4)
  @ValidateNested()
  @Type(() => CreateCorrectTextAnswerDto)
  correctTextAnswers: CreateCorrectTextAnswerDto[];
}
