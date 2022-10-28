import { Controller, UseGuards } from '@nestjs/common';
import { CountryService } from './country.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Country } from './country/country.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: Country,
  },
})
@Controller('country')
export class CountryController implements CrudController<Country> {
  constructor(public service: CountryService) {}
}
