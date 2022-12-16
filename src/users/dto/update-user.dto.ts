import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @IsOptional()
  lastname?: string;
}
