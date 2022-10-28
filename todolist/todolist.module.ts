import { Module } from '@nestjs/common';
import { ToDoListService } from './todolist.service';
import { ToDoListController } from './todolist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoList } from './entities/todolist.entity';

@Module({
  controllers: [ToDoListController],
  providers: [ToDoListService],
  imports: [TypeOrmModule.forFeature([ToDoList])],
  exports: [ToDoListService],
})
export class ToDoListModule {}
