import { Controller, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '@nestjs/passport';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Transaction } from './entities/transaction.entity';
import { ClientService } from 'src/clients/client.service';
//import { SimsService } from 'src/sims/sims.service';
import moment from 'moment';
//import { Sim } from 'src/sims/entities/sim.entity';
import { Client} from 'src/clients/entities/client.entity';

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: Transaction,
  },
  query: {
    alwaysPaginate: true,
    join: {
      client: {eager:true},
     
    },
  },
})
@Controller('transactions')
export class TransactionsController implements CrudController<Transaction> {
  constructor(
    public readonly service: TransactionsService,
    public readonly clientService: ClientService,
    //public readonly simsService: SimsService
  ) { }

  get base(): CrudController<Transaction> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: { transaction: Partial<Transaction>, typeTransaction: TypeTransaction },
  ): Promise<Transaction> {
    console.log(dto.transaction);
    if (dto.typeTransaction === 0) {
      await this.clientService.topUpBalance((dto.transaction.client as number), dto.transaction.amount);
    } else if (dto.typeTransaction === 1) {
      // code for update_order
      // await
    } 
    
    dto.transaction = {
      client: (dto.transaction.client as number),
      //sim: (dto.transaction.sim as number),
      amount: dto.transaction.amount,
      description: `Sum: ${dto?.transaction?.amount}`,
      operationType: dto.transaction.operationType
    };
    return this.base.createOneBase(req, dto.transaction as Transaction);
  }
}

export enum TypeTransaction {
  NEW_OPERATION,
  CREATE_ORDER,
  UPDATE_ORDER
}

