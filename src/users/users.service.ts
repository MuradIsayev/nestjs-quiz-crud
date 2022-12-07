import {
  BadRequestException,
  Inject,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userFound = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (userFound) {
      throw new MethodNotAllowedException(
        `User with email ${createUserDto.email} is already registered`,
      );
    }
    const user = this.usersRepository.create(createUserDto);
    if (!user) throw new BadRequestException('User could not be created');
    return await this.usersRepository.save(user);
  }

  async getUserInfo(user: User) {
    return await this.findOneByEmail(user.email);
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user)
      throw new NotFoundException(`User with email ${email} was not found`);
    return user;
  }

  async updateUserInfo(user: User, updateUserDto: UpdateUserDto) {
    const userFound = await this.findOneByEmail(user.email);
    Object.assign(userFound, updateUserDto);
    return await this.usersRepository.save(userFound);
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
