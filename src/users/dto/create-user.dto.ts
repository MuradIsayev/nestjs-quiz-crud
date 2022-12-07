import {
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  @MinLength(8)
  password: string;

  @IsDateString()
  @IsNotEmpty()
  date_of_birth: Date;
}
