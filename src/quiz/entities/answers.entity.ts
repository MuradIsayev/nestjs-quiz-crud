import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity({ name: 'answers' })
export class Answers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1024 })
  options: string;

  @ManyToMany(() => Quiz, (question) => question.answers)
  questions: Quiz[];

  @Column({ type: 'boolean', default: false })
  isCorrect: boolean;
}
