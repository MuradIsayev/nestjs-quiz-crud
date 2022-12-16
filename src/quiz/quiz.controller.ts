import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('game')
  @Render('game')
  async game() {
    console.log('GET Game page');
    const questions = await this.quizService.findAll();
    return { questions };
  }
  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.remove(id);
  }
}
