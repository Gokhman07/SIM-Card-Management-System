import { Crud, CrudController } from '@nestjsx/crud';
//import { Client } from './entities/client.entity';
import { Expense } from './entities/expense.entity';
import { Controller, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: Expense,
  },
  query: {
    join: {
    //  client: {eager:true},
    
    },
  },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'createOneBase',
      'deleteOneBase',
      'replaceOneBase',
    ],
  },
})
@Controller('expenses')
export class ExpenseController implements CrudController<Expense> {
  constructor(public service: ExpenseService) {}
}
