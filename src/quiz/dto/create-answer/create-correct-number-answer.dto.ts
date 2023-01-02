import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCorrectNumberAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  correctAnswer: number;
}
