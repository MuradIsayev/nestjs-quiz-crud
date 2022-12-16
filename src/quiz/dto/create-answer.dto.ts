import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  options?: string;

  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;
}
