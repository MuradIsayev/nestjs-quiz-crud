import { Controller, Get,Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('header')
  @Render('header')
  root() {
    console.log('GET Header page');
  }
}
