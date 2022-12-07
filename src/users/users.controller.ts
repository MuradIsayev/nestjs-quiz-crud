import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('/update-user')
  updateUserInfo(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserInfo(user, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getUserInfo(@GetUser() user: User) {
    return this.usersService.getUserInfo(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
