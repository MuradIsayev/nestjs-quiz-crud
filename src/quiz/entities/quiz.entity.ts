import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answers } from './answers.entity';
import { CorrectAnswer } from './correct-answer.entity';
import { Types } from './types.entity';

@Entity({ name: 'questions' })
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 1024,
  })
  question: string;

  @Column()
  nbPoints: number;

  @Column({ type: 'varchar', length: 1024 })
  feedback: string;

  @ManyToOne(() => Types, (type) => type.questions, {
    eager: true,
  })
  @JoinColumn()
  type: Types;

  @ManyToMany(() => Answers, (answer) => answer.questions, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  answers: Answers[];

  @ManyToMany(() => CorrectAnswer, (correctAnswer) => correctAnswer.questions, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  correctAnswers: CorrectAnswer[];
}
