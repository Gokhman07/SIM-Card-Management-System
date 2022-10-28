import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceList } from './entities/price-list.entity';

@Injectable()
export class PriceListService extends TypeOrmCrudService<PriceList> {
  constructor(@InjectRepository(PriceList) repo) {
    super(repo);
  }
}
