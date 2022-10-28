import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { CityService } from './city.service';
import { City } from './entities/city.entity';

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: City,
  },
  // query: {
  //   alwaysPaginate: true,
  //   join: {
  //     country: {},
  //   },
  // },
})

@Controller('city')
export class CityController implements CrudController<City> {
  constructor(public readonly service: CityService) { }
}
