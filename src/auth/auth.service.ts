import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const user = await this.usersService.findOneByEmail(loginDto.email);
      const isMatch = await bcrypt.compare(loginDto.password, user.password);
      if (!isMatch) throw new ForbiddenException('Password is incorrect!');
      return {
        access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
      };
    } catch (error) {
      throw error;
    }
  }

  async register(createUserDto: CreateUserDto) {
    const userFound = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (userFound)
      throw new MethodNotAllowedException(
        `User with email ${createUserDto.email} is already registered`,
      );
        
    const user = this.usersRepository.create(createUserDto);

    if (!user) throw new BadRequestException('User could not be created');

    return await this.usersRepository.save(user);
  }
}
