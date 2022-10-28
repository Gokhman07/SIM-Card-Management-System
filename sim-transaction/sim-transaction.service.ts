import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SimTransaction } from 'src/sim-transaction/entities/sim-transaction.entity';

@Injectable()
export class SimTransactionsService extends TypeOrmCrudService<SimTransaction> {
  constructor(@InjectRepository(SimTransaction) repo) {
    super(repo);
  }
}
