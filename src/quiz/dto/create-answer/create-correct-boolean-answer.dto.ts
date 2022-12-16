import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateCorrectBooleanAnswerDto {
  @IsNotEmpty()
  @IsBoolean()
  correctAnswer: boolean;
}
