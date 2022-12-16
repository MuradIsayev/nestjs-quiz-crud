import {
  Controller,
  Post,
  Body,
  Get,
  Render,
  Redirect,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('signup')
  @Render('signup')
  signup() {
    console.log('GET Signup page');
  }

  @Get('login')
  @Render('login')
  login() {
    console.log('GET Login page');
  }

  @Post('login')
  async create(@Res() res, @Body() loginDto: LoginDto) {
    console.log('USER LOGGED IN');
    await this.authService.login(loginDto);
    res.redirect('/quiz/game');
    console.log('REDIRECTED TO GAME');
  }

  @Post('register')
  async register(@Res() res, @Body() CreateUserDto: CreateUserDto) {
    console.log('USER REGISTERED');
    await this.authService.register(CreateUserDto);
    res.redirect('/auth/login');
    console.log('REDIRECTED TO LOGIN');
  }
}
