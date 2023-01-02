import { Injectable } from '@nestjs/common';
import { Types } from '../quiz/entities/types.entity';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    await this.seedTypes()
      .then((completed) => {
        Promise.resolve(completed);
      })
      .catch((error) => {
        Promise.reject(error);
      });
  }

  async seedTypes() {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const questionTypes = [
      {
        id: 1,
        type: 'Numeric',
        description:
          'Users are presented with a question that requires a numeric answer.',
      },
      {
        id: 2,
        type: 'True/False',
        description:
          'Users are asked to judge whether a factual statement is either true or false.',
      },
      {
        id: 3,
        type: 'MCQ',
        description:
          'Users are asked to choose one or more items from a limited list of choices.',
      },
      {
        id: 4,
        type: 'Text',
        description:
          'Users are asked to input a text (It can also be a letter or a word)',
      },
    ];
    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await this.dataSource.query('TRUNCATE TABLE types;');
    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');

    await this.dataSource
      .getRepository(Types)
      .createQueryBuilder('types')
      .insert()
      .into(Types)
      .values(questionTypes)
      .execute();

    await queryRunner.release();
  }
}
