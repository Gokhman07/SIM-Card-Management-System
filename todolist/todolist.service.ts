import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ToDoList } from './entities/todolist.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ToDoListService extends TypeOrmCrudService<ToDoList> {
  constructor(@InjectRepository(ToDoList) repo) {
    super(repo);
  }

 
}
