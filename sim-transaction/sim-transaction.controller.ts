import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import moment from 'moment';
import { SimTransaction } from 'src/sim-transaction/entities/sim-transaction.entity';
import { SimTransactionsService } from 'src/sim-transaction/sim-transaction.service';
import { SimsService } from 'src/sims/sims.service';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { TypeTransaction } from 'src/transactions/transactions.controller';


@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: SimTransaction,
  },
  query: {
    alwaysPaginate: true,
    join: {
      sim: {}
    },
  },
})
@Controller('sim-transactions')
export class SimTransactionController implements CrudController<SimTransaction>{
  constructor(
    public readonly service: SimTransactionsService,
    public readonly simsService: SimsService
  ) { }

  get base(): CrudController<SimTransaction> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: any,
  ): Promise<SimTransaction> {
    const sim = await this.simsService.findOne(dto.sim);
    console.log(sim)
    await this.simsService.updateChargeDate(dto.sim, dto.deferredDate);
    await this.simsService.updateChargeDays(dto.sim, dto.chargeDays);
    return this.base.createOneBase(req, dto);
  }

}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
