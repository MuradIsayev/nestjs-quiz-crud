import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity({ name: 'types' })
export class Types {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ type: 'varchar', length: 1024 })
  description: string;

  @OneToMany(() => Quiz, (question) => question.type)
  questions: Quiz[];
}
