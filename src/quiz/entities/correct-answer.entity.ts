import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity({ name: 'correct-answers' })
export class CorrectAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  correctAnswer: any;

  @ManyToMany(() => Quiz, (question) => question.correctAnswers)
  questions: Quiz[];
}
