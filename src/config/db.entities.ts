import { Answers } from 'src/quiz/entities/answers.entity';
import { CorrectAnswer } from 'src/quiz/entities/correct-answer.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Types } from 'src/quiz/entities/types.entity';
import { User } from 'src/users/entities/user.entity';

export const entities = [User, Types, Answers, Quiz, CorrectAnswer];
