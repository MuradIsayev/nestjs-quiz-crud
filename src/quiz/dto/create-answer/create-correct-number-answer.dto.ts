import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateCorrectNumberAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  correctNumberAnswer: number;
}
