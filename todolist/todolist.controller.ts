import {
  Controller,
  Get,
  HttpException,
  HttpStatus, Param,
  Post,
  UseGuards
} from "@nestjs/common";
import { ToDoListService } from './todolist.service';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
  QueryFilterOption,
} from '@nestjsx/crud';
import { ToDoList } from './entities/todolist.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: ToDoList,
  },
  query: {
    join: {
      company: {},
      orders: {},
      transaction: {}
    },
    // filter: (search, getMany) => {
    //   return search;
    // },
  },
})
@Controller('todolist')
export class ToDoListController implements CrudController<ToDoList> {
  constructor(public service: ToDoListService) {}
}
