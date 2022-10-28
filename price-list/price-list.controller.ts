import { Controller, UseGuards } from '@nestjs/common';
import { PriceListService } from './price-list.service';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { PriceList } from './entities/price-list.entity';

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: PriceList,
  },
})
@Controller('pricelist')
export class PriceListController implements CrudController<PriceList> {
  constructor(public readonly service: PriceListService) {}
}
