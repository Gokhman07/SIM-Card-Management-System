import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService extends TypeOrmCrudService<Transaction> {
  constructor(@InjectRepository(Transaction) repo) {
    super(repo);
  }
}
