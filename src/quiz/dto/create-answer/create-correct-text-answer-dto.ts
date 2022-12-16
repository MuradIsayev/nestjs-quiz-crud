import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCorrectTextAnswerDto {
  @IsNotEmpty()
  @IsString()
  correctTextAnswer: string;
}
