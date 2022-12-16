import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCorrectMCQAnswerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  correctAnswer: string;
}
