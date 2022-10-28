import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Expense } from './entities/expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OperationType } from 'src/transactions/entities/operation.type';

@Injectable()
export class ExpenseService extends TypeOrmCrudService<Expense> {
  constructor(@InjectRepository(Expense) repo) {
    super(repo);
  }


}
