import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Modules } from './entities/module.enitity';
import { InjectRepository } from '@nestjs/typeorm';
//import { OperationType } from 'src/transactions/entities/operation.type';

@Injectable()
export class ModuleService extends TypeOrmCrudService<Modules> {
  constructor(@InjectRepository(Modules) repo) {
 super(repo);
} 
   
  }
